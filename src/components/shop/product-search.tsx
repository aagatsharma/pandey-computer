"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProductSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resultsCount: number;
  isLoading: boolean;
}

export function ProductSearch({
  searchQuery,
  setSearchQuery,
  resultsCount,
  isLoading,
}: ProductSearchProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {isLoading ? "Loading..." : `${resultsCount} products found`}
        </p>
      </div>
    </div>
  );
}
