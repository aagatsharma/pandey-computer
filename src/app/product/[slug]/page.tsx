"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

// Mock data for products (same as in shop page)
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
    specs: [
      "Processor: AMD Ryzen 9 5900HX",
      "Graphics: NVIDIA GeForce RTX 3070",
      "RAM: 16GB DDR4",
      "Storage: 1TB NVMe SSD",
      'Display: 15.6" Full HD 300Hz',
      "OS: Windows 11",
    ],
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
    specs: [
      "Hot-swappable mechanical switches",
      "RGB per-key lighting",
      "Tenkeyless design",
      "Detachable USB cable",
      "Tournament-grade build",
    ],
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
    specs: [
      "Memory: 16GB GDDR6X",
      "Ray Tracing technology",
      "DLSS 3.0 support",
      "4K gaming ready",
      "PCIe 4.0 interface",
    ],
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
    specs: [
      "Capacity: 32GB (2 x 16GB)",
      "Speed: 3600MHz",
      "Latency: CL18",
      "RGB lighting",
      "Optimized for Ryzen & Intel",
    ],
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
    specs: [
      "Capacity: 2TB",
      "Interface: PCIe 4.0 x4 NVMe",
      "Read Speed: up to 7000 MB/s",
      "Write Speed: up to 5000 MB/s",
      "Form Factor: M.2 2280",
    ],
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
    specs: [
      "Sensor: 30K DPI optical",
      "Battery: 90-hour life",
      "Weight: 63g lightweight",
      "Wireless connectivity",
      "Ergonomic design",
    ],
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
    specs: [
      "Radiator: 360mm",
      "LCD display for customization",
      "Asetek pump",
      "RGB fans included",
      "Compatible with major sockets",
    ],
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
    specs: [
      "Size: 27 inches",
      "Resolution: 4K UHD",
      "Refresh Rate: 144Hz",
      "Response Time: 1ms",
      "G-Sync compatible",
      "HDR10 support",
    ],
  },
  {
    id: "9",
    slug: "amd-ryzen-9-5950x-processor",
    name: "AMD Ryzen 9 5950X Processor",
    description:
      "16-core, 32-thread, up to 4.9 GHz, PCIe 4.0, unlocked for overclocking",
    price: 52999,
    originalPrice: 62999,
    image: "/brands/acer.png",
    category: "Processors",
    inStock: true,
    specs: [
      "Cores: 16",
      "Threads: 32",
      "Max Boost: 4.9 GHz",
      "PCIe 4.0 support",
      "Unlocked for overclocking",
    ],
  },
  {
    id: "10",
    slug: "corsair-rm850x-power-supply",
    name: "Corsair RM850x Power Supply",
    description:
      "850W, 80 PLUS Gold, fully modular, low noise operation, 10-year warranty",
    price: 11999,
    image: "/brands/acer.png",
    category: "Power Supplies",
    inStock: true,
    specs: [
      "Wattage: 850W",
      "Efficiency: 80 PLUS Gold",
      "Fully modular cables",
      "Low noise operation",
      "10-year warranty",
    ],
  },
  {
    id: "11",
    slug: "asus-rog-strix-b550-f-gaming-motherboard",
    name: "ASUS ROG Strix B550-F Gaming Motherboard",
    description: "AMD AM4 socket, PCIe 4.0, Dual M.2, 2.5Gb LAN, USB 3.2 Gen 2",
    price: 18999,
    originalPrice: 22999,
    image: "/brands/acer.png",
    category: "Motherboards",
    inStock: true,
    specs: [
      "Socket: AMD AM4",
      "PCIe 4.0 support",
      "Dual M.2 slots",
      "2.5Gb LAN",
      "USB 3.2 Gen 2",
    ],
  },
  {
    id: "12",
    slug: "hyperx-cloud-ii-gaming-headset",
    name: "HyperX Cloud II Gaming Headset",
    description:
      "7.1 surround sound, memory foam ear cushions, detachable microphone",
    price: 7999,
    originalPrice: 9999,
    image: "/brands/acer.png",
    category: "Gaming Peripherals",
    inStock: true,
    badge: "Popular",
    specs: [
      "7.1 virtual surround sound",
      "Memory foam ear cushions",
      "Detachable microphone",
      "USB audio control box",
      "Multi-platform compatible",
    ],
  },
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const product = mockProducts.find((p) => p.slug === params.slug);

  if (!isLoading && !product) {
    notFound();
  }

  if (isLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-foreground">
              Shop
            </Link>
            <span>/</span>
            <Link
              href={`/shop?category=${product.category}`}
              className="hover:text-foreground"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="container mx-auto my-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
                  {product.badge}
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
                  -{discount}% OFF
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">
              {product.category}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-foreground">
                Rs.{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    Rs.{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-lg text-green-600 font-semibold">
                    Save Rs.
                    {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <span className="text-green-600 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  In Stock
                </span>
              ) : (
                <span className="text-red-600 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  Out of Stock
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            {product.inStock && (
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-16 text-center font-semibold text-lg">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                  >
                    +
                  </Button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="flex-1" disabled={!product.inStock}>
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
            </div>

            {/* Specifications */}
            <div className="border-t border-border pt-8">
              <h2 className="text-xl font-bold mb-4">Specifications</h2>
              <ul className="space-y-3">
                {product.specs?.map((spec, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="text-primary mt-1">✓</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
