"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Tag,
  Layers,
  FolderTree,
  Store,
  Image,
  BookOpen,
  ChartBarStacked,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Home Wallpapers",
    href: "/admin/home-wallpaper",
    icon: Image,
  },
  {
    title: "Navbar Items",
    href: "/admin/navbar-items",
    icon: FolderTree,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Layers,
  },
  {
    title: "Sub Categories",
    href: "/admin/subcategories",
    icon: Tag,
  },
  {
    title: "Brands",
    href: "/admin/brands",
    icon: Store,
  },
  {
    title: "Sub Brands",
    href: "/admin/subbrands",
    icon: ChartBarStacked,
  },
  {
    title: "Blogs",
    href: "/admin/blogs",
    icon: BookOpen,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 sticky top-[57px] h-[calc(100vh-62px)]">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
