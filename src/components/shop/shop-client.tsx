"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductsGrid } from "@/components/shop/products-grid";
import { IProduct } from "@/lib/models/Product";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, Filter } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FilterOption {
  _id: string;
  name: string;
  slug: string;
}

interface SubCategoryOption extends FilterOption {
  category: string;
}

interface SubBrandOption extends FilterOption {
  brand: string;
}

interface FilterData {
  categories: FilterOption[];
  subCategories: SubCategoryOption[];
  brands: (FilterOption & { logo?: string })[];
  subBrands: SubBrandOption[];
}

export function ShopClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for all filters
  const [searchName, setSearchName] = useState(searchParams.get("name") || "");
  const [debouncedName, setDebouncedName] = useState(searchName);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    searchParams.get("subCategory") || "",
  );
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || "",
  );
  const [selectedSubBrand, setSelectedSubBrand] = useState(
    searchParams.get("subBrand") || "",
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [debouncedMinPrice, setDebouncedMinPrice] = useState(minPrice);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maxPrice);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1"),
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchName(searchParams.get("name") || "");
    setSelectedCategory(searchParams.get("category") || "");
    setSelectedSubCategory(searchParams.get("subCategory") || "");
    setSelectedBrand(searchParams.get("brand") || "");
    setSelectedSubBrand(searchParams.get("subBrand") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setCurrentPage(parseInt(searchParams.get("page") || "1"));
  }, [searchParams]);

  // Debounce search name
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(searchName);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchName]);

  // Debounce min price
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMinPrice(minPrice);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [minPrice]);

  // Debounce max price
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMaxPrice(maxPrice);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [maxPrice]);

  // Fetch filter options
  const { data: filterData } = useSWR<{ data: FilterData }>(
    "/api/products/filters",
    fetcher,
  );

  // Build query params for API
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();

    if (debouncedName) params.append("name", debouncedName);
    if (selectedCategory) params.append("category", selectedCategory);
    if (selectedSubCategory) params.append("subCategory", selectedSubCategory);
    if (selectedBrand) params.append("brand", selectedBrand);
    if (selectedSubBrand) params.append("subBrand", selectedSubBrand);
    if (debouncedMinPrice) params.append("minPrice", debouncedMinPrice);
    if (debouncedMaxPrice) params.append("maxPrice", debouncedMaxPrice);
    params.append("page", currentPage.toString());
    params.append("limit", "12");

    return params.toString();
  }, [
    debouncedName,
    selectedCategory,
    selectedSubCategory,
    selectedBrand,
    selectedSubBrand,
    debouncedMinPrice,
    debouncedMaxPrice,
    currentPage,
  ]);

  // Update URL params
  useEffect(() => {
    router.push(`/shop?${queryParams}`, { scroll: false });
  }, [queryParams, router]);

  const { data, isLoading } = useSWR<{
    data: IProduct[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>(`/api/products?${queryParams}`, fetcher);

  const products = useMemo(() => data?.data || [], [data]);
  const pagination = data?.pagination;

  // Filter sub-categories based on selected category
  const filteredSubCategories = useMemo(() => {
    if (!filterData?.data?.subCategories) return [];
    if (!selectedCategory) return filterData.data.subCategories;

    // Find the selected category's _id
    const selectedCat = filterData.data.categories.find(
      (cat) => cat.slug === selectedCategory,
    );
    if (!selectedCat) return filterData.data.subCategories;

    return filterData.data.subCategories.filter(
      (subCat) => subCat.category === selectedCat._id,
    );
  }, [filterData, selectedCategory]);

  // Filter sub-brands based on selected brand
  const filteredSubBrands = useMemo(() => {
    if (!filterData?.data?.subBrands) return [];
    if (!selectedBrand) return filterData.data.subBrands;

    // Find the selected brand's _id
    const selectedBrandObj = filterData.data.brands.find(
      (brand) => brand.slug === selectedBrand,
    );
    if (!selectedBrandObj) return filterData.data.subBrands;

    return filterData.data.subBrands.filter(
      (subBrand) => subBrand.brand === selectedBrandObj._id,
    );
  }, [filterData, selectedBrand]);

  const clearFilters = useCallback(() => {
    setSearchName("");
    setDebouncedName("");
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSelectedBrand("");
    setSelectedSubBrand("");
    setMinPrice("");
    setMaxPrice("");
    setDebouncedMinPrice("");
    setDebouncedMaxPrice("");
    setCurrentPage(1);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return !!(
      debouncedName ||
      selectedCategory ||
      selectedSubCategory ||
      selectedBrand ||
      selectedSubBrand ||
      debouncedMinPrice ||
      debouncedMaxPrice
    );
  }, [
    debouncedName,
    selectedCategory,
    selectedSubCategory,
    selectedBrand,
    selectedSubBrand,
    debouncedMinPrice,
    debouncedMaxPrice,
  ]);

  const filterContent = (
    <div className="space-y-6">
      {/* Search by Name */}
      <div>
        <Label htmlFor="search" className="text-sm font-semibold mb-2 block">
          Search Products
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">Category</Label>
        <Select
          value={selectedCategory}
          onValueChange={(value) => {
            const newCategory = value === "all" ? "" : value;
            setSelectedCategory(newCategory);
            // Clear sub-category when category changes
            if (newCategory !== selectedCategory) {
              setSelectedSubCategory("");
            }
            setCurrentPage(1);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {filterData?.data?.categories.map((cat) => (
              <SelectItem key={cat._id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sub Category */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">Sub Category</Label>
        <Select
          value={selectedSubCategory}
          onValueChange={(value) => {
            setSelectedSubCategory(value === "all" ? "" : value);
            setCurrentPage(1);
          }}
          disabled={!selectedCategory}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                selectedCategory
                  ? "All Sub Categories"
                  : "Select category first"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sub Categories</SelectItem>
            {filteredSubCategories.map((sub) => (
              <SelectItem key={sub._id} value={sub.slug}>
                {sub.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brand */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">Brand</Label>
        <Select
          value={selectedBrand}
          onValueChange={(value) => {
            const newBrand = value === "all" ? "" : value;
            setSelectedBrand(newBrand);
            // Clear sub-brand when brand changes
            if (newBrand !== selectedBrand) {
              setSelectedSubBrand("");
            }
            setCurrentPage(1);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {filterData?.data?.brands.map((brand) => (
              <SelectItem key={brand._id} value={brand.slug}>
                <div className="flex items-center gap-2">
                  {brand.logo && (
                    <div className="relative w-5 h-5 shrink-0">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span>{brand.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sub Brand */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">Sub Brand</Label>
        <Select
          value={selectedSubBrand}
          onValueChange={(value) => {
            setSelectedSubBrand(value === "all" ? "" : value);
            setCurrentPage(1);
          }}
          disabled={!selectedBrand}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                selectedBrand ? "All Sub Brands" : "Select brand first"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sub Brands</SelectItem>
            {filteredSubBrands.map((sub) => (
              <SelectItem key={sub._id} value={sub.slug}>
                {sub.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">Price Range</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setCurrentPage(1);
              }}
              min="0"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setCurrentPage(1);
              }}
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="w-4 h-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <section className="container mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filters */}
        <div className="lg:hidden">
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                    Active
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">{filterContent}</div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:w-72 shrink-0">
          <div className="sticky top-4 border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">Filters</h2>
            {filterContent}
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1 min-w-0">
          <ProductsGrid
            products={products}
            isLoading={isLoading}
            clearFilters={clearFilters}
          />

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    // Show first page, last page, current page, and pages around current
                    return (
                      page === 1 ||
                      page === pagination.totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .map((page, index, array) => {
                    // Add ellipsis
                    const showEllipsis =
                      index > 0 && page - array[index - 1] > 1;
                    return (
                      <div key={page} className="flex items-center gap-1">
                        {showEllipsis && (
                          <span className="px-2 text-muted-foreground">
                            ...
                          </span>
                        )}
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => setCurrentPage(page)}
                          className="w-10"
                        >
                          {page}
                        </Button>
                      </div>
                    );
                  })}
              </div>

              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                disabled={currentPage === pagination.totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
