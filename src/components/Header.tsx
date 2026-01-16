import { MapPin, Phone } from "lucide-react";
import Link from "next/link";
import NavigationBar from "./header/navigation-bar";

interface NavbarItem {
  _id: string;
  label: string;
  slug: string;
  level: 1 | 2 | 3;
  type: "category" | "brand" | "subCategory" | "subBrand";
  children?: NavbarItem[];
}

async function getNavigationData(): Promise<NavbarItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/navbar-items?nested=true`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch navigation data");
      return [];
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching navigation data:", error);
    return [];
  }
}

export default async function Header() {
  const navigationData = await getNavigationData();

  return (
    <header className="w-full bg-background sticky top-0 z-50 shadow-sm">
      {/* Top Info Bar */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-xs md:text-sm">
            {/* Left: Tagline */}
            <div className="hidden md:block font-medium">
              Think. Innovate. Succeed.
            </div>

            {/* Middle: Delivery Info */}
            <div className="flex-1 md:flex-none text-center font-medium">
              Free Delivery All Over Nepal
            </div>

            {/* Right: Contact Info */}
            <div className="hidden lg:flex items-center gap-4">
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
