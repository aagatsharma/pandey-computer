"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import SearchBar from "./search-bar";
import MobileMenuItem from "./mobile-menu-item";

interface NavbarItem {
  _id: string;
  label: string;
  slug: string;
  level: 1 | 2 | 3;
  type: "category" | "brand" | "subCategory" | "subBrand";
  children?: NavbarItem[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  topLevelItems: NavbarItem[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  topLevelItems,
}: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background lg:hidden flex flex-col animate-in slide-in-from-right duration-300 overflow-hidden">
      {/* Mobile Menu Header */}
      <div className="flex items-center justify-between p-4 border-b shrink-0">
        <Link href="/" className="flex items-center" onClick={onClose}>
          <Image
            src="/logo.png"
            alt="Pandey Computer"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </Link>
        <button
          onClick={onClose}
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
          <SearchBar />

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
                  onClick={onClose}
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
                  closeMenu={onClose}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
