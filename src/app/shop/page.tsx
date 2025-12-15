import { ShopClient } from "@/components/shop/shop-client";

// Mock data for all products
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
  },
];

export default function ShopPage() {
  // In a real app, you would fetch products here using async/await
  // const products = await fetchProducts();

  return (
    <div className="min-h-screen">
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Shop All Products
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover the latest computer hardware and gaming peripherals
          </p>
        </div>
      </div>

      <ShopClient products={mockProducts} />
    </div>
  );
}
