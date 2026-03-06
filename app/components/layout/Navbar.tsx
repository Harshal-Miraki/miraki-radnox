"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { totalItems, toggleCart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className="fixed top-0 z-40 w-full bg-white/95 py-4 shadow-lg backdrop-blur-md transition-all duration-300"
        >
            <div className="container mx-auto flex items-center justify-between px-6">
                <Link href="/" className="transition-transform hover:scale-105 active:scale-95">
                    <Image
                        src="/logo1.png"
                        alt="Miraki Radnox Logo"
                        width={180}
                        height={40}
                        className="h-10 w-auto object-contain"
                        priority
                    />
                </Link>

                <div className="hidden space-x-8 text-sm font-medium tracking-wide md:flex">
                    {/* <Link href="/" className="transition-colors hover:text-brand-teal">
                        HOME
                    </Link> */}
                    {/* <Link href="/products" className="transition-colors hover:text-brand-teal">
                        PRODUCTS
                    </Link>
                    <Link href="/categories" className="transition-colors hover:text-brand-teal">
                        CATEGORIES
                    </Link> */}
                    {/* <Link href="/about" className="transition-colors hover:text-brand-teal">
                        ABOUT
                    </Link>
                    <Link href="/contact" className="transition-colors hover:text-brand-teal">
                        CONTACT
                    </Link> */}
                </div>

                <div className="flex items-center space-x-3">
                    {/* <button className="rounded-full p-2 text-zinc-700 transition-all hover:bg-zinc-100">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button> */}
                    <button
                        onClick={toggleCart}
                        className="relative rounded-full bg-zinc-100 p-2 text-zinc-700 transition-all hover:bg-brand-teal hover:text-white"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {totalItems > 0 && (
                            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-teal text-[10px] font-bold text-white shadow-md">
                                {totalItems > 99 ? "99+" : totalItems}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
