import Product from "@/lib/models/Product";
import dbConnect from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

interface SearchFilter {
  name?: {
    $regex: string;
    $options: string;
  };
}

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawName = searchParams.get("name")?.trim() ?? "";

    if (!rawName) {
      return NextResponse.json({ data: [] });
    }

    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit") || "8", 10), 1),
      20,
    );

    await dbConnect();

    const filter: SearchFilter = {
      name: {
        $regex: escapeRegex(rawName),
        $options: "i",
      },
    };

    // Lightweight query for header autocomplete: no populate, minimal fields, lean objects.
    const data = await Product.find(filter)
      .select("name slug price originalPrice images stock")
      .sort({ updatedAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error searching products:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 },
    );
  }
}
