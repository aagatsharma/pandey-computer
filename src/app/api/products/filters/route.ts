import SuperCategory from "@/lib/models/SuperCategory";
import Category from "@/lib/models/Category";
import SubCategory from "@/lib/models/SubCategory";
import Brand from "@/lib/models/Brand";
import SubBrand from "@/lib/models/SubBrand";
import dbConnect from "@/lib/mongoose";

export async function GET() {
  try {
    await dbConnect();

    const [superCategories, categories, subCategories, brands, subBrands] =
      await Promise.all([
        SuperCategory.find().select("_id name slug").sort({ name: 1 }).lean(),
        Category.find().select("_id name slug").sort({ name: 1 }).lean(),
        SubCategory.find()
          .select("_id name slug category")
          .sort({ name: 1 })
          .lean(),
        Brand.find().select("_id name slug logo").sort({ name: 1 }).lean(),
        SubBrand.find().select("_id name slug brand").sort({ name: 1 }).lean(),
      ]);

    return new Response(
      JSON.stringify({
        data: {
          superCategories,
          categories,
          subCategories,
          brands,
          subBrands,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch filter options" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
