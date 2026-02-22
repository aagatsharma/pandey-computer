import Link from "next/link";
import { Phone, MapPin } from "lucide-react";

export default function TopInfoBar() {
  return (
    <div className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between text-xs md:text-sm p-2">
          {/* Left: Tagline */}
          <div className="hidden md:block font-medium shrink-0">
            Think. Innovate. Succeed.
          </div>

          {/* Right: Contact Info */}
          <div className="flex items-center gap-4 max-lg:w-full justify-center">
            <Link
              href="tel:061-585498"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Phone size={14} />
              <span>061-585498</span>
            </Link>
            <Link
              href="https://maps.app.goo.gl/QVgnB6DGFTp8SfQB8"
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
  );
}
