"use client";

import { Button } from "@/components/ui/button";

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: string;
  setPriceRange: (range: string) => void;
  availability: string;
  setAvailability: (status: string) => void;
  clearFilters: () => void;
}

const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under Rs.10,000", min: 0, max: 10000 },
  { label: "Rs.10,000 - Rs.25,000", min: 10000, max: 25000 },
  { label: "Rs.25,000 - Rs.50,000", min: 25000, max: 50000 },
  { label: "Rs.50,000 - Rs.100,000", min: 50000, max: 100000 },
  { label: "Above Rs.100,000", min: 100000, max: Infinity },
];

export function ProductFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  availability,
  setAvailability,
  clearFilters,
}: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-foreground">
          Categories
        </h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-foreground">
          Price Range
        </h3>
        <div className="space-y-1">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setPriceRange(range.label)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                priceRange === range.label
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-foreground">
          Availability
        </h3>
        <div className="space-y-1">
          {["All", "In Stock", "Out of Stock"].map((status) => (
            <button
              key={status}
              onClick={() => setAvailability(status)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                availability === status
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={clearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );
}
