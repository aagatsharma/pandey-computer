"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-zinc-900 to-black text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-zinc-800/[0.04] bg-size-[20px_20px]" />
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent" />

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
                  href="#"
                  className="group bg-zinc-800 hover:bg-blue-600 p-2.5 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-600/50"
                  aria-label="Facebook"
                >
                  <Facebook
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Link>
                <Link
                  href="#"
                  className="group bg-zinc-800 hover:bg-linear-to-br hover:from-purple-600 hover:to-pink-600 p-2.5 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-600/50"
                  aria-label="Instagram"
                >
                  <Instagram
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
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
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
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-linear-to-r from-green-500 to-cyan-500 rounded-full" />
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
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-linear-to-r from-orange-500 to-red-500 rounded-full" />
            </h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 group">
                <MapPin
                  size={20}
                  className="text-blue-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                />
                <div>
                  <p className="text-sm text-zinc-400">
                    Putalisadak, Kathmandu
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <Mail
                  size={20}
                  className="text-green-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                />
                <div>
                  <a
                    href="mailto:info@pandeycomputer.com"
                    className="text-sm text-zinc-400 hover:text-blue-400 transition-colors break-all"
                  >
                    info@pandeycomputer.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <Phone
                  size={20}
                  className="text-orange-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                />
                <div>
                  <a
                    href="tel:+97715350040"
                    className="text-sm text-zinc-400 hover:text-blue-400 transition-colors block"
                  >
                    01-5350040
                  </a>
                  <a
                    href="tel:+97715911594"
                    className="text-sm text-zinc-400 hover:text-blue-400 transition-colors block"
                  >
                    01-5911594
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-48 bg-zinc-800 rounded-xl overflow-hidden shadow-lg ring-1 ring-zinc-700/50 hover:ring-zinc-600 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2345!2d85.3131!3d27.7045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQyJzE2LjIiTiA4NcKwMTgnNDcuMiJF!5e0!3m2!1sen!2snp!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pandey Computer Location"
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
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-linear-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
