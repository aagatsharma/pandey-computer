import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function TopInfoBar() {
  return (
    <div className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-2 p-2 text-xs md:flex-row md:items-center md:justify-between md:text-sm">
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <Link
              href="tel:061585498"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Phone size={14} />
              <span>061585498</span>
            </Link>
            <span className="h-4 w-px bg-foreground/35" aria-hidden="true" />
            <Link
              href="mailto:pandeycomputer7@gmail.com"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Mail size={14} />
              <span>pandeycomputer7@gmail.com</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-3 md:justify-end">
            <Link
              href="https://maps.app.goo.gl/QVgnB6DGFTp8SfQB8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <MapPin size={14} />
              <span>Newroad , Pokhara</span>
            </Link>
            <span className="h-4 w-px bg-foreground/35" aria-hidden="true" />
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
