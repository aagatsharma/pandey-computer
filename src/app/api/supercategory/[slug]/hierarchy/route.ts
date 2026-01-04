import SuperCategory from "@/lib/models/SuperCategory";
import Brand from "@/lib/models/Brand";
import Category from "@/lib/models/Category";
import SubBrand from "@/lib/models/SubBrand";
import SubCategory from "@/lib/models/SubCategory";
import dbConnect from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();

    const { slug } = params;

    // Find the SuperCategory
    const superCategory = await SuperCategory.findOne({ slug }).lean();

    if (!superCategory) {
      return NextResponse.json(
        { message: "SuperCategory not found" },
        { status: 404 }
      );
    }

    // Find all Brands belonging to this SuperCategory
    const brands = await Brand.find({ superCategory: superCategory._id })
      .select("name slug logo")
      .lean();

    // Find all Categories belonging to this SuperCategory
    const categories = await Category.find({ superCategory: superCategory._id })
      .select("name slug logo")
      .lean();

    // For each brand, get its subbrands
    const brandsWithSubBrands = await Promise.all(
      brands.map(async (brand) => {
        const subBrands = await SubBrand.find({ brand: brand._id })
          .select("name slug logo")
          .lean();
        return {
          ...brand,
          subBrands,
        };
      })
    );

    // For each category, get its subcategories
    const categoriesWithSubCategories = await Promise.all(
      categories.map(async (category) => {
        const subCategories = await SubCategory.find({ category: category._id })
          .select("name slug logo")
          .lean();
        return {
          ...category,
          subCategories,
        };
      })
    );

    const hierarchy = {
      superCategory,
      brands: brandsWithSubBrands,
      categories: categoriesWithSubCategories,
    };

    return NextResponse.json(
      { message: "Hierarchy fetched successfully", data: hierarchy },
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
