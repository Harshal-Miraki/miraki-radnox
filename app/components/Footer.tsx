"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-zinc-800">
        <div className="container mx-auto px-6 py-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-2 text-2xl font-semibold">Subscribe to Our Newsletter</h3>
              <p className="font-light text-zinc-400">
                Get exclusive deals, new product updates, and expert insights delivered to your inbox.
              </p>
            </div>
            <div className="lg:flex lg:justify-end">
              <form className="flex w-full max-w-md flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full border border-zinc-700 bg-zinc-800 px-6 py-4 text-sm font-light text-white placeholder-zinc-500 focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
                />
                <button
                  type="submit"
                  className="rounded-full bg-brand-teal px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-brand-teal-dark active:scale-95"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="mb-6 inline-flex items-center space-x-2">
                <span className="text-3xl font-bold tracking-tighter text-white">
                  Miraki Radnox
                </span>
                <span className="h-2 w-2 rounded-full bg-brand-teal"></span>
              </Link>
              <p className="mb-6 max-w-sm text-sm font-light leading-relaxed text-zinc-400">
                Your trusted partner for advanced sensing solutions, HVAC interfaces, and intelligent
                automation systems. Delivering precision and reliability since 2026.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm font-light text-zinc-400">
                  <svg className="h-5 w-5 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Innovation Drive, Tech City, TC 12345</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-light text-zinc-400">
                  <svg className="h-5 w-5 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@radnox.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-light text-zinc-400">
                  <svg className="h-5 w-5 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <p className="mb-4 text-xs font-medium tracking-wider text-zinc-500 uppercase">Follow Us</p>
                <div className="flex gap-3">
                  {["facebook", "twitter", "instagram", "linkedin", "youtube"].map((social) => (
                    <a
                      key={social}
                      href={`https://${social}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-all hover:bg-brand-teal hover:text-white"
                    >
                      {social === "facebook" && (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                      )}
                      {social === "twitter" && (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                      )}
                      {social === "instagram" && (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                      )}
                      {social === "linkedin" && (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                      )}
                      {social === "youtube" && (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-6 text-sm font-semibold tracking-wider text-white uppercase">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "Products", href: "/products" },
                  { name: "Categories", href: "/categories" },
                  { name: "About Us", href: "/about" },
                  { name: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-zinc-400 transition-colors hover:text-brand-teal"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Categories */}
            <div>
              <h4 className="mb-6 text-sm font-semibold tracking-wider text-white uppercase">Categories</h4>
              <ul className="space-y-3">
                {[
                  { name: "HVAC Interfaces", href: "/categories/hvac" },
                  { name: "Sensing Solutions", href: "/categories/sensing" },
                  { name: "Machine Controllers", href: "/categories/controllers" },
                  { name: "Smart Automation", href: "/categories/automation" },
                  { name: "New Arrivals", href: "/products/new" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-zinc-400 transition-colors hover:text-brand-teal"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="mb-6 text-sm font-semibold tracking-wider text-white uppercase">Customer Service</h4>
              <ul className="space-y-3">
                {[
                  { name: "Help Center", href: "/help" },
                  { name: "Track Order", href: "/track-order" },
                  { name: "Shipping Info", href: "/shipping" },
                  { name: "Returns", href: "/returns" },
                  { name: "Warranty", href: "/warranty" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-zinc-400 transition-colors hover:text-brand-teal"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Copyright */}
            <p className="text-sm font-light text-zinc-500">
              © {currentYear} Miraki Radnox. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-xs font-medium text-zinc-500 uppercase">We Accept</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["visa", "mastercard", "amex", "paypal", "apple-pay"].map((payment) => (
                  <div
                    key={payment}
                    className="flex h-8 w-12 items-center justify-center rounded bg-zinc-800 text-xs font-medium text-zinc-400"
                  >
                    {payment === "visa" && "VISA"}
                    {payment === "mastercard" && "MC"}
                    {payment === "amex" && "AMEX"}
                    {payment === "paypal" && "PP"}
                    {payment === "apple-pay" && ""}
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm font-light text-zinc-500 transition-colors hover:text-brand-teal">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm font-light text-zinc-500 transition-colors hover:text-brand-teal">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
