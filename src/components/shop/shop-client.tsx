"use client";

import { useState, useEffect } from "react";
import { ProductFilters } from "@/components/shop/product-filters";
import { ProductsGrid } from "@/components/shop/products-grid";
import { MobileFilters } from "@/components/shop/mobile-filters";

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  badge?: string;
}

interface ShopClientProps {
  products: Product[];
}

const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under Rs.10,000", min: 0, max: 10000 },
  { label: "Rs.10,000 - Rs.25,000", min: 10000, max: 25000 },
  { label: "Rs.25,000 - Rs.50,000", min: 25000, max: 50000 },
  { label: "Rs.50,000 - Rs.100,000", min: 50000, max: 100000 },
  { label: "Above Rs.100,000", min: 100000, max: Infinity },
];

export function ShopClient({ products }: ShopClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("All");
  const [availability, setAvailability] = useState<string>("All");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;

    const selectedPriceRange = priceRanges.find((r) => r.label === priceRange);
    const priceMatch =
      !selectedPriceRange ||
      priceRange === "All" ||
      (product.price >= selectedPriceRange.min &&
        product.price <= selectedPriceRange.max);

    const availabilityMatch =
      availability === "All" ||
      (availability === "In Stock" && product.inStock) ||
      (availability === "Out of Stock" && !product.inStock);

    return categoryMatch && priceMatch && availabilityMatch;
  });

  const clearFilters = () => {
    setSelectedCategory("All");
    setPriceRange("All");
    setAvailability("All");
  };

  return (
    <section className="container mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <MobileFilters
          isOpen={mobileFiltersOpen}
          setIsOpen={setMobileFiltersOpen}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          availability={availability}
          setAvailability={setAvailability}
          clearFilters={clearFilters}
        />

        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <div className="sticky top-4 border border-border rounded-lg p-4">
            <h2 className="text-lg font-bold text-foreground mb-4">Filters</h2>
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
        </aside>

        {/* Products Grid */}
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <p className="text-muted-foreground text-sm">
              {isLoading
                ? "Loading..."
                : `${filteredProducts.length} products found`}
            </p>
          </div>

          <ProductsGrid
            products={filteredProducts}
            isLoading={isLoading}
            clearFilters={clearFilters}
          />
        </div>
      </div>
    </section>
  );
}
