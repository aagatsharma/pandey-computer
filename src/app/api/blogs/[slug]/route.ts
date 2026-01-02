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
