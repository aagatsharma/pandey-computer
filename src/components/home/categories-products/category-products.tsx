import Link from "next/link";
import dbConnect from "@/lib/mongoose";
import Product, { IProduct } from "@/lib/models/Product";
import "@/lib/models/Category";
import "@/lib/models/SubCategory";
import "@/lib/models/Brand";
import "@/lib/models/SubBrand";
import { ProductsCarousel } from "../products-carousel";
import { ICategory } from "@/lib/models/Category";

async function getLatestProducts({
  category,
}: {
  category: ICategory;
}): Promise<IProduct[]> {
  try {
    await dbConnect();

    const products = await Product.find({ categories: category._id })
      .populate("brand")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function CategoryProducts({
  category,
}: {
  category: ICategory;
}) {
  const products = await getLatestProducts({ category });

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto my-20 p-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold uppercase text-foreground">
          {category.name}
        </h2>
      </div>
      <Link
        href={`/shop/?category=${category.slug}`}
        className="text-sm mb-2 block text-right w-full text-primary hover:underline font-medium px-4"
      >
        View all
      </Link>

      <ProductsCarousel products={products} />
    </section>
  );
}
