import Link from "next/link";
import dbConnect from "@/lib/mongoose";
import Product, { IProduct } from "@/lib/models/Product";
import "@/lib/models/Category";
import "@/lib/models/SubCategory";
import "@/lib/models/Brand";
import "@/lib/models/SubBrand";
import { ProductsCarousel } from "./products-carousel";

async function getLatestProducts(): Promise<IProduct[]> {
  try {
    await dbConnect();

    const products = await Product.find()
      .populate("category")
      .populate("subCategory")
      .populate("brand")
      .populate("subBrand")
      .sort({ createdAt: -1 })
      .limit(10)
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
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold uppercase text-foreground">
          Latest Products
        </h2>
      </div>
      <Link
        href="/shop"
        className="text-sm mb-2 block text-right w-full text-primary hover:underline font-medium px-4"
      >
        View all
      </Link>

      <ProductsCarousel products={products} />
    </section>
  );
}
