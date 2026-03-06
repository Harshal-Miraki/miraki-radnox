"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    totalItems,
    totalPrice,
    removeFromCart,
    updateQuantity,
    closeCart,
    clearCart,
  } = useCart();

  const shipping = totalPrice > 40000 ? 0 : 2000;
  const tax = totalPrice * 0.18; // Updated to 18% GST typical for India
  const grandTotal = totalPrice + shipping + tax;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-100 p-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">Shopping Cart</h2>
              <p className="text-sm font-light text-zinc-500">{totalItems} items</p>
            </div>
            <button
              onClick={closeCart}
              className="rounded-full p-2 text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-6 rounded-full bg-zinc-100 p-8">
                  <svg className="h-16 w-16 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-zinc-900">Your cart is empty</h3>
                <p className="mb-6 text-sm font-light text-zinc-500">Looks like you haven&apos;t added anything yet.</p>
                <button
                  onClick={closeCart}
                  className="rounded-full bg-brand-teal px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-teal-dark"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group flex gap-4 rounded-2xl border border-zinc-100 bg-zinc-50 p-4 transition-all hover:border-brand-teal/30 hover:shadow-md"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-xs font-medium text-brand-teal">
                          {item.category}
                        </p>
                        <h4 className="font-semibold text-zinc-900">{item.name}</h4>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-lg font-bold text-zinc-900">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm font-light text-zinc-400 line-through">
                              ₹{item.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full bg-white p-1 shadow-sm">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-zinc-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="rounded-full p-2 text-zinc-400 transition-all hover:bg-red-50 hover:text-red-500"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-zinc-100 bg-zinc-50 p-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-light text-zinc-500">Subtotal</span>
                  <span className="font-semibold text-zinc-900">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-zinc-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-zinc-900">Total</span>
                    <span className="text-xl font-bold text-zinc-900">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full rounded-full bg-brand-teal py-4 text-center text-sm font-semibold text-white shadow-lg shadow-brand-teal/30 transition-all hover:bg-brand-teal-dark hover:shadow-xl hover:shadow-brand-teal/40 active:scale-95"
                >
                  PROCEED
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full rounded-full border border-zinc-200 py-4 text-center text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900"
                >
                  CLEAR CART
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
