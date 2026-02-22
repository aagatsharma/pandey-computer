import NavigationBar from "./header/navigation-bar";
import NavbarItem from "@/lib/models/NavbarItem";
import dbConnect from "@/lib/mongoose";

interface NavbarItem {
  _id: string;
  label: string;
  slug: string;
  level: 1 | 2 | 3;
  type: "category" | "brand" | "subCategory" | "subBrand";
  children?: NavbarItem[];
}

async function getNavbarItems() {
  await dbConnect();

  const level1Items = await NavbarItem.find({ level: 1 })
    .sort({ order: 1 })
    .lean();

  for (const item of level1Items) {
    const level2Children = await NavbarItem.find({
      parent: item._id,
      level: 2,
    })
      .sort({ order: 1 })
      .lean();

    for (const child of level2Children) {
      child.children = await NavbarItem.find({
        parent: child._id,
        level: 3,
      })
        .sort({ order: 1 })
        .lean();
    }

    item.children = level2Children;
  }

  return JSON.parse(JSON.stringify(level1Items));
}

export default async function Header() {
  const navigationData = await getNavbarItems();

  return <NavigationBar menuData={navigationData} />;
}
