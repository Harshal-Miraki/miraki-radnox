"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const PRODUCT_IMAGE = "https://ik.imagekit.io/rdwxgbmgm/Miraki-Radnox/image.png";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2400",
    badge: "New Arrival",
    badgeColor: "from-blue-600 to-blue-400",
    title: "Vibration Sensor",
    subtitle: "High-precision industrial monitoring for predictive maintenance",
    price: "₹32,999",
    originalPrice: "₹35,999",
    cta: "Shop Now",
    link: "/products/2",
  },
  {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2400",
    badge: "Best Seller",
    badgeColor: "from-orange-600 to-orange-400",
    title: "MODBUS TO TCP",
    subtitle: "Industrial-grade communication gateway with real-time data",
    price: "₹22,999",
    originalPrice: "₹28,999",
    cta: "Explore",
    link: "/products/1",
  },
  {
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=2400",
    badge: "Limited Offer",
    badgeColor: "from-red-600 to-red-400",
    title: "Machine Run Time Controller",
    subtitle: "Optimize production efficiency with precise machine monitoring and control",
    price: "₹19,999",
    originalPrice: "₹21,999",
    cta: "Learn More",
    link: "/products/3",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  return (
    <section className="relative">
      {/* Announcement Bar */}
      <div className="bg-zinc-900 py-2.5 text-center">
        <p className="text-xs font-medium text-white">
          🎉 FREE SHIPPING on orders over ₹40,000 &nbsp;•&nbsp; 2-Year Warranty on All Products &nbsp;•&nbsp; 24/7 Expert Support
        </p>
      </div>

      {/* Full-Width Hero Slider */}
      <div className="relative h-[500px] w-full overflow-hidden lg:h-[600px]">
        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroSlides.map((slide, index) => (
            <div key={index} className="relative min-w-full h-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6">
                  <div className="max-w-2xl text-white">
                    {/* Badge */}
                    <div className={`mb-4 inline-flex items-center rounded-full bg-gradient-to-r ${slide.badgeColor} px-4 py-2 text-xs font-semibold tracking-wide text-white uppercase shadow-lg`}>
                      <span className="mr-2 flex h-2 w-2">
                        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                      </span>
                      {slide.badge}
                    </div>

                    {/* Title */}
                    <h1 className="mb-4 text-3xl font-semibold leading-tight md:text-4xl lg:text-6xl">
                      {slide.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="mb-6 text-sm font-light leading-relaxed text-white/90 md:text-base lg:text-lg">
                      {slide.subtitle}
                    </p>

                    {/* Price */}
                    <div className="mb-8 flex items-center gap-3 md:gap-4 flex-wrap">
                      <span className="text-3xl md:text-4xl font-bold text-white">{slide.price}</span>
                      <span className="text-lg md:text-xl font-light text-white/60 line-through">{slide.originalPrice}</span>
                      <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                        Save ₹{(parseInt(slide.originalPrice.replace(/[₹,]/g, '')) - parseInt(slide.price.replace(/[₹,]/g, ''))).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                      <Link
                        href={slide.link}
                        className="group inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-white px-6 py-3 md:px-8 md:py-4 text-sm font-semibold text-zinc-900 shadow-lg transition-all hover:bg-brand-teal hover:text-white hover:shadow-xl active:scale-95"
                      >
                        {slide.cta}
                        <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                      <Link
                        href="#"
                        className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border-2 border-white/50 bg-white/10 px-6 py-3 md:px-8 md:py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
                      >
                        View All Products
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 md:p-3 text-zinc-700 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
          aria-label="Previous slide"
        >
          <svg className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 md:p-3 text-zinc-700 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
          aria-label="Next slide"
        >
          <svg className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide
                ? "w-12 bg-white"
                : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20">
          <div
            className="h-full bg-brand-teal transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / heroSlides.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="border-b border-zinc-100 bg-white py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/10">
                <svg className="h-6 w-6 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">Free Shipping</p>
                <p className="text-xs font-light text-zinc-500">Orders ₹40,000+</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/10">
                <svg className="h-6 w-6 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">2 Year Warranty</p>
                <p className="text-xs font-light text-zinc-500">Full coverage</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/10">
                <svg className="h-6 w-6 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">Easy Returns</p>
                <p className="text-xs font-light text-zinc-500">30-day policy</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/10">
                <svg className="h-6 w-6 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">24/7 Support</p>
                <p className="text-xs font-light text-zinc-500">Expert help</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}

    </section>
  );
}
