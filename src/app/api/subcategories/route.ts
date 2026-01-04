import SubCategory from "@/lib/models/SubCategory";
import dbConnect from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function GET() {
  try {
    await dbConnect();

    const data = await SubCategory.find();

    return new Response(
      JSON.stringify({
        data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching SubCategory:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch SubCategory" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const { name, logo } = body;

    if (!name) {
      return NextResponse.json(
        { message: "SubCategory name is required" },
        { status: 400 }
      );
    }

    const slug = slugify(name, { lower: true, strict: true });

    const data = await SubCategory.create({
      name,
      slug,
      logo,
    });

    return NextResponse.json(
      { message: "SubCategory created successfully", data },
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
