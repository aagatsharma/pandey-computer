import SubBrand from "@/lib/models/SubBrand";
import dbConnect from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function GET() {
  try {
    await dbConnect();

    const data = await SubBrand.find();

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
    console.error("Error fetching SubBrand:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch SubBrand" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const { name, logo } = body;

    if (!name) {
      return NextResponse.json(
        { message: "SubBrand name is required" },
        { status: 400 }
      );
    }

    const slug = slugify(name, { lower: true, strict: true });

    const data = await SubBrand.create({
      name,
      slug,
      logo,
    });

    return NextResponse.json(
      { message: "SubBrand created successfully", data },
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
