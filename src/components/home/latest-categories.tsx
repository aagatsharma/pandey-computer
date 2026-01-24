import Link from "next/link";
import dbConnect from "@/lib/mongoose";
import Category, { ICategory } from "@/lib/models/Category";
import { CategoriesCarousel } from "./categories-carousel";

async function getCategories(): Promise<ICategory[]> {
  try {
    await dbConnect();

    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function LatestCategories() {
  const categories = await getCategories();

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto my-20 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold uppercase text-foreground">
          Shop by Categories
        </h2>
      </div>
      <Link
        href="/categories"
        className="text-sm mb-2 block text-right w-full text-primary hover:underline font-medium px-4"
      >
        View all
      </Link>

      <CategoriesCarousel categories={categories} />
    </section>
  );
}
