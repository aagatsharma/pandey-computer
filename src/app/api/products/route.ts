import Product from "@/lib/models/Product";
import dbConnect from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    await dbConnect();

    // Query parameters
    const page = parseInt(searchParams?.get("page") || "") || 1;
    const limit = parseInt(searchParams?.get("limit") || "") || 10;

    // Calculate skip/offset for the database query
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Product.countDocuments();

    // Fetch products with pagination and populate references
    const data = await Product.find()
      .populate("mainCategory", "name slug")
      .populate("category", "name slug")
      .populate("subCategory", "name slug")
      .populate("brand", "name slug logo")
      .populate("subBrand", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return new Response(
      JSON.stringify({
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const {
      name,
      shortDescription,
      fullDescription,
      price,
      originalPrice,
      specs,
      features,
      mainCategory,
      category,
      subCategory,
      brand,
      subBrand,
      images,
      quantity,
      isFeatured,
    } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Product name is required" },
        { status: 400 }
      );
    }

    if (!shortDescription) {
      return NextResponse.json(
        { message: "Short description is required" },
        { status: 400 }
      );
    }

    if (!fullDescription) {
      return NextResponse.json(
        { message: "Full description is required" },
        { status: 400 }
      );
    }

    if (price === undefined || price === null) {
      return NextResponse.json(
        { message: "Product price is required" },
        { status: 400 }
      );
    }

    const slug = slugify(name, { lower: true, strict: true });

    const product = await Product.create({
      name,
      slug,
      shortDescription,
      fullDescription,
      price,
      originalPrice: originalPrice || undefined,
      specs: specs || undefined,
      features: features || [],
      mainCategory: mainCategory || undefined,
      category: category || undefined,
      subCategory: subCategory || undefined,
      brand: brand || undefined,
      subBrand: subBrand || undefined,
      images: images || [],
      quantity: quantity || 0,
      isFeatured: isFeatured || false,
    });

    return NextResponse.json(
      { message: "Product created successfully", data: product },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const {
      id,
      name,
      shortDescription,
      fullDescription,
      price,
      originalPrice,
      specs,
      features,
      mainCategory,
      category,
      subCategory,
      brand,
      subBrand,
      images,
      quantity,
      isFeatured,
    } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { message: "Product name is required" },
        { status: 400 }
      );
    }

    if (!shortDescription) {
      return NextResponse.json(
        { message: "Short description is required" },
        { status: 400 }
      );
    }

    if (!fullDescription) {
      return NextResponse.json(
        { message: "Full description is required" },
        { status: 400 }
      );
    }

    if (price === undefined || price === null) {
      return NextResponse.json(
        { message: "Product price is required" },
        { status: 400 }
      );
    }

    const slug = slugify(name, { lower: true, strict: true });

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        shortDescription,
        fullDescription,
        price,
        originalPrice: originalPrice || undefined,
        specs: specs || undefined,
        features: features || [],
        mainCategory: mainCategory || undefined,
        category: category || undefined,
        subCategory: subCategory || undefined,
        brand: brand || undefined,
        subBrand: subBrand || undefined,
        images: images || [],
        quantity: quantity || 0,
        isFeatured: isFeatured || false,
      },
      { new: true }
    );

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product updated successfully", data: product },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
