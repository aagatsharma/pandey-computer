"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, PanelLeft, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { adminNavSections } from "./admin-nav";

export function AdminNavbar() {
  const pathname = usePathname();

  const activeSection = adminNavSections.find((section) =>
    section.items.some(
      (item) =>
        pathname === item.href ||
        (item.href !== "/admin" && pathname.startsWith(`${item.href}/`)),
    ),
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-border/80 bg-white text-foreground">
      <div className="mx-auto flex h-16 w-full max-w-450 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 border border-border text-foreground hover:bg-primary/10 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open admin navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="border-r border-border bg-white text-foreground sm:max-w-sm"
            >
              <SheetHeader className="mb-4 text-left">
                <SheetTitle className="flex items-center gap-2 text-foreground">
                  <Shield className="h-5 w-5 text-primary" />
                  Admin Studio
                </SheetTitle>
                <SheetDescription className="text-muted-foreground">
                  Manage content and commerce tools from the same navigation.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-5 overflow-y-auto pr-2">
                {adminNavSections.map((section) => (
                  <div key={section.title} className="space-y-2">
                    <p className="px-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {section.title}
                    </p>
                    <div className="space-y-1.5">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                          pathname === item.href ||
                          (item.href !== "/admin" &&
                            pathname.startsWith(`${item.href}/`));

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-slate-100 hover:text-foreground",
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-lg border",
                                isActive
                                  ? "border-white/25 bg-white/15 text-primary-foreground"
                                  : "border-border bg-background text-muted-foreground",
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </span>
                            <span className="flex-1">{item.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/admin" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
              <PanelLeft className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg">
                  Admin Dashboard
                </h1>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/">
            <Button
              variant="outline"
              className="border-border bg-background text-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
            >
              View Site
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
