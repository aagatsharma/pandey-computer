import NavbarItem from "@/lib/models/NavbarItem";
import dbConnect from "@/lib/mongoose";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  try {
    await dbConnect();

    const body = await request.json();
    const { parent, order } = body;

    // Get the current item to check if parent is changing
    const currentItem = await NavbarItem.findById(id);
    if (!currentItem) {
      return Response.json({ error: "Navbar item not found" }, { status: 404 });
    }

    // Validate parent-level relationship if parent is being set
    if (parent) {
      const parentItem = await NavbarItem.findById(parent);
      if (!parentItem) {
        return Response.json(
          { error: "Parent item not found" },
          { status: 404 },
        );
      }

      // Parent should be one level lower
      if (parentItem.level !== currentItem.level - 1) {
        return Response.json(
          {
            error: `Level ${currentItem.level} items must have a Level ${
              currentItem.level - 1
            } parent`,
          },
          { status: 400 },
        );
      }

      // Check for circular reference
      let checkParent = parentItem;
      while (checkParent.parent) {
        if (checkParent.parent.toString() === id) {
          return Response.json(
            { error: "Cannot create circular reference" },
            { status: 400 },
          );
        }
        checkParent = await NavbarItem.findById(checkParent.parent);
        if (!checkParent) break;
      }
    }

    // If parent is changing, update children arrays
    if (currentItem.parent?.toString() !== parent) {
      // Remove from old parent's children
      if (currentItem.parent) {
        await NavbarItem.findByIdAndUpdate(currentItem.parent, {
          $pull: { children: id },
        });
      }

      // Add to new parent's children
      if (parent) {
        await NavbarItem.findByIdAndUpdate(parent, {
          $addToSet: { children: id },
        });
      }
    }

    const navbarItem = await NavbarItem.findByIdAndUpdate(
      id,
      {
        parent: parent || null,
        order,
      },
      { new: true, runValidators: true },
    );

    if (!navbarItem) {
      return Response.json({ error: "Navbar item not found" }, { status: 404 });
    }

    // Revalidate all pages that use navigation
    revalidatePath("/", "layout");

    return Response.json({ data: navbarItem });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to update navbar item" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  try {
    await dbConnect();

    const navbarItem = await NavbarItem.findById(id);

    if (!navbarItem) {
      return Response.json({ error: "Navbar item not found" }, { status: 404 });
    }

    // Remove from parent's children array
    if (navbarItem.parent) {
      await NavbarItem.findByIdAndUpdate(navbarItem.parent, {
        $pull: { children: id },
      });
    }

    // Recursively delete all children
    const deleteChildren = async (itemId: string) => {
      const children = await NavbarItem.find({ parent: itemId });
      for (const child of children) {
        await deleteChildren(child._id.toString());
        await NavbarItem.findByIdAndDelete(child._id);
      }
    };

    await deleteChildren(id);
    await NavbarItem.findByIdAndDelete(id);

    // Revalidate all pages that use navigation
    revalidatePath("/", "layout");

    return Response.json({ message: "Navbar item deleted successfully" });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to delete navbar item" },
      { status: 500 },
    );
  }
}
