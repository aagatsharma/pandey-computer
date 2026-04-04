import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function TopInfoBar() {
  return (
    <div className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-2 p-2 text-[11px] md:text-sm">
          <div className="flex shrink-0 items-center gap-2 md:gap-4">
            <Link
              href="tel:061-585498"
              className="flex items-center gap-1 whitespace-nowrap transition-opacity hover:opacity-80"
            >
              <Phone size={14} />
              <span>061-585498</span>
            </Link>
            <span
              className="hidden h-4 w-px bg-foreground/35 md:block"
              aria-hidden="true"
            />
            <Link
              href="mailto:info@pandeycomputers.com.np"
              className="hidden items-center gap-1.5 hover:opacity-80 transition-opacity md:flex"
            >
              <Mail size={14} />
              <span>info@pandeycomputers.com.np</span>
            </Link>
          </div>

          <div className="flex min-w-0 items-center justify-end gap-1.5 md:gap-3">
            <Link
              href="https://maps.app.goo.gl/QVgnB6DGFTp8SfQB8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 items-center gap-1 whitespace-nowrap transition-opacity hover:opacity-80"
            >
              <MapPin size={14} />
              <span className="truncate">Newroad , Pokhara</span>
            </Link>
            <span
              className="hidden h-4 w-px bg-foreground/35 md:block"
              aria-hidden="true"
            />
            <Link
              href="https://www.facebook.com/profile.php?id=61567056315599"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border hover:opacity-80 transition-opacity"
            >
              <FaFacebookF size={12} className="text-primary" />
            </Link>
            <Link
              href="https://www.instagram.com/pandey.computer/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border hover:opacity-80 transition-opacity"
            >
              <FaInstagram size={12} className="text-primary" />
            </Link>
            <Link
              href="https://api.whatsapp.com/send?phone=9779802803711"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border hover:opacity-80 transition-opacity"
            >
              <FaWhatsapp size={12} className="text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
