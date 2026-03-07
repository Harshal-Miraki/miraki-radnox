"use client";

import Image from "next/image";
import Link from "next/link";
import HeroSection from "./components/HeroSection";
import { useCart } from "./contexts/CartContext";

export default function Home() {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: "MODBUS TO TCP",
      category: "Communication Gateways",
      price: 22999,
      image: "https://ik.imagekit.io/rdwxgbmgm/Miraki-Radnox/MODBUS_TO_TCP.jpg",
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Vibration Sensor",
      category: "Industrial Sensors",
      price: 32999,
      image: "https://ik.imagekit.io/rdwxgbmgm/Miraki-Radnox/Vibration%20Sensor.jpg",
      rating: 4.9,
      reviews: 89,
      badge: "New",
    },
    {
      id: 3,
      name: "Machine Run Time controller",
      category: "Machine Controllers",
      price: 19999,
      image: "https://ik.imagekit.io/rdwxgbmgm/Miraki-Radnox/Machine%20Run%20Time%20controller.jpg",
      rating: 4.7,
      reviews: 201,
      badge: "Sale",
    },
    {
      id: 4,
      name: "FCU",
      category: "Climate Control",
      price: 24999,
      image: "https://ik.imagekit.io/rdwxgbmgm/Miraki-Radnox/FCU.jpg",
      rating: 4.6,
      reviews: 156,
    },
  ];

  return (
    <main className="min-h-screen bg-white selection:bg-brand-teal/20 selection:text-brand-teal">
      <HeroSection />

      {/* Products Section */}
      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 md:mb-16 text-center">
            <p className="mb-4 text-xs font-medium tracking-[0.2em] text-brand-teal uppercase">
              Our Products
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 lg:text-5xl">
              Featured Solutions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-light text-zinc-500">
              Discover our range of precision-engineered products designed for optimal performance
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col rounded-4xl bg-white p-6 shadow-sm transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-zinc-200/60 border border-zinc-50"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative mb-8 h-72 w-full overflow-hidden rounded-4xl bg-zinc-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.badge && (
                      <span className="absolute left-4 top-4 rounded-full bg-zinc-900/90 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase">
                        {product.badge}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={(e) => e.preventDefault()}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-zinc-400 shadow-sm transition-all hover:text-red-500 hover:scale-110"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                    </button>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-brand-teal uppercase">
                      {product.category}
                    </p>
                    <div className="flex items-center gap-1">
                      <svg className="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-[10px] font-bold text-zinc-900">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="mb-6 text-xl font-semibold leading-tight text-zinc-900 group-hover:text-brand-teal transition-colors">
                    <Link href={`/products/${product.id}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </h3>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-100">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-zinc-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: product.category,
                      })}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 transition-all hover:bg-brand-teal hover:text-white"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y border-zinc-100 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                ),
                title: "Free Shipping",
                desc: "Complimentary delivery on orders over ₹40,000",
              },
              {
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "2 Year Warranty",
                desc: "Comprehensive coverage on all products",
              },
              {
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
                title: "Easy Returns",
                desc: "Hassle-free 30-day return policy",
              },
              {
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: "Expert Support",
                desc: "24/7 dedicated technical assistance",
              },
            ].map((feature, idx) => (
              <div key={idx} className="group flex items-start gap-4 rounded-2xl p-4 transition-all hover:bg-zinc-50">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal to-cyan-500 text-white shadow-lg shadow-brand-teal/30 transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="mb-1.5 font-semibold text-zinc-900">{feature.title}</h4>
                  <p className="text-sm font-light leading-relaxed text-zinc-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="bg-gradient-to-br from-zinc-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 md:mb-16 text-center">
            <p className="mb-4 text-xs font-medium tracking-[0.2em] text-brand-teal uppercase">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 lg:text-5xl">
              Loved by Industry Leaders
            </h2>
          </div>
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                name: "Michael Chen",
                role: "Operations Manager",
                company: "TechFlow Industries",
                content: "The HVAC control modules have transformed our building management. Excellent quality and support!",
                rating: 5,
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
              },
              {
                name: "Sarah Johnson",
                role: "Facility Director",
                company: "GreenSpace Corp",
                content: "Outstanding sensing solutions. The accuracy and reliability have exceeded our expectations.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
              },
              {
                name: "David Park",
                role: "Engineering Lead",
                company: "AutoMate Systems",
                content: "Fast shipping, great prices, and the products are top-notch. Highly recommend for any automation project.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-teal/5 transition-transform group-hover:scale-150"></div>
                <div className="relative">
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-6 text-base font-light leading-relaxed text-zinc-600">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full ring-2 ring-zinc-100"
                    />
                    <div>
                      <p className="font-semibold text-zinc-900">{testimonial.name}</p>
                      <p className="text-sm font-light text-zinc-500">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Newsletter Section */}
      {/* <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-teal to-cyan-600"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative container mx-auto px-6 text-center">
          <div className="mx-auto max-w-2xl">
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-sm">
              Limited Offer
            </span>
            <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              Get 10% Off Your First Order
            </h2>
            <p className="mb-10 text-base font-light text-white/80">
              Subscribe to our newsletter for exclusive deals, new product launches, and expert insights.
            </p>
            <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border-0 bg-white/10 px-6 py-4 text-sm font-light text-white placeholder-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-brand-teal shadow-lg shadow-black/20 transition-all hover:scale-105 hover:bg-zinc-50 active:scale-95"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-6 text-xs font-light text-white/60">
              🔒 No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section> */}

      {/* Footer CTA */}
      <section className="bg-zinc-900 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 md:p-12 text-center shadow-2xl lg:p-16">
            <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-brand-teal/10 blur-3xl"></div>
            <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"></div>
            <div className="relative">
              <h2 className="mb-4 text-2xl md:text-3xl font-bold text-white lg:text-4xl">
                Ready to Upgrade Your System?
              </h2>
              <p className="mb-8 md:mb-10 text-sm md:text-base font-light text-zinc-400">
                Browse our complete catalog of 500+ products and find the perfect solution for your needs.
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-teal to-cyan-500 px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-teal/30 transition-all hover:shadow-xl hover:shadow-brand-teal/40 active:scale-95"
              >
                Shop All Products
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
