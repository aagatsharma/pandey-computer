import Image from "next/image";
import Link from "next/link";
import { ICategory } from "@/lib/models/Category";
import dbConnect from "@/lib/mongoose";
import Category from "@/lib/models/Category";
import { CategoriesClient } from "@/components/reusable/categories/categories-client";

export const metadata = {
  title: "Computer & Gaming Categories",
  description:
    "Explore our extensive collection of computer and technology categories. Find gaming laptops, PC components, peripherals, and more at Pandey Computer.",
  openGraph: {
    title: "Computer & Gaming Categories | Pandey Computer",
    description:
      "Explore our extensive collection of computer and technology categories.",
  },
};

async function getCategories(): Promise<ICategory[]> {
  try {
    await dbConnect();
    const categories = await Category.find().sort({ name: 1 }).lean();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            All Categories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our extensive collection of computer and technology
            categories
          </p>
        </div>
      </section>

      <CategoriesClient categories={categories} />
    </div>
  );
}
