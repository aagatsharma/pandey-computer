import Brand from "@/lib/models/Brand";
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
    const total = await Brand.countDocuments();

    // Fetch brand with pagination
    const data = await Brand.find()
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
    console.error("Error fetching blogs:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch blogs" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const { name, logo, order = 0 } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Brand name is required" },
        { status: 400 }
      );
    }

    const slug = slugify(name, { lower: true, strict: true });

    const brand = await Brand.create({
      name,
      slug,
      logo,
      order,
    });

    return NextResponse.json(
      { message: "Brand created successfully", data: brand },
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
