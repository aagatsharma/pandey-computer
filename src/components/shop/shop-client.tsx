"use client";

import { useState, useMemo } from "react";
import { ProductFilters } from "@/components/shop/product-filters";
import { ProductsGrid } from "@/components/shop/products-grid";
import { MobileFilters } from "@/components/shop/mobile-filters";
import { IProduct } from "@/lib/models/Product";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under Rs.10,000", min: 0, max: 10000 },
  { label: "Rs.10,000 - Rs.25,000", min: 10000, max: 25000 },
  { label: "Rs.25,000 - Rs.50,000", min: 25000, max: 50000 },
  { label: "Rs.50,000 - Rs.100,000", min: 50000, max: 100000 },
  { label: "Above Rs.100,000", min: 100000, max: Infinity },
];

export function ShopClient() {
  const [selectedSuperCategory, setSelectedSuperCategory] =
    useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("All");
  const [availability, setAvailability] = useState<string>("All");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Build query params for API
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (selectedSuperCategory !== "All")
      params.append("superCategory", selectedSuperCategory);
    if (selectedCategory !== "All") params.append("category", selectedCategory);
    if (selectedSubCategory !== "All")
      params.append("subCategory", selectedSubCategory);
    if (selectedBrand !== "All") params.append("brand", selectedBrand);

    const selectedPriceRange = priceRanges.find((r) => r.label === priceRange);
    if (selectedPriceRange && priceRange !== "All") {
      if (selectedPriceRange.min > 0)
        params.append("minPrice", selectedPriceRange.min.toString());
      if (selectedPriceRange.max !== Infinity)
        params.append("maxPrice", selectedPriceRange.max.toString());
    }

    if (availability === "In Stock") params.append("inStock", "true");
    if (availability === "Out of Stock") params.append("inStock", "false");

    return params.toString();
  }, [
    selectedSuperCategory,
    selectedCategory,
    selectedSubCategory,
    selectedBrand,
    priceRange,
    availability,
  ]);

  const { data, isLoading } = useSWR<{ data: IProduct[] }>(
    `/api/products${queryParams ? `?${queryParams}` : ""}`,
    fetcher
  );

  const products = useMemo(() => data?.data || [], [data]);

  // Extract unique filter options from products
  const superCategories = useMemo(
    () => [
      "All",
      ...(Array.from(
        new Set(products.map((p) => p.superCategory?.name).filter(Boolean))
      ) as string[]),
    ],
    [products]
  );

  const categories = useMemo(
    () => [
      "All",
      ...(Array.from(
        new Set(products.map((p) => p.category?.name).filter(Boolean))
      ) as string[]),
    ],
    [products]
  );

  const subCategories = useMemo(
    () => [
      "All",
      ...(Array.from(
        new Set(products.map((p) => p.subCategory?.name).filter(Boolean))
      ) as string[]),
    ],
    [products]
  );

  const brands = useMemo(
    () => [
      "All",
      ...(Array.from(
        new Set(products.map((p) => p.brand?.name).filter(Boolean))
      ) as string[]),
    ],
    [products]
  );

  const filteredProducts = products;

  const clearFilters = () => {
    setSelectedSuperCategory("All");
    setSelectedCategory("All");
    setSelectedSubCategory("All");
    setSelectedBrand("All");
    setPriceRange("All");
    setAvailability("All");
  };

  return (
    <section className="container mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <MobileFilters
          isOpen={mobileFiltersOpen}
          setIsOpen={setMobileFiltersOpen}
          superCategories={superCategories}
          selectedSuperCategory={selectedSuperCategory}
          setSelectedSuperCategory={setSelectedSuperCategory}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          subCategories={subCategories}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          brands={brands}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          availability={availability}
          setAvailability={setAvailability}
          clearFilters={clearFilters}
        />

        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block lg:w-64 shrink-0">
          <div className="sticky top-4 border border-border rounded-lg p-4">
            <h2 className="text-lg font-bold text-foreground mb-4">Filters</h2>
            <ProductFilters
              superCategories={superCategories}
              selectedSuperCategory={selectedSuperCategory}
              setSelectedSuperCategory={setSelectedSuperCategory}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              subCategories={subCategories}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
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
