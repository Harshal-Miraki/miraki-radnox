import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./contexts/CartContext";

export const metadata: Metadata = {
  title: "Miraki Radnox | Shop Advanced Sensing & HVAC Solutions",
  description: "Your trusted e-commerce destination for HVAC interfaces, sensing solutions, and smart automation controllers. Free shipping on orders over ₹40,000.",
  icons: {
    icon: "/icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
