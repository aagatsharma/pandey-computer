"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IBrand } from "@/lib/models/Brand";

interface BrandsClientProps {
  brands: IBrand[];
}

export function BrandsClient({ brands }: BrandsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
        <div className="w-full sm:w-96">
          <input
            type="text"
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredBrands.length} brands found
        </div>
      </div>

      {/* Brands Grid */}
      {filteredBrands.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {filteredBrands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/shop?brand=${brand.slug}`}
              className="bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col items-center justify-center group"
            >
              <div className="relative w-24 h-24 mb-4">
                {brand.logo && (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                )}
              </div>
              <p className="text-sm font-semibold text-card-foreground text-center mb-2">
                {brand.name}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            No brands found matching &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </section>
  );
}
