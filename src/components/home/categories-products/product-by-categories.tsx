import dbConnect from "@/lib/mongoose";
import Category, { ICategory } from "@/lib/models/Category";
import CategoryProducts from "./category-products";

async function getHomePageCategories(): Promise<ICategory[]> {
  try {
    await dbConnect();

    const products = await Category.find({ showInHomepage: true });

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function ProductByCategories() {
  const categories = await getHomePageCategories();

  if (categories.length === 0) {
    return null;
  }

  return (
    <>
      {categories.map((category) => (
        <CategoryProducts category={category} key={category.slug} />
      ))}
    </>
  );
}
