"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, X, Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function NavigationBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Pandey Computer"
              width={150}
              height={50}
              className="h-8 md:h-10 lg:h-12 w-auto"
              priority
            />
          </Link>

          {/* Search Bar - Expanded */}
          {isSearchOpen && (
            <div className="flex-1 mx-4 md:mx-8 animate-in fade-in slide-in-from-right-5 duration-300">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2.5 pl-10 border border-input rounded-lg bg-background text-foreground text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          {!isSearchOpen && (
            <NavigationMenu className="hidden lg:flex animate-in fade-in slide-in-from-left-5 duration-300">
              <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="group inline-flex h-10 md:h-12 w-max items-center justify-center rounded-md bg-transparent px-3 md:px-5 py-2 text-sm md:text-base lg:text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-10 md:h-12 text-sm md:text-base lg:text-lg px-3 md:px-5">
                All Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/categories/laptops"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm md:text-base font-medium leading-none">
                          Laptops
                        </div>
                        <p className="line-clamp-2 text-xs md:text-sm leading-snug text-muted-foreground">
                          Gaming & business laptops
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/categories/desktops"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm md:text-base font-medium leading-none">
                          Desktops
                        </div>
                        <p className="line-clamp-2 text-xs md:text-sm leading-snug text-muted-foreground">
                          Gaming PCs & workstations
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/categories/components"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm md:text-base font-medium leading-none">
                          Components
                        </div>
                        <p className="line-clamp-2 text-xs md:text-sm leading-snug text-muted-foreground">
                          Processors, graphics cards & more
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/categories/peripherals"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm md:text-base font-medium leading-none">
                          Peripherals
                        </div>
                        <p className="line-clamp-2 text-xs md:text-sm leading-snug text-muted-foreground">
                          Keyboards, mice & monitors
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/categories/accessories"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm md:text-base font-medium leading-none">
                          Accessories
                        </div>
                        <p className="line-clamp-2 text-xs md:text-sm leading-snug text-muted-foreground">
                          Cables, adapters & more
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-10 md:h-12 text-sm md:text-base lg:text-lg px-3 md:px-5">
                Brands
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/brands/dell"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm md:text-base font-medium leading-none">
                          Dell
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/brands/hp"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm md:text-base font-medium leading-none">
                          HP
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/brands/lenovo"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm md:text-base font-medium leading-none">
                          Lenovo
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/brands/asus"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm md:text-base font-medium leading-none">
                          ASUS
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/shop"
                  className="group inline-flex h-10 md:h-12 w-max items-center justify-center rounded-md bg-transparent px-3 md:px-5 py-2 text-sm md:text-base lg:text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Shop
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/blogs"
                  className="group inline-flex h-10 md:h-12 w-max items-center justify-center rounded-md bg-transparent px-3 md:px-5 py-2 text-sm md:text-base lg:text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Blogs
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/about"
                  className="group inline-flex h-10 md:h-12 w-max items-center justify-center rounded-md bg-transparent px-3 md:px-5 py-2 text-sm md:text-base lg:text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  About Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/contact"
                  className="group inline-flex h-10 md:h-12 w-max items-center justify-center rounded-md bg-transparent px-3 md:px-5 py-2 text-sm md:text-base lg:text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Contact Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
          )}

        {/* Right Side: Search & Cart & Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Search - Hidden on mobile */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hidden lg:block text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
            aria-label={isSearchOpen ? "Close search" : "Open search"}
          >
            {isSearchOpen ? (
              <X className="h-5 w-5 md:h-6 md:w-6 animate-in spin-in-180 duration-300" />
            ) : (
              <Search className="h-5 w-5 md:h-6 md:w-6 animate-in spin-in-180 duration-300" />
            )}
          </button>
          
          {/* Cart */}
          <Link
            href="/cart"
            className="text-foreground hover:text-primary transition-colors"
          >
            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 animate-in spin-in-180 duration-300" />
            ) : (
              <Menu className="h-6 w-6 animate-in spin-in-180 duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-background animate-in slide-in-from-top-5 duration-300">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="block py-3 px-4 rounded-md hover:bg-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="block py-3 px-4 rounded-md hover:bg-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className="block py-3 px-4 rounded-md hover:bg-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="block py-3 px-4 rounded-md hover:bg-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-3 px-4 rounded-md hover:bg-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block py-3 px-4 rounded-md hover:bg-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
      </div>
    </div>
  );
}
