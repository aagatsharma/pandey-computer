"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for categories
const mockCategories = [
  {
    id: "1",
    name: "Gaming Laptops",
    slug: "gaming-laptops",
    image: "/brands/acer.png",
    productCount: 145,
    description: "High-performance laptops for gaming",
  },
  {
    id: "2",
    name: "Graphics Cards",
    slug: "graphics-cards",
    image: "/brands/acer.png",
    productCount: 89,
    description: "Latest GPUs for ultimate performance",
  },
  {
    id: "3",
    name: "Gaming Keyboards",
    slug: "gaming-keyboards",
    image: "/brands/acer.png",
    productCount: 67,
    description: "Mechanical keyboards for gaming",
  },
  {
    id: "4",
    name: "Gaming Mice",
    slug: "gaming-mice",
    image: "/brands/acer.png",
    productCount: 54,
    description: "Precision gaming mice",
  },
  {
    id: "5",
    name: "Monitors",
    slug: "monitors",
    image: "/brands/acer.png",
    productCount: 112,
    description: "High refresh rate displays",
  },
  {
    id: "6",
    name: "PC Components",
    slug: "pc-components",
    image: "/brands/acer.png",
    productCount: 203,
    description: "Build your dream PC",
  },
];

const CategorySkeleton = () => (
  <div className="p-4 rounded-lg border bg-card">
    <Skeleton className="h-20 w-full rounded-md mb-3" />
    <Skeleton className="h-4 w-3/4" />
  </div>
);

const LatestCategories = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="container mx-auto my-20 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Shop by Category
          </h2>
          <p className="text-muted-foreground">
            Browse our wide range of product categories
          </p>
        </div>
        <Link
          href="/shop"
          className="text-sm sm:text-base text-primary hover:underline font-medium hidden sm:block"
        >
          View All →
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {mockCategories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="group block p-4 rounded-lg border bg-card hover:bg-accent transition-colors duration-200"
              >
                <div className="relative h-20 mb-3 rounded-md overflow-hidden bg-muted">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/shop"
              className="text-sm text-primary hover:underline font-medium"
            >
              View All Categories →
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default LatestCategories;
