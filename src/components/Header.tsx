import { MapPin, Phone } from "lucide-react";
import Link from "next/link";
import NavigationBar from "./header/navigation-bar";

export default function Header() {
  return (
    <header className="w-full bg-background sticky top-0 z-50 shadow-sm">
      {/* Top Info Bar */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-xs md:text-sm">
            {/* Left: Tagline */}
            <div className="hidden md:block font-medium">
              Think. Innovate. Succeed.
            </div>

            {/* Middle: Delivery Info */}
            <div className="flex-1 md:flex-none text-center font-medium">
              Free Delivery All Over Nepal
            </div>

            {/* Right: Contact Info */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="tel:061585498"
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              >
                <Phone size={14} />
                <span>061-585498</span>
              </Link>
              <Link
                href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4403.733258338522!2d83.98639519999999!3d28.217570600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595490aeb14c1%3A0x134c7867410d3012!2sPandey%20Computer%20Suppliers!5e1!3m2!1sen!2snp!4v1764773124355!5m2!1sen!2snp"
                target="_blank"
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              >
                <MapPin size={14} />
                <span>Store Location</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <NavigationBar />
    </header>
  );
}
