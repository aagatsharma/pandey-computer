import Blog from "@/lib/models/Blog";
import dbConnect from "@/lib/mongoose";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  try {
    await dbConnect();

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json({ data: blog });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  try {
    await dbConnect();

    const body = await request.json();
    const { title, excerpt, content, image } = body;

    if (!title || !content) {
      return Response.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Generate new slug if title changed
    const newSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const blog = await Blog.findOneAndUpdate(
      { _id: slug }, // Using _id instead of slug for update
      {
        title,
        slug: newSlug,
        excerpt,
        content,
        image,
      },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return Response.json({ error: "Blog not found" }, { status: 404 });
    }

    return Response.json({ data: blog });
  } catch (error: any) {
    console.error(error);

    // Handle duplicate slug error
    if (error.code === 11000) {
      return Response.json(
        { error: "A blog with this title already exists" },
        { status: 409 }
      );
    }

    return Response.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  try {
    await dbConnect();

    const blog = await Blog.findByIdAndDelete(slug); // Using _id for delete

    if (!blog) {
      return Response.json({ error: "Blog not found" }, { status: 404 });
    }

    return Response.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
