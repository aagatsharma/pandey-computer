"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/reusable/products/product-card";
import { ProductSkeleton } from "@/components/reusable/products/product-skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Mock data for products
const mockProducts = [
  {
    id: "1",
    slug: "asus-rog-strix-g15-gaming-laptop",
    name: "ASUS ROG Strix G15 Gaming Laptop",
    description:
      'AMD Ryzen 9 5900HX, NVIDIA RTX 3070, 16GB RAM, 1TB SSD, 15.6" 300Hz Display',
    price: 145999,
    originalPrice: 175999,
    image: "/brands/acer.png",
    category: "Gaming Laptops",
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "2",
    slug: "logitech-g-pro-x-mechanical-gaming-keyboard",
    name: "Logitech G Pro X Mechanical Gaming Keyboard",
    description:
      "Hot-swappable switches, RGB lighting, tenkeyless design, tournament-grade performance",
    price: 12999,
    originalPrice: 15999,
    image: "/brands/acer.png",
    category: "Gaming Peripherals",
    inStock: true,
  },
  {
    id: "3",
    slug: "nvidia-geforce-rtx-4080-graphics-card",
    name: "NVIDIA GeForce RTX 4080 Graphics Card",
    description: "16GB GDDR6X, Ray Tracing, DLSS 3.0, 4K gaming performance",
    price: 112999,
    originalPrice: 125999,
    image: "/brands/acer.png",
    category: "Graphics Cards",
    inStock: true,
    badge: "Hot Deal",
  },
  {
    id: "4",
    slug: "corsair-vengeance-rgb-pro-32gb-ddr4",
    name: "Corsair Vengeance RGB Pro 32GB DDR4",
    description:
      "3600MHz, CL18, RGB lighting, optimized for AMD Ryzen and Intel platforms",
    price: 9999,
    image: "/brands/acer.png",
    category: "Memory",
    inStock: true,
  },
  {
    id: "5",
    slug: "samsung-980-pro-2tb-nvme-ssd",
    name: "Samsung 980 PRO 2TB NVMe SSD",
    description:
      "PCIe 4.0, Read speeds up to 7000 MB/s, perfect for gaming and content creation",
    price: 16999,
    originalPrice: 19999,
    image: "/brands/acer.png",
    category: "Storage",
    inStock: false,
  },
  {
    id: "6",
    slug: "razer-deathadder-v3-pro-wireless-gaming-mouse",
    name: "Razer DeathAdder V3 Pro Wireless Gaming Mouse",
    description:
      "30K DPI optical sensor, 90-hour battery life, lightweight design",
    price: 11999,
    image: "/brands/acer.png",
    category: "Gaming Peripherals",
    inStock: true,
  },
  {
    id: "7",
    slug: "nzxt-kraken-z73-rgb-aio-cpu-cooler",
    name: "NZXT Kraken Z73 RGB AIO CPU Cooler",
    description:
      "360mm radiator, customizable LCD display, Asetek pump, RGB fans",
    price: 24999,
    originalPrice: 29999,
    image: "/brands/acer.png",
    category: "Cooling",
    inStock: true,
  },
  {
    id: "8",
    slug: "lg-27-ultragear-gaming-monitor",
    name: 'LG 27" UltraGear Gaming Monitor',
    description:
      "4K IPS, 144Hz refresh rate, 1ms response time, G-Sync compatible, HDR10",
    price: 45999,
    originalPrice: 54999,
    image: "/brands/acer.png",
    category: "Monitors",
    inStock: true,
    badge: "New Arrival",
  },
];

const LatestProducts = () => {
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
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Latest Products
        </h2>
        <Link
          href="/shop"
          className="text-sm sm:text-base text-primary hover:underline font-medium"
        >
          View All Products →
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="relative px-2 sm:px-0">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {mockProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <ProductCard {...product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 sm:-left-4 lg:-left-12 h-10 w-10" />
            <CarouselNext className="-right-2 sm:-right-4 lg:-right-12 h-10 w-10" />
          </Carousel>
        </div>
      )}
    </section>
  );
};

export default LatestProducts;
