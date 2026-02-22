import { IBrand } from "@/lib/models/Brand";
import dbConnect from "@/lib/mongoose";
import Brand from "@/lib/models/Brand";
import { BrandsClient } from "@/components/reusable/brands/brands-client";

export const metadata = {
  title: "Computer & Gaming Brands",
  description:
    "Explore our extensive collection of premium computer and gaming brands. Shop from top brands like ASUS, MSI, Corsair, Logitech, and more at Pandey Computer.",
  openGraph: {
    title: "Computer & Gaming Brands | Pandey Computer",
    description:
      "Explore our extensive collection of premium computer and gaming brands.",
  },
};

async function getBrands(): Promise<IBrand[]> {
  try {
    await dbConnect();
    const brands = await Brand.find().sort({ name: 1 }).lean();
    return JSON.parse(JSON.stringify(brands));
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            All Brands
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our extensive collection of premium computer and gaming
            brands
          </p>
        </div>
      </section>

      <BrandsClient brands={brands} />
    </div>
  );
}
