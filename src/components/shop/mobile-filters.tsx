"use client";

import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { ProductFilters } from "./product-filters";

interface MobileFiltersProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: string;
  setPriceRange: (range: string) => void;
  availability: string;
  setAvailability: (status: string) => void;
  clearFilters: () => void;
}

export function MobileFilters({
  isOpen,
  setIsOpen,
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  availability,
  setAvailability,
  clearFilters,
}: MobileFiltersProps) {
  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Filter className="mr-2 h-4 w-4" />
          {isOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Mobile Filters Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-background border-r border-border overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                availability={availability}
                setAvailability={setAvailability}
                clearFilters={clearFilters}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
