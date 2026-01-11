import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, Layers, FolderTree, Store } from "lucide-react";

const quickLinks = [
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
    description: "Manage your products",
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
    description: "Manage categories",
  },
  {
    title: "Sub Categories",
    href: "/admin/subcategories",
    icon: Layers,
    description: "Manage sub categories",
  },
  {
    title: "Brands",
    href: "/admin/brands",
    icon: Store,
    description: "Manage brands",
  },
  {
    title: "Sub Brands",
    href: "/admin/subbrands",
    icon: Store,
    description: "Manage sub brands",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Card
              key={link.href}
              className="p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="h-6 w-6 text-gray-700" />
                    </div>
                    <h3 className="font-semibold text-lg">{link.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{link.description}</p>
                  <Link href={link.href}>
                    <Button variant="outline" className="w-full">
                      Manage
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
