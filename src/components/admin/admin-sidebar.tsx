"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminNavSections } from "./admin-nav";

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-80 shrink-0 lg:block">
      <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-white p-4 shadow-[0_10px_26px_-22px_rgba(15,23,42,0.35)]">
        <div className="mb-4 rounded-xl border border-border bg-slate-50 px-4 py-4 text-foreground">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-600">
                Admin Studio
              </p>
              <h2 className="mt-1 text-lg font-semibold">Pandey Computer</h2>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto pr-1">
          {adminNavSections.map((section) => (
            <div key={section.title} className="space-y-2">
              <p className="px-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {section.title}
              </p>

              <div className="space-y-1.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                          : "text-muted-foreground hover:bg-slate-100 hover:text-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg border transition-colors",
                          isActive
                            ? "border-white/25 bg-white/15 text-primary-foreground"
                            : "border-border bg-background text-muted-foreground group-hover:border-slate-300 group-hover:text-foreground",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex-1">{item.title}</span>
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-white/80" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
