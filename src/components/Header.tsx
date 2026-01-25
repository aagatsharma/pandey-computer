import { MapPin, Phone } from "lucide-react";
import Link from "next/link";
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
export const revalidate = 3600;

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

  return (
    <header className="w-full bg-muted sticky top-0 z-50 shadow-sm">
      {/* Top Info Bar */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-xs md:text-sm p-2">
            {/* Left: Tagline */}
            <div className="hidden md:block font-medium shrink-0">
              Think. Innovate. Succeed.
            </div>

            {/* Right: Contact Info */}
            <div className="flex items-center gap-4 max-lg:w-full justify-center">
              <Link
                href="tel:061-585498"
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              >
                <Phone size={14} />
                <span>061-585498</span>
              </Link>
              <Link
                href="https://maps.app.goo.gl/QVgnB6DGFTp8SfQB8"
                target="_blank"
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              >
                <MapPin size={14} />
                <span>Store Location</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <NavigationBar menuData={navigationData} />
    </header>
  );
}
