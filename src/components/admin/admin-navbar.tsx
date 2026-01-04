"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/admin" className="text-xl font-semibold">
            Admin Dashboard
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline">View Site</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
