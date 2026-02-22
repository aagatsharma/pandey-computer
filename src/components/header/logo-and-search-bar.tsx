import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import CartIcon from "./cart-icon";
import WishlistIcon from "./wishlist-icon";
import SearchBar from "./search-bar";

interface LogoAndSearchBarProps {
  onMobileMenuOpen: () => void;
}

export default function LogoAndSearchBar({
  onMobileMenuOpen,
}: LogoAndSearchBarProps) {
  return (
    <div className="border-b bg-background sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
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
            <SearchBar />
          </div>

          {/* Right Side: Wishlist, Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/wishlist"
              className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <WishlistIcon />
              <span className="hidden lg:inline text-sm font-medium">
                My Wishlist
              </span>
            </Link>
            <Link
              href="/cart"
              className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <CartIcon />
              <span className="hidden lg:inline text-sm font-medium">
                Shopping Cart
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={onMobileMenuOpen}
              className="lg:hidden text-foreground hover:text-primary transition-all"
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
