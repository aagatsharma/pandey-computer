"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Menu, X } from "lucide-react";

interface NavbarItem {
  _id: string;
  label: string;
  slug: string;
  level: 1 | 2 | 3;
  type: "category" | "brand" | "subCategory" | "subBrand";
  children?: NavbarItem[];
}

interface NavigationBarProps {
  menuData: NavbarItem[];
}

export default function NavigationBar({ menuData }: NavigationBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Filter only level 1 items (top-level navigation)
  const topLevelItems = menuData.filter((item) => item.level === 1);


  return (
    <>
      {/* Section 1: Logo, Search, Cart */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Pandey Computer"
                width={150}
                height={50}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2.5 pl-10 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {/* Right Side: Cart & Mobile Menu */}
            <div className="flex items-center gap-4">
              <Link
                href="/cart"
                className="text-foreground hover:text-primary transition-colors"
              >
                <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-foreground hover:text-primary transition-all"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Navigation Menu */}
      <nav className="bg-primary text-white hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex items-center h-12 gap-1">
            {topLevelItems.map((menu) => (
              <div key={menu._id} className="group">
                {/* Top Level */}
                <Link
                  href={`/shop?${menu.type}=${menu.slug}`}
                  className="flex items-center h-12 px-3 hover:bg-primary/80 text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {menu.label}
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {/* Mega Menu Dropdown - Positioned relative to nav container */}
                <div
                  className="absolute left-0 right-0 top-12
                              bg-white text-gray-800 shadow-2xl border-t-2 border-red-600
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-all duration-200 z-50"
                >
                  <div className="p-6">
                    <div
                      className="grid gap-4 text-sm w-full"
                      style={{
                        gridTemplateColumns: `repeat(${Math.min(
                          menu.children?.length || 0,
                          5
                        )}, 1fr)`,
                      }}
                    >
                      {menu.children?.map((section) => (
                        <div key={section._id} className="min-w-0">
                          {/* Category/Brand Header */}
                          <Link
                            href={`/shop?${menu.type}=${menu.slug}&${section.type}=${section.slug}`}
                            className="block"
                          >
                            <h4 className="text-red-600 font-semibold hover:text-red-700 transition-colors pb-2 text-base">
                              {section.label}
                            </h4>
                          </Link>

                          {/* Subcategory Items */}
                          <ul className="space-y-2">
                            {section.children?.map((item) => (
                              <li key={item._id}>
                                <Link
                                  href={`/shop?${menu.type}=${menu.slug}&${section.type}=${section.slug}&${item.type}=${item.slug}`}
                                  className="block text-gray-700 hover:text-red-600 hover:translate-x-1 transition-all duration-150 w-fit"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b bg-background animate-in slide-in-from-top-5 duration-300">
          <nav className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <div className="mb-4 md:hidden">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2.5 pl-10 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className={`block py-3 px-4 rounded-md transition-colors ${pathname === "/"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>

              {/* Dynamic Mega Menu Categories */}
              {topLevelItems.map((menu) => (
                <li key={menu._id}>
                  <Link
                    href={`/shop?${menu.type}=${menu.slug}`}
                    className={`block py-3 px-4 rounded-md transition-colors ${pathname.startsWith(`/shop`) && pathname.includes(`${menu.type}=${menu.slug}`)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="/about"
                  className={`block py-3 px-4 rounded-md transition-colors ${pathname === "/about"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`block py-3 px-4 rounded-md transition-colors ${pathname === "/contact"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
