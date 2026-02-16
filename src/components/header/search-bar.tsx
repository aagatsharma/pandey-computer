"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, X, CircleArrowRight, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images?: string[];
  stock: boolean;
  category?: {
    name: string;
    slug: string;
  };
  brand?: {
    name: string;
    slug: string;
  };
}

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const debouncedSearch = useDebounce(searchQuery, 500);

  // Use SWR to fetch search results
  const { data, isLoading } = useSWR<{ data: Product[] }>(
    debouncedSearch.trim()
      ? `/api/products?name=${encodeURIComponent(debouncedSearch)}&limit=8`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 1000,
    },
  );

  const searchResults = data?.data || [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?name=${encodeURIComponent(searchQuery.trim())}`);
      setIsDropdownOpen(false);
      setSearchQuery("");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  const handleProductClick = () => {
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  // Derive whether to show results - no setState needed
  const shouldShowResults =
    isDropdownOpen && debouncedSearch.trim() && searchResults.length > 0;

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          name="search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder="Search for products..."
          className="w-full px-4 py-2.5 pl-10 pr-20 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-muted-foreground" />
          )}
        </div>

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1 hover:bg-accent rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
          <button
            type="submit"
            className="p-1 hover:bg-accent rounded-full transition-colors text-primary"
          >
            <CircleArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {shouldShowResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-input rounded-lg shadow-lg max-h-[500px] overflow-y-auto z-50">
          <div className="p-2">
            <div className="text-xs text-muted-foreground mb-2 px-2">
              {searchResults.length} result
              {searchResults.length !== 1 ? "s" : ""} found
            </div>
            <div className="space-y-1">
              {searchResults.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product.slug}`}
                  onClick={handleProductClick}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors"
                >
                  <div className="relative w-12 h-12 shrink-0 bg-muted rounded">
                    {product.images && product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Search className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {product.name}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-semibold text-primary">
                        Rs.{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          Rs.{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {(product.category || product.brand) && (
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {[product.category?.name, product.brand?.name]
                          .filter(Boolean)
                          .join(" • ")}
                      </div>
                    )}
                  </div>
                  {!product.stock && (
                    <span className="text-xs text-red-600 font-medium">
                      Out of Stock
                    </span>
                  )}
                </Link>
              ))}
            </div>
            {searchResults.length >= 8 && (
              <Link
                href={`/shop?name=${encodeURIComponent(searchQuery.trim())}`}
                onClick={handleProductClick}
                className="block text-center text-sm text-primary hover:underline mt-2 py-2"
              >
                View all results
              </Link>
            )}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {isDropdownOpen &&
        !isLoading &&
        debouncedSearch.trim() &&
        searchResults.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-input rounded-lg shadow-lg z-50">
            <div className="p-4 text-center text-sm text-muted-foreground">
              No products found for &quot;{debouncedSearch}&quot;
            </div>
          </div>
        )}
    </div>
  );
}
