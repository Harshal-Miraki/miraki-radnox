"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const PRODUCT_IMAGE = "https://ik.imagekit.io/rdwxgbmgm/Miraki-Radnox/image.png";

const slides = [
  {
    image: PRODUCT_IMAGE,
    title: "HVAC Control Modules",
    description: "Precision engineering for climate control",
  },
  {
    image: PRODUCT_IMAGE,
    title: "Smart Sensors",
    description: "Advanced sensing technology",
  },
  {
    image: PRODUCT_IMAGE,
    title: "Industrial Automation",
    description: "Next-gen automation solutions",
  },
  {
    image: PRODUCT_IMAGE,
    title: "Air Quality Monitoring",
    description: "Real-time environmental tracking",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-3xl shadow-2xl lg:h-[500px]">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative min-h-full w-full flex-shrink-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Slide Content */}
            <div className="absolute bottom-6 left-6 right-6 text-white lg:bottom-10 lg:left-10">
              <p className="text-sm font-light text-brand-teal lg:text-base">
                {slide.description}
              </p>
              <h3 className="mt-1 text-xl font-semibold lg:text-2xl">
                {slide.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-zinc-700 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white lg:left-6"
        aria-label="Previous slide"
      >
        <svg className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-zinc-700 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white lg:right-6"
        aria-label="Next slide"
      >
        <svg className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 lg:bottom-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-brand-teal"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/20">
        <div
          className="h-full bg-brand-teal transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
