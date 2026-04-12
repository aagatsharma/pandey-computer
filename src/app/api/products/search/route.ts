import Product from "@/lib/models/Product";
import Brand from "@/lib/models/Brand";
import Category from "@/lib/models/Category";
import SubBrand from "@/lib/models/SubBrand";
import SubCategory from "@/lib/models/SubCategory";
import dbConnect from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

type SearchFilter = Record<string, unknown>;

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawName = searchParams.get("name")?.trim() ?? "";
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit") || "8", 10), 1),
      20,
    );
    const skip = (page - 1) * limit;

    const categorySlug = searchParams.get("category")?.trim();
    const subCategorySlug = searchParams.get("subCategory")?.trim();
    const brandSlug = searchParams.get("brand")?.trim();
    const subBrandSlug = searchParams.get("subBrand")?.trim();
    const minPriceRaw = searchParams.get("minPrice")?.trim();
    const maxPriceRaw = searchParams.get("maxPrice")?.trim();

    await dbConnect();

    const filter: SearchFilter = {};

    if (rawName) {
      filter.name = {
        $regex: escapeRegex(rawName),
        $options: "i",
      };
    }

    if (categorySlug) {
      const categoryDoc = await Category.findOne({ slug: categorySlug }).select(
        "_id",
      );
      if (categoryDoc) {
        filter.categories = { $in: [categoryDoc._id] };
      }
    }

    if (subCategorySlug) {
      const subCategoryDoc = await SubCategory.findOne({
        slug: subCategorySlug,
      }).select("_id");
      if (subCategoryDoc) {
        filter.subCategories = { $in: [subCategoryDoc._id] };
      }
    }

    if (brandSlug) {
      const brandDoc = await Brand.findOne({ slug: brandSlug }).select("_id");
      if (brandDoc) {
        filter.brand = brandDoc._id;
      }
    }

    if (subBrandSlug) {
      const subBrandDoc = await SubBrand.findOne({ slug: subBrandSlug }).select(
        "_id",
      );
      if (subBrandDoc) {
        filter.subBrand = subBrandDoc._id;
      }
    }

    const minPrice = minPriceRaw ? Number(minPriceRaw) : undefined;
    const maxPrice = maxPriceRaw ? Number(maxPriceRaw) : undefined;

    if (Number.isFinite(minPrice) || Number.isFinite(maxPrice)) {
      filter.price = {};
      if (Number.isFinite(minPrice)) {
        (filter.price as Record<string, number>).$gte = minPrice as number;
      }
      if (Number.isFinite(maxPrice)) {
        (filter.price as Record<string, number>).$lte = maxPrice as number;
      }
    }

    const total = await Product.countDocuments(filter);

    // Lightweight query for header autocomplete: no populate, minimal fields, lean objects.
    const data = await Product.find(filter)
      .select("name slug price originalPrice images stock")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

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
    console.error("Error searching products:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 },
    );
  }
}
