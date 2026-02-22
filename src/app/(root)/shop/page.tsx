import { ShopClient } from "@/components/shop/shop-client";
import { Suspense } from "react";
import dbConnect from "@/lib/mongoose";
import Category from "@/lib/models/Category";
import SubCategory from "@/lib/models/SubCategory";
import Brand from "@/lib/models/Brand";
import SubBrand from "@/lib/models/SubBrand";

export const metadata = {
  title: "Shop Computer & Gaming Products",
  description:
    "Browse our complete collection of gaming laptops, PC components, peripherals, and accessories. Best prices on computer hardware in Pokhara, Nepal.",
  openGraph: {
    title: "Shop Computer & Gaming Products | Pandey Computer",
    description:
      "Browse our complete collection of gaming laptops, PC components, and accessories.",
  },
};

interface FilterOption {
  _id: string;
  name: string;
  slug: string;
}

interface SubCategoryOption extends FilterOption {
  category: string;
}

interface SubBrandOption extends FilterOption {
  brand: string;
}

interface FilterData {
  categories: FilterOption[];
  subCategories: SubCategoryOption[];
  brands: (FilterOption & { logo?: string })[];
  subBrands: SubBrandOption[];
}

async function getFilterOptions(): Promise<FilterData> {
  try {
    await dbConnect();

    const [categories, subCategories, brands, subBrands] = await Promise.all([
      Category.find({}, { _id: 1, name: 1, slug: 1 }).sort({ name: 1 }).lean(),
      SubCategory.find({}, { _id: 1, name: 1, slug: 1, category: 1 })
        .sort({ name: 1 })
        .lean(),
      Brand.find({}, { _id: 1, name: 1, slug: 1, logo: 1 })
        .sort({ name: 1 })
        .lean(),
      SubBrand.find({}, { _id: 1, name: 1, slug: 1, brand: 1 })
        .sort({ name: 1 })
        .lean(),
    ]);

    return {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      brands: JSON.parse(JSON.stringify(brands)),
      subBrands: JSON.parse(JSON.stringify(subBrands)),
    };
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return {
      categories: [],
      subCategories: [],
      brands: [],
      subBrands: [],
    };
  }
}

export default async function ShopPage() {
  const filterData = await getFilterOptions();

  return (
    <Suspense>
      <ShopClient initialFilterData={filterData} />
    </Suspense>
  );
}
