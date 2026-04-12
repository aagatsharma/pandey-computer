import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminNavbar } from "@/components/admin/admin-navbar";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-foreground">
      <AdminNavbar />
      <div className="mx-auto flex w-full max-w-450 gap-6 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <AdminSidebar />
        <main className="min-w-0 flex-1">
          <div className="rounded-2xl border border-border/80 bg-white p-4 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.35)] sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
