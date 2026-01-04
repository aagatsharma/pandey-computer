import SuperCategory from "@/lib/models/SuperCategory";
import Brand from "@/lib/models/Brand";
import Category from "@/lib/models/Category";
import SubBrand from "@/lib/models/SubBrand";
import SubCategory from "@/lib/models/SubCategory";
import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // Find all SuperCategories
    const superCategories = await SuperCategory.find().lean();

    // For each SuperCategory, get its brands and categories with children
    const hierarchies = await Promise.all(
      superCategories.map(async (superCategory) => {
        // Find all Brands belonging to this SuperCategory
        const brands = await Brand.find({ superCategory: superCategory._id })
          .select("name slug logo")
          .lean();

        // Find all Categories belonging to this SuperCategory
        const categories = await Category.find({
          superCategory: superCategory._id,
        })
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
            const subCategories = await SubCategory.find({
              category: category._id,
            })
              .select("name slug logo")
              .lean();
            return {
              ...category,
              subCategories,
            };
          })
        );

        return {
          superCategory,
          brands: brandsWithSubBrands,
          categories: categoriesWithSubCategories,
        };
      })
    );

    return NextResponse.json(
      { message: "Hierarchies fetched successfully", data: hierarchies },
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
