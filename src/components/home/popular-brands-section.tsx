import Link from "next/link";
import dbConnect from "@/lib/mongoose";
import Brand, { IBrand } from "@/lib/models/Brand";
import { BrandsCarousel } from "./brands-carousel";

async function getPopularBrands(): Promise<IBrand[]> {
  try {
    await dbConnect();

    const brands = await Brand.find().sort({ createdAt: -1 }).limit(12).lean();

    return JSON.parse(JSON.stringify(brands));
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

export default async function PopularBrandsSection() {
  const brands = await getPopularBrands();

  if (brands.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto my-20 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Popular Brands
        </h2>
        <Link
          href="/brands"
          className="text-sm sm:text-base font-medium text-primary hover:opacity-80 transition-opacity"
        >
          View All →
        </Link>
      </div>

      <BrandsCarousel brands={brands} />
    </section>
  );
}
