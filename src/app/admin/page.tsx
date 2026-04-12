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
      <div className="rounded-xl border border-border bg-slate-50 px-5 py-6 sm:px-6 sm:py-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              Admin Overview
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Dashboard
            </h1>
            <p className="mt-1 text-muted-foreground">
              Welcome back. Pick a section and keep your store updated.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Card
              key={link.href}
              className="rounded-xl border border-border/80 bg-white p-5 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.28)] transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_12px_30px_-20px_rgba(177,18,38,0.25)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg border border-primary/20 bg-primary/10 p-2.5 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-lg">{link.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                  <Link href={link.href}>
                    <Button
                      variant="outline"
                      className="w-full border-primary/20 bg-background hover:bg-primary hover:text-primary-foreground"
                    >
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
