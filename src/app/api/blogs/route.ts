import Blog from "@/lib/models/Blog";
import dbConnect from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    await dbConnect();

    // Query parameters
    const page = parseInt(searchParams?.get("page") || "") || 1;
    const limit = parseInt(searchParams?.get("limit") || "") || 10;

    // Calculate skip/offset for the database query
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Blog.countDocuments();

    // Fetch blogs with pagination
    const data = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { title, excerpt, content, image } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      image,
    });

    // Revalidate blog pages
    revalidatePath("/blogs");
    revalidatePath("/");

    return NextResponse.json({ data: blog }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 },
    );
  }
}
