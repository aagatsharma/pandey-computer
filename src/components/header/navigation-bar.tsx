"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  CircleArrowRight,
  Phone,
  MapPin,
} from "lucide-react";
import CartIcon from "./cart-icon";

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

interface MobileMenuItemProps {
  item: NavbarItem;
  parentParams: string;
  closeMenu: () => void;
}

const MobileMenuItem = ({
  item,
  parentParams,
  closeMenu,
}: MobileMenuItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;

  // Construct the query params for this item
  const currentParams = parentParams
    ? `${parentParams}&${item.type}=${item.slug}`
    : `${item.type}=${item.slug}`;

  const href = `/shop?${currentParams}`;
  const isActive =
    pathname.startsWith("/shop") && pathname.includes(currentParams);

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={href}
          className={`block py-3 px-4 text-sm rounded-md transition-colors ${
            isActive
              ? "bg-primary/10 text-primary font-medium"
              : "text-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
          onClick={closeMenu}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <div className="flex flex-col">
        <div
          className={`flex items-center justify-between py-3 px-4 rounded-md transition-colors cursor-pointer ${
            isActive || isExpanded ? "bg-accent/50" : "hover:bg-accent"
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span
            className={`text-sm ${isActive ? "text-primary font-medium" : "text-foreground"}`}
          >
            {item.label}
          </span>
          <button
            className="p-1 hover:bg-background rounded-full transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
        {isExpanded && (
          <ul className="pl-4 border-l ml-4 space-y-1 my-1">
            {/* Link to the category itself */}
            <li>
              <Link
                href={href}
                className="block py-2 px-4 text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={closeMenu}
              >
                All {item.label}
              </Link>
            </li>
            {item.children!.map((child) => (
              <MobileMenuItem
                key={child._id}
                item={child}
                parentParams={currentParams}
                closeMenu={closeMenu}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

export default function NavigationBar({ menuData }: NavigationBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?name=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  // Filter only level 1 items (top-level navigation)
  const topLevelItems = menuData.filter((item) => item.level === 1);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // scrolling down → collapse
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsCollapsed(true);
      }

      // scrolling up → expand
      if (currentScrollY < lastScrollY.current) {
        setIsCollapsed(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full bg-muted sticky top-0 z-50 shadow-sm">
      {/* Section 1: Top Info Bar */}
      <div
        className={`border-b overflow-hidden transition-all duration-300 ease-in-out
    ${isCollapsed ? "max-h-0 opacity-0" : "max-h-20 opacity-100"}
  `}
      >
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

      {/* Section 2: Logo, Search, Cart */}
      <div className="border-b bg-background sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
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
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  name="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full px-4 py-2.5 pl-10 pr-20 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="p-1 hover:bg-accent rounded-full transition-colors"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="p-1 hover:bg-accent rounded-full transition-colors text-primary"
                  >
                    <CircleArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Side: Cart & Mobile Menu */}
            <div className="flex items-center gap-4">
              <CartIcon />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-foreground hover:text-primary transition-all"
                aria-label="Open mobile menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Navigation Menu (Desktop) */}
      <nav
        className={`bg-primary text-white hidden lg:block
    transition-all duration-300 ease-in-out
    ${isCollapsed ? "max-h-0 opacity-0" : "max-h-12 opacity-100"}
  `}
      >
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center h-12 gap-1">
            {topLevelItems.map((menu) => (
              <div key={menu._id} className="group">
                {/* Top Level */}
                <Link
                  href={`/shop?${menu.type}=${menu.slug}`}
                  className="flex items-center h-12 px-3 text-sm font-medium transition-colors whitespace-nowrap hover:bg-white hover:text-primary"
                >
                  {menu.label}
                  <ChevronDown className="ml-1 size-4 group-hover:rotate-180 transition-transform duration-300" />
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
                          5,
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
                            <h4 className="text-black font-semibold hover:opacity-70 transition-colors pb-2 text-base">
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden flex flex-col animate-in slide-in-from-right duration-300">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src="/logo.png"
                alt="Pandey Computer"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-foreground hover:bg-accent rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  name="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full px-4 py-2.5 pl-10 pr-20 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="p-1 hover:bg-accent rounded-full transition-colors"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="p-1 hover:bg-accent rounded-full transition-colors text-primary"
                  >
                    <CircleArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </form>

              {/* Navigation Links */}
              <nav>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/"
                      className={`block py-3 px-4 text-sm rounded-md transition-colors ${
                        pathname === "/"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>

                  {/* Dynamic Recursive Menu */}
                  {topLevelItems.map((menu) => (
                    <MobileMenuItem
                      key={menu._id}
                      item={menu}
                      parentParams=""
                      closeMenu={() => setIsMobileMenuOpen(false)}
                    />
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
