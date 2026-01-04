"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Menu, X } from "lucide-react";

interface MenuItem {
  label: string;
  slug: string;
}

interface MenuCategory {
  label: string;
  slug: string;
  items: MenuItem[];
}

interface MenuData {
  label: string;
  slug: string;
  children: MenuCategory[];
}

const menuData: MenuData[] = [
  {
    label: "Laptops By Brands",
    slug: "laptops",
    children: [
      {
        label: "Dell",
        slug: "dell",
        items: [
          { label: "Inspiron Series", slug: "inspiron-series" },
          { label: "Vostro Series", slug: "vostro-series" },
          { label: "Gaming Series", slug: "gaming-series" },
          { label: "XPS Series", slug: "xps-series" },
        ],
      },
      {
        label: "Asus",
        slug: "asus",
        items: [
          { label: "Zenbook Series", slug: "zenbook-series" },
          { label: "ROG Series", slug: "rog-series" },
          { label: "TUF Series", slug: "tuf-series" },
          { label: "VivoBook Series", slug: "vivobook-series" },
        ],
      },
      {
        label: "HP",
        slug: "hp",
        items: [
          { label: "Pavilion Series", slug: "pavilion-series" },
          { label: "Envy Series", slug: "envy-series" },
          { label: "Omen Series", slug: "omen-series" },
          { label: "Elite Series", slug: "elite-series" },
        ],
      },
      {
        label: "Lenovo",
        slug: "lenovo",
        items: [
          { label: "ThinkPad Series", slug: "thinkpad-series" },
          { label: "IdeaPad Series", slug: "ideapad-series" },
          { label: "Legion Series", slug: "legion-series" },
          { label: "Yoga Series", slug: "yoga-series" },
        ],
      },
      {
        label: "Acer",
        slug: "acer",
        items: [
          { label: "Aspire Series", slug: "aspire-series" },
          { label: "Predator Series", slug: "predator-series" },
          { label: "Swift Series", slug: "swift-series" },
          { label: "Nitro Series", slug: "nitro-series" },
        ],
      },
    ],
  },

  {
    label: "Accessories",
    slug: "accessories",
    children: [
      {
        label: "Computer Accessories",
        slug: "computer-accessories",
        items: [
          { label: "Mouse Pad", slug: "mouse-pad" },
          { label: "Combo Set", slug: "combo-set" },
          { label: "Webcam", slug: "webcam" },
          { label: "Headset", slug: "headset" },
          { label: "USB Dongles", slug: "usb-dongles" },
          { label: "Card Readers", slug: "card-readers" },
          { label: "Keyboard", slug: "keyboard" },
          { label: "Mouse", slug: "mouse" },
        ],
      },
      {
        label: "Storage Device",
        slug: "storage-device",
        items: [
          { label: "HDD", slug: "hdd" },
          { label: "External SSD", slug: "external-ssd" },
          { label: "Laptop RAM", slug: "laptop-ram" },
          { label: "External HDD", slug: "external-hdd" },
          { label: "Jet Flash Drive", slug: "jet-flash-drive" },
          { label: "Pen Drive", slug: "pen-drive" },
          { label: "Memory Card", slug: "memory-card" },
          { label: "SSD", slug: "ssd" },
        ],
      },
      {
        label: "Audio Devices",
        slug: "audio-devices",
        items: [
          { label: "Earbuds", slug: "earbuds" },
          { label: "Earphones", slug: "earphones" },
          { label: "Woofers", slug: "woofers" },
          { label: "Microphones", slug: "microphones" },
          { label: "Sound Bar", slug: "sound-bar" },
          { label: "Home Theatre", slug: "home-theatre" },
          { label: "Headphones", slug: "headphones" },
          { label: "Speakers", slug: "speakers" },
        ],
      },
      {
        label: "Laptop Accessories",
        slug: "laptop-accessories",
        items: [
          { label: "Laptop Charger", slug: "laptop-charger" },
          { label: "Laptop Battery", slug: "laptop-battery" },
          { label: "Laptop Screen", slug: "laptop-screen" },
          { label: "Laptop Keyboard", slug: "laptop-keyboard" },
          { label: "Laptop Stand", slug: "laptop-stand" },
          { label: "Laptop Cooler", slug: "laptop-cooler" },
        ],
      },
      {
        label: "Cables & Connectors",
        slug: "cables-connectors",
        items: [
          { label: "HDMI Adapters", slug: "hdmi-adapters" },
          { label: "USB Adapters", slug: "usb-adapters" },
          { label: "LAN Adapters", slug: "lan-adapters" },
          { label: "Cables", slug: "cables" },
          { label: "Enclosure", slug: "enclosure" },
          { label: "Adapter", slug: "adapter" },
          { label: "Converters", slug: "converters" },
          { label: "Hubs & Dock", slug: "hubs-dock" },
        ],
      },
      {
        label: "Cleaning & Repair",
        slug: "cleaning-repair",
        items: [
          { label: "Thermal Paste", slug: "thermal-paste" },
          { label: "Cleaning Brushes", slug: "cleaning-brushes" },
          { label: "Screw Driver Tool Set", slug: "screw-driver-tool-set" },
          { label: "Cleaning Wipes", slug: "cleaning-wipes" },
          { label: "Cleaning Solution", slug: "cleaning-solution" },
          { label: "Toolkit", slug: "toolkit" },
          { label: "Air Blower", slug: "air-blower" },
        ],
      },
      {
        label: "Safety & Protection",
        slug: "safety-protection",
        items: [
          { label: "Screen Protectors", slug: "screen-protectors" },
          { label: "Skins", slug: "skins" },
          { label: "Laptop Keyboard", slug: "laptop-keyboard" },
          { label: "Tempered Glass", slug: "tempered-glass" },
          { label: "Mobile Cases", slug: "mobile-cases" },
        ],
      },
      {
        label: "Software/Games",
        slug: "software-games",
        items: [
          { label: "Operating System", slug: "operating-system" },
          { label: "MS Office", slug: "ms-office" },
          { label: "Adobe", slug: "adobe" },
          { label: "Antivirus", slug: "antivirus" },
          { label: "Autodesk", slug: "autodesk" },
          { label: "Games", slug: "games" },
        ],
      },
    ],
  },

  {
    label: "Office Components",
    slug: "office-components",
    children: [
      {
        label: "PC Components",
        slug: "pc-components",
        items: [
          { label: "CPU / Processor", slug: "cpu-processor" },
          { label: "Motherboards", slug: "motherboards" },
          { label: "RAM", slug: "ram" },
          { label: "Graphics Card", slug: "graphics-card" },
          { label: "Power Supply", slug: "power-supply" },
          { label: "Cabinet", slug: "cabinet" },
        ],
      },
      {
        label: "Monitors",
        slug: "monitors",
        items: [
          { label: "LED Monitor", slug: "led-monitor" },
          { label: "Gaming Monitor", slug: "gaming-monitor" },
          { label: "Professional Monitor", slug: "professional-monitor" },
          { label: "Curved Monitor", slug: "curved-monitor" },
        ],
      },
      {
        label: "Printers & Scanners",
        slug: "printers-scanners",
        items: [
          { label: "Inkjet Printer", slug: "inkjet-printer" },
          { label: "Laser Printer", slug: "laser-printer" },
          { label: "Scanner", slug: "scanner" },
          { label: "Multifunction Printer", slug: "multifunction-printer" },
        ],
      },
      {
        label: "Networking",
        slug: "networking",
        items: [
          { label: "Router", slug: "router" },
          { label: "Switch", slug: "switch" },
          { label: "Access Point", slug: "access-point" },
          { label: "Network Cable", slug: "network-cable" },
        ],
      },
    ],
  },

  {
    label: "Gaming",
    slug: "gaming",
    children: [
      {
        label: "Gaming Laptops",
        slug: "gaming-laptops",
        items: [
          { label: "ROG Series", slug: "rog-series" },
          { label: "Predator Series", slug: "predator-series" },
          { label: "Legion Series", slug: "legion-series" },
          { label: "Omen Series", slug: "omen-series" },
        ],
      },
      {
        label: "Gaming Accessories",
        slug: "gaming-accessories",
        items: [
          { label: "Gaming Mouse", slug: "gaming-mouse" },
          { label: "Gaming Keyboard", slug: "gaming-keyboard" },
          { label: "Gaming Headset", slug: "gaming-headset" },
          { label: "Gaming Chair", slug: "gaming-chair" },
        ],
      },
      {
        label: "Gaming Components",
        slug: "gaming-components",
        items: [
          { label: "Graphics Card", slug: "graphics-card" },
          { label: "Gaming Monitor", slug: "gaming-monitor" },
          { label: "RGB Fans", slug: "rgb-fans" },
          { label: "Liquid Cooling", slug: "liquid-cooling" },
        ],
      },
    ],
  },

  {
    label: "Desktop & Server",
    slug: "desktop-server",
    children: [
      {
        label: "PC & Server",
        slug: "pc-server",
        items: [
          { label: "Branded Desktop", slug: "branded-desktop" },
          { label: "All in One PC", slug: "all-in-one-pc" },
          { label: "Workstation", slug: "workstation" },
          { label: "Server", slug: "server" },
        ],
      },
      {
        label: "Components",
        slug: "components",
        items: [
          { label: "CPU / Processor", slug: "cpu-processor" },
          { label: "Motherboards", slug: "motherboards" },
          { label: "RAM", slug: "ram" },
          { label: "Storage", slug: "storage" },
        ],
      },
    ],
  },

  {
    label: "Gadgets",
    slug: "gadgets",
    children: [
      {
        label: "Smart Devices",
        slug: "smart-devices",
        items: [
          { label: "Smart Watch", slug: "smart-watch" },
          { label: "Fitness Band", slug: "fitness-band" },
          { label: "Smart Speaker", slug: "smart-speaker" },
          { label: "Smart Home", slug: "smart-home" },
        ],
      },
      {
        label: "Mobile Accessories",
        slug: "mobile-accessories",
        items: [
          { label: "Power Bank", slug: "power-bank" },
          { label: "Mobile Charger", slug: "mobile-charger" },
          { label: "Mobile Case", slug: "mobile-case" },
          { label: "Screen Guard", slug: "screen-guard" },
        ],
      },
    ],
  },

  {
    label: "Home Appliance",
    slug: "home-appliance",
    children: [
      {
        label: "Kitchen Appliances",
        slug: "kitchen-appliances",
        items: [
          { label: "Microwave", slug: "microwave" },
          { label: "Refrigerator", slug: "refrigerator" },
          { label: "Dishwasher", slug: "dishwasher" },
          { label: "Coffee Maker", slug: "coffee-maker" },
        ],
      },
      {
        label: "Cleaning Appliances",
        slug: "cleaning-appliances",
        items: [
          { label: "Vacuum Cleaner", slug: "vacuum-cleaner" },
          { label: "Air Purifier", slug: "air-purifier" },
          { label: "Washing Machine", slug: "washing-machine" },
        ],
      },
    ],
  },
];

export default function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Section 1: Logo, Search, Cart */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Pandey Computer"
                width={150}
                height={50}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2.5 pl-10 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {/* Right Side: Cart & Mobile Menu */}
            <div className="flex items-center gap-4">
              <Link
                href="/cart"
                className="text-foreground hover:text-primary transition-colors"
              >
                <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-foreground hover:text-primary transition-all"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Navigation Menu */}
      <nav className="bg-primary text-white hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex items-center h-12 gap-1">
            {menuData.map((menu) => (
              <div key={menu.label} className="group">
                {/* Top Level */}
                <Link
                  href={`/category/${menu.slug}`}
                  className="flex items-center h-12 px-3 hover:bg-primary/80 text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {menu.label}
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {/* Mega Menu Dropdown - Positioned relative to nav container */}
                <div
                  className="absolute left-0 right-0 top-12
                              bg-white text-gray-800 shadow-2xl border-t-2 border-red-600
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-all duration-200 z-50"
                >
                  <div className="p-6">
                    <div
                      className="grid gap-4 text-sm w-full"
                      style={{
                        gridTemplateColumns: `repeat(${Math.min(
                          menu.children.length,
                          5
                        )}, 1fr)`,
                      }}
                    >
                      {menu.children.map((section) => (
                        <div key={section.label} className="min-w-0">
                          {/* Category/Brand Header */}
                          <Link
                            href={`/category/${menu.slug}/${section.slug}`}
                            className="block"
                          >
                            <h4 className="text-red-600 font-semibold hover:text-red-700 transition-colors pb-2 text-base">
                              {section.label}
                            </h4>
                          </Link>

                          {/* Subcategory Items */}
                          <ul className="space-y-2">
                            {section.items.map((item) => (
                              <li key={item.slug}>
                                <Link
                                  href={`/category/${menu.slug}/${section.slug}/${item.slug}`}
                                  className="block text-gray-700 hover:text-red-600 hover:translate-x-1 transition-all duration-150 w-fit"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b bg-background animate-in slide-in-from-top-5 duration-300">
          <nav className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <div className="mb-4 md:hidden">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2.5 pl-10 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className={`block py-3 px-4 rounded-md transition-colors ${
                    pathname === "/"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>

              {/* Dynamic Mega Menu Categories */}
              {menuData.map((menu) => (
                <li key={menu.slug}>
                  <Link
                    href={`/category/${menu.slug}`}
                    className={`block py-3 px-4 rounded-md transition-colors ${
                      pathname.startsWith(`/category/${menu.slug}`)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="/about"
                  className={`block py-3 px-4 rounded-md transition-colors ${
                    pathname === "/about"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`block py-3 px-4 rounded-md transition-colors ${
                    pathname === "/contact"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
