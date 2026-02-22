"use client";
import { useState } from "react";
import TopInfoBar from "./top-info-bar";
import LogoAndSearchBar from "./logo-and-search-bar";
import DesktopNavMenu from "./desktop-nav-menu";
import MobileMenu from "./mobile-menu";

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

  // Filter only level 1 items (top-level navigation)
  const topLevelItems = menuData.filter((item) => item.level === 1);

  return (
    <header className="w-full bg-muted sticky top-0 z-50 shadow-sm">
      <TopInfoBar />
      <LogoAndSearchBar onMobileMenuOpen={() => setIsMobileMenuOpen(true)} />
      <DesktopNavMenu topLevelItems={topLevelItems} />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        topLevelItems={topLevelItems}
      />
    </header>
  );
}
