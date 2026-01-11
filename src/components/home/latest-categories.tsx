import Link from "next/link";
import Image from "next/image";
import dbConnect from "@/lib/mongoose";
import Category, { ICategory } from "@/lib/models/Category";

async function getLatestCategories(): Promise<ICategory[]> {
  try {
    await dbConnect();

    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .limit(12)
      .lean();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function LatestCategories() {
  const categories = await getLatestCategories();

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto my-20 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Shop by Category
          </h2>
          <p className="text-muted-foreground">
            Browse our wide range of product categories
          </p>
        </div>
        <Link
          href="/shop"
          className="text-sm sm:text-base text-primary hover:underline font-medium hidden sm:block"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/shop?category=${category.slug}`}
            className="group block p-4 rounded-lg border bg-card hover:bg-accent transition-colors duration-200"
          >
            <div className="relative h-20 mb-3 rounded-md overflow-hidden">
              {category.logo && (
                <Image
                  src={category.logo}
                  alt={category.name}
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <h3 className="text-sm font-semibold text-foreground line-clamp-1">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/shop"
          className="text-sm text-primary hover:underline font-medium"
        >
          View All Categories →
        </Link>
      </div>
    </section>
  );
}
