"use client";

import Link from "next/link";
import { MapPin, Mail, Phone, ChevronRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-zinc-800/[0.04] bg-size-[20px_20px]" />
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold mb-3 bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Pandey Computer
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Your trusted partner for the latest computer products and
                technology solutions.
              </p>
            </div>
            <div>
              <h5 className="text-sm font-semibold mb-3 text-zinc-300">
                Follow Us
              </h5>
              <div className="flex gap-3">
                <Link
                  href="https://www.facebook.com/profile.php?id=61567056315599"
                  className="group bg-zinc-800 hover:bg-primary p-2.5 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/50"
                  aria-label="Facebook"
                  target="_blank"
                >
                  <FaFacebook
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Link>
                <Link
                  href="https://www.instagram.com/pandey.computer/"
                  target="_blank"
                  className="group bg-zinc-800 hover:bg-primary p-2.5 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/50"
                  aria-label="Instagram"
                >
                  <FaInstagram
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Link>
                <Link
                  href="https://api.whatsapp.com/send?phone=9779802803711"
                  target="_blank"
                  className="group bg-zinc-800 hover:bg-primary p-2.5 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/50"
                  aria-label="Instagram"
                >
                  <FaWhatsapp
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary rounded-full" />
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/cart", label: "Cart" },
                { href: "/checkout", label: "Checkout" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-zinc-400 hover:text-white transition-all duration-300 flex items-center gap-2"
                  >
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative inline-block">
              Categories
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary rounded-full" />
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/category/laptops", label: "Laptops" },
                { href: "/category/desktops", label: "Desktops" },
                { href: "/category/accessories", label: "Accessories" },
                { href: "/category/components", label: "Components" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-zinc-400 hover:text-white transition-all duration-300 flex items-center gap-2"
                  >
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Map */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary rounded-full" />
            </h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 group">
                <MapPin
                  size={20}
                  className="text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                />
                <div>
                  <p className="text-sm text-zinc-400">Newroad , Pokhara</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <Mail
                  size={20}
                  className="text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                />
                <div>
                  <a
                    href="mailto:pandeycomputer7@gmail.com"
                    className="text-sm text-zinc-400 hover:text-primary transition-colors break-all"
                  >
                    pandeycomputer7@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <Phone
                  size={20}
                  className="text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                />
                <div>
                  <a
                    href="tel:+977585498"
                    className="text-sm text-zinc-400 hover:text-primary transition-colors block"
                  >
                    01-585498
                  </a>
                  <a
                    href="tel:+9779856035498"
                    className="text-sm text-zinc-400 hover:text-primary transition-colors block"
                  >
                    9856035498
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-48 bg-zinc-800 rounded-xl overflow-hidden shadow-lg ring-1 ring-zinc-700/50 hover:ring-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4403.733258338522!2d83.98639519999999!3d28.217570600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595490aeb14c1%3A0x134c7867410d3012!2sPandey%20Computer%20Suppliers!5e1!3m2!1sen!2snp!4v1764773124355!5m2!1sen!2snp"
                width="600"
                height="450"
                // style="border:0;"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800/50 relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
            <p className="text-zinc-400">
              © {new Date().getFullYear()}{" "}
              <span className="text-white font-semibold">Pandey Computer</span>.
              All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {[
                { href: "/terms", label: "Terms & Conditions" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/return-exchange", label: "Return & Exchange" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-zinc-400 hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
