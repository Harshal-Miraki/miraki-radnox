"use client";

import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const [shipping, setShipping] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});

  useEffect(() => {
    if (items.length === 0) {
      router.push("/");
    }
  }, [items.length, router]);

  const validateShipping = () => {
    const newErrors: Partial<ShippingInfo> = {};
    if (!shipping.firstName.trim()) newErrors.firstName = "First name is required";
    if (!shipping.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!shipping.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(shipping.email)) newErrors.email = "Invalid email format";
    if (!shipping.phone.trim()) newErrors.phone = "Phone is required";
    if (!shipping.address.trim()) newErrors.address = "Address is required";
    if (!shipping.city.trim()) newErrors.city = "City is required";
    if (!shipping.state.trim()) newErrors.state = "State is required";
    if (!shipping.zipCode.trim()) newErrors.zipCode = "PIN code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateShipping()) return;

    setIsProcessing(true);

    // Build WhatsApp message
    const orderItems = items
      .map(
        (item) =>
          `• ${item.name} (Qty: ${item.quantity}) — ₹${(item.price * item.quantity).toLocaleString("en-IN")}`
      )
      .join("\n");

    const message = `🛒 *New Order from Miraki Radnox Website*

*Customer Details:*
Name: ${shipping.firstName} ${shipping.lastName}
Email: ${shipping.email}
Phone: ${shipping.phone}

*Shipping Address:*
${shipping.address}
${shipping.city}, ${shipping.state} - ${shipping.zipCode}

*Order Items:*
${orderItems}

*Total: ₹${totalPrice.toLocaleString("en-IN")}*

Please confirm this order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918401176934?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    // Clear the cart after sending the order
    clearCart();
    
    setIsProcessing(false);
    
    // Redirect to home page after successful order
    router.push("/");
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-zinc-900">Checkout</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Fill in your details and we&apos;ll connect with you on WhatsApp to confirm your order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-semibold text-zinc-900">Your Information</h2>
              <form onSubmit={handleSubmitOrder} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">First Name</label>
                    <input
                      type="text"
                      value={shipping.firstName}
                      onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                      className={`w-full rounded-xl border px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 ${errors.firstName ? "border-red-500 focus:ring-red-200" : "border-zinc-200 focus:ring-brand-teal/20"
                        }`}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="mt-1 text-xs font-light text-red-500">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">Last Name</label>
                    <input
                      type="text"
                      value={shipping.lastName}
                      onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                      className={`w-full rounded-xl border px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 ${errors.lastName ? "border-red-500 focus:ring-red-200" : "border-zinc-200 focus:ring-brand-teal/20"
                        }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="mt-1 text-xs font-light text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">Email</label>
                    <input
                      type="email"
                      value={shipping.email}
                      onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                      className={`w-full rounded-xl border px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-200" : "border-zinc-200 focus:ring-brand-teal/20"
                        }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-xs font-light text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">Phone</label>
                    <input
                      type="tel"
                      value={shipping.phone}
                      onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                      className={`w-full rounded-xl border px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 ${errors.phone ? "border-red-500 focus:ring-red-200" : "border-zinc-200 focus:ring-brand-teal/20"
                        }`}
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <p className="mt-1 text-xs font-light text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">Address</label>
                  <input
                    type="text"
                    value={shipping.address}
                    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    className={`w-full rounded-xl border px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 ${errors.address ? "border-red-500 focus:ring-red-200" : "border-zinc-200 focus:ring-brand-teal/20"
                      }`}
                    placeholder="123 Main St, Apt 4B"
                  />
                  {errors.address && <p className="mt-1 text-xs font-light text-red-500">{errors.address}</p>}
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">City</label>
                    <input
                      type="text"
                      value={shipping.city}
                      onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                      className={`w-full rounded-xl border px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 ${errors.city ? "border-red-500 focus:ring-red-200" : "border-zinc-200 focus:ring-brand-teal/20"
                        }`}
                      placeholder="Mumbai"
                    />
                    {errors.city && <p className="mt-1 text-xs font-light text-red-500">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">State</label>
                    <input
                      type="text"
                      value={shipping.state}
                      onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                      className={`w-full rounded-xl border px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 ${errors.state ? "border-red-500 focus:ring-red-200" : "border-zinc-200 focus:ring-brand-teal/20"
                        }`}
                      placeholder="Maharashtra"
                    />
                    {errors.state && <p className="mt-1 text-xs font-light text-red-500">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">PIN Code</label>
                    <input
                      type="text"
                      value={shipping.zipCode}
                      onChange={(e) => setShipping({ ...shipping, zipCode: e.target.value })}
                      className={`w-full rounded-xl border px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 ${errors.zipCode ? "border-red-500 focus:ring-red-200" : "border-zinc-200 focus:ring-brand-teal/20"
                        }`}
                      placeholder="400001"
                    />
                    {errors.zipCode && <p className="mt-1 text-xs font-light text-red-500">{errors.zipCode}</p>}
                  </div>
                </div>

                {/* WhatsApp Info */}
                <div className="rounded-xl bg-green-50 p-4">
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-green-800">Order via WhatsApp</p>
                      <p className="text-xs text-green-600">
                        After submitting, you&apos;ll be redirected to WhatsApp with your order details.
                        Our team will contact you to verify the order and proceed with payment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Link
                    href="/"
                    className="rounded-full border border-zinc-200 px-8 py-4 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-50"
                  >
                    BACK TO SHOP
                  </Link>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 rounded-full bg-green-600 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        SENDING...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        SEND ORDER VIA WHATSAPP
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-3xl bg-white p-6 shadow-lg">
              <h3 className="mb-6 text-lg font-bold text-zinc-900">Order Summary</h3>

              {items.map((item) => (
                <div key={item.id} className="mb-4 flex items-center gap-4 rounded-xl bg-zinc-50 p-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-zinc-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-zinc-900">{item.name}</p>
                    <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-brand-teal">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}

              <div className="space-y-3 border-t border-zinc-100 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-bold text-zinc-900">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-t border-zinc-200 pt-3">
                  <span className="text-base font-bold text-zinc-900">Total</span>
                  <span className="text-xl font-black text-zinc-900">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
