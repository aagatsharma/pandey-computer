import {
  BookOpen,
  ChartBarStacked,
  FolderTree,
  Home,
  Image,
  LayoutDashboard,
  Package,
  PackageCheck,
  Store,
  Tag,
} from "lucide-react";

export type AdminNavItem = {
  title: string;
  href: string;
  icon: typeof LayoutDashboard;
};

export type AdminNavSection = {
  title: string;
  items: AdminNavItem[];
};

export const adminNavSections: AdminNavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Catalog",
    items: [
      {
        title: "Products",
        href: "/admin/products",
        icon: Package,
      },
      {
        title: "Categories",
        href: "/admin/categories",
        icon: FolderTree,
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
    ],
  },
  {
    title: "Content",
    items: [
      {
        title: "Home Wallpapers",
        href: "/admin/home-wallpaper",
        icon: Image,
      },
      {
        title: "Navbar Items",
        href: "/admin/navbar-items",
        icon: Home,
      },
      {
        title: "Blogs",
        href: "/admin/blogs",
        icon: BookOpen,
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        title: "Orders",
        href: "/admin/orders",
        icon: PackageCheck,
      },
    ],
  },
];
