import Link from "next/link";
import dbConnect from "@/lib/mongoose";
import Product, { IProduct } from "@/lib/models/Product";
import SuperCategory from "@/lib/models/SuperCategory";
import Category from "@/lib/models/Category";
import SubCategory from "@/lib/models/SubCategory";
import Brand from "@/lib/models/Brand";
import SubBrand from "@/lib/models/SubBrand";
import { ProductsCarousel } from "./products-carousel";

async function getLatestProducts(): Promise<IProduct[]> {
  try {
    await dbConnect();

    const products = await Product.find()
      .populate("superCategory")
      .populate("category")
      .populate("subCategory")
      .populate("brand")
      .populate("subBrand")
      .sort({ createdAt: -1 })
      .limit(12)
      .lean();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function LatestProducts() {
  const products = await getLatestProducts();

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto my-20 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Latest Products
        </h2>
        <Link
          href="/shop"
          className="text-sm sm:text-base text-primary hover:underline font-medium"
        >
          View All Products →
        </Link>
      </div>

      <ProductsCarousel products={products} />
    </section>
  );
}
