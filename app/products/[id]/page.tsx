"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../contexts/CartContext";
import { notFound } from "next/navigation";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  inStock: boolean;
  sku: string;
  warranty: string;
  shippingTime: string;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "MODBUS TO TCP",
    category: "Communication Gateways",
    price: 23999,
    image: "https://ik.imagekit.io/rdwxgbmgm/Miraki-Radnox/MODBUS_TO_TCP.jpg",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    description: "The Rx-PC-MR-MT Protocol Converter enables seamless communication between Modbus RTU devices and Modbus TCP networks, making it a practical choice for modern automation environments. Designed for DCS, PLCs, HMIs, power meters, solar equipment, sensors, and measurement instruments, it bridges legacy serial devices with Ethernet infrastructure for easy integration. It supports up to 32 slaves per master for flexible multi-device installations, and the web-browser configuration interface allows quick commissioning and simple maintenance. An inbuilt 230V AC power supply eliminates external adapters, saving panel space, wiring effort, and cost.",
    features: [
      "Seamless Modbus RTU to Modbus TCP protocol conversion",
      "Supports up to 32 slaves per master for flexible multi-device installations",
      "Built-in web browser configuration with password protection",
      "Inbuilt 230V AC power supply — no external adapters needed",
      "Built-in RS485 protection for serial port safety",
      "Link/Activity LED on LAN for easy status monitoring",
      "Baud rates: 9600, 19200, 38400, 57600, 115200 bps with None/Odd/Even parity",
      "MTBF >100,000 hours for reliable, long-term operation",
    ],
    specifications: [
      { label: "Model No.", value: "Rx-PC-MR-MT" },
      { label: "CPU", value: "32-bit dual-core processor, 240 MHz, with internal SRAM and FLASH ROM" },
      { label: "Input", value: "Modbus RTU (2 Wire RS-485)" },
      { label: "Output", value: "Modbus TCP (RJ45 Connector)" },
      { label: "Power Supply (Inbuilt)", value: "95–280V AC, 50–60 Hz" },
      { label: "Baud Rate", value: "9600 / 19200 / 38400 / 57600 / 115200 bps" },
      { label: "Parity", value: "None, Odd, Even" },
      { label: "Configuration", value: "Built-in Web Browser with password protection" },
      { label: "Serial Port Protection", value: "Built-in RS485 Protection" },
      { label: "Indicators", value: "Link/Activity LED on LAN" },
      { label: "MTBF", value: ">100,000 Hours" },
      { label: "Connection", value: "Screw terminal 1.5 mm² and RJ45 connector" },
      { label: "Operating Temp & Humidity", value: "-15 to 75°C, 10–95% RH (non-condensing)" },
      { label: "Material", value: "ABS Plastic" },
      { label: "Ingress Protection", value: "IP21" },
      { label: "Mounting", value: "DIN Rail Mount / Wall Mount" },
      { label: "OS Supported", value: "Windows 8, Windows 10, or later" },
    ],
    inStock: true,
    sku: "MOD-TCP-001",
    warranty: "2 Years Manufacturer Warranty",
    shippingTime: "Ships within 2-3 business days",
  },
  {
    id: 2,
    name: "Vibration Sensor",
    category: "Industrial Sensors",
    price: 35999,
    image: "https://ik.imagekit.io/rdwxgbmgm/Miraki-Radnox/Vibration%20Sensor.jpg",
    rating: 4.9,
    reviews: 89,
    badge: "New",
    description: "The Rx-VS-R1-PF Intelligent Vibration Sensor delivers reliable detection of vibration, motion, and shock across diverse applications. Its sensing captures both subtle vibrations and sudden impacts with rapid response times. This shock detector provides simple, reliable, and configurable impact detection using DIP switches, making it ideal for field deployment. Compact and energy-efficient, the sensor is suited for industrial equipment, machinery, server racks, transportation systems, and any environment where vibration and motion detection are critical for safety and performance. Apt for integration with BMS, DCIM, and IoT platforms.",
    features: [
      "Measures acceleration on X, Y, and Z axes continuously",
      "Configurable sensitivity via DIP switches — Very Sensitive, Medium, Low, and Very Low",
      "Potential Free Contact relay output — turns ON for 5 seconds on shock event, then auto-resets",
      "Ideal for equipment tamper monitoring, enclosure shock, and machinery vibration detection",
      "Compact and energy-efficient design (100 mA max @ 24V AC)",
      "Wide input voltage range: 11–25V AC/DC",
      "Suitable for indoor panels, wall-mounted equipment, machinery, and heavy transport",
      "Easy integration with BMS, DCIM, SCADA, and IoT platforms",
    ],
    specifications: [
      { label: "Model No.", value: "Rx-VS-R1-PF" },
      { label: "Output Options", value: "Potential Free Contact" },
      { label: "Input Voltage", value: "11–25V AC/DC" },
      { label: "Consumption", value: "100 mA max @ 24V AC" },
      { label: "Sensitivity", value: "DIP Switch selectable (4 levels)" },
      { label: "Operating Temp & Humidity", value: "0–50°C, 0–90% RH (non-condensing)" },
      { label: "Enclosure Size", value: "80 x 80 x 27 mm" },
      { label: "Material", value: "Plastic ABS" },
      { label: "Ingress Protection", value: "IP20" },
    ],
    inStock: true,
    sku: "VIB-SEN-002",
    warranty: "3 Years Manufacturer Warranty",
    shippingTime: "Ships within 1-2 business days",
  },
  {
    id: 3,
    name: "Machine Run Time controller",
    category: "Machine Controllers",
    price: 15999,
    image: "https://ik.imagekit.io/rdwxgbmgm/Miraki-Radnox/Machine%20Run%20Time%20controller.jpg",
    rating: 4.7,
    reviews: 201,
    badge: "Sale",
    description: "The Rx-MRC-MR-024 Machine Run Time Controller monitors machine start and stop activity over Modbus RS-485, making it suitable for modern automation environments. Designed for compressors, pumps, CNC machines, HVAC equipment, DG sets, packaging machines, and other motor-driven assets, it allows BMS, DCIM, SCADA, and IoT platforms to track operating hours and estimate energy usage by combining run time with machine rated power — without PLC integration or dedicated energy meters. It provides reliable run-time data for preventive maintenance, warranty validation, shift analysis, and asset utilization monitoring. An inbuilt 230V AC power supply eliminates external adapters, reducing panel space, wiring effort, and installation cost.",
    features: [
      "Monitors machine start/stop activity over Modbus RS-485 for modern automation environments",
      "Tracks operating hours and estimates energy usage by combining run time with machine rated power",
      "No PLC integration or dedicated energy meters required",
      "Provides reliable data for preventive maintenance, warranty validation, shift analysis, and asset utilization",
      "Inbuilt 230V AC power supply — eliminates external adapters, reduces panel space and wiring effort",
      "Supports both new deployments and legacy equipment digitization",
      "Suitable for compressors, pumps, CNC machines, HVAC equipment, DG sets, and packaging machines",
      "32-bit processor with internal SRAM and FLASH ROM for reliable operation",
    ],
    specifications: [
      { label: "Model No.", value: "Rx-MRC-MR-024" },
      { label: "CPU", value: "32-bit processor with internal SRAM and FLASH ROM" },
      { label: "Input", value: "Machine Relay (Refer Connection Diagram)" },
      { label: "Output", value: "Modbus RTU (2 Wire RS-485)" },
      { label: "Power Supply (Inbuilt)", value: "95–280V AC, 50–60 Hz" },
      { label: "Connection", value: "Screw terminal, 1.5 mm²" },
      { label: "Operating Temp & Humidity", value: "-15 to 75°C, 10–95% RH (non-condensing)" },
      { label: "Material", value: "ABS Plastic" },
      { label: "Ingress Protection", value: "IP21" },
      { label: "Mounting", value: "DIN Rail Mount / Wall Mount" },
    ],
    inStock: true,
    sku: "MRTC-003",
    warranty: "2 Years Manufacturer Warranty",
    shippingTime: "Ships within 2-4 business days",
  },
  {
    id: 4,
    name: "FCU",
    category: "Climate Control",
    price: 14399,
    image: "https://ik.imagekit.io/rdwxgbmgm/Miraki-Radnox/FCU.jpg",
    rating: 4.6,
    reviews: 156,
    description: "The Rx-PS-FCU-0x is a compact, all-in-one power supply and interface module designed for Fan Coil Units (FCUs). Featuring built-in mode selection, clear status indicators, and seamless integration with both BMS and Thermostat systems, it simplifies installation, ensures reliable operation, and improves system efficiency. Well-suited for hotels & hospitality guest rooms, office spaces, residential apartments, smart homes, and centralized BMS-integrated HVAC systems.",
    features: [
      "Plug-and-Play interface — simplifies wiring between FCU, valve actuator, and BMS/Thermostat with inbuilt power supply",
      "Supports fan motor speed control (Low, Medium, High) and valve actuator feedback/control",
      "Field-selectable operation mode: BMS Central Control or Thermostat Guest Control",
      "Fan status signals (On/Off, Low/Medium/High speed) communicated back to BMS",
      "Compact and robust design suitable for false ceilings, vestibule areas, and utility rooms",
      "Inbuilt LED indicators: Power Supply Status, Fan On/Off, Fan Speed (Low/Medium/High)",
      "LED mode indicators for BMS Central Control and Thermostat Guest Control",
      "Fuse-protected circuitry (230V AC, 2A) for safe and reliable operation",
    ],
    specifications: [
      { label: "Model No.", value: "Rx-PS-FCU-0x" },
      { label: "Input Voltage", value: "230V AC, 50/60Hz" },
      { label: "Output Voltage (AC)", value: "24V AC, 500mA" },
      { label: "Output Voltage (DC)", value: "24V DC, 800mA" },
      { label: "Control Mode", value: "BMS Central Control / Thermostat - Guest Control (Internal Switch)" },
      { label: "Protection Circuitry", value: "Fuse Protection (230V AC, 2A)" },
      { label: "Terminal", value: "300V 15A, 2.5 sq. mm / 28-12AWG" },
      { label: "Material", value: "Plastic ABS" },
      { label: "Ingress Protection", value: "IP20" },
      { label: "Mounting", value: "DIN RAIL Wall Mount" },
      { label: "Operating Temp & Humidity", value: "0–60°C, 0–90% RH (non-condensing)" },
      { label: "Product Size", value: "110 x 74 x 90 mm" },
    ],
    inStock: true,
    sku: "FCU-CTRL-004",
    warranty: "1 Year Manufacturer Warranty",
    shippingTime: "Ships within 1-2 business days",
  },
];

const reviews: Review[] = [
  {
    id: 1,
    author: "Michael Chen",
    rating: 5,
    date: "2024-01-15",
    title: "Excellent product, exceeded expectations!",
    content: "We've deployed these sensors across our entire facility and the accuracy is outstanding. The build quality is top-notch and the technical support team has been incredibly helpful during setup.",
    verified: true,
    helpful: 24,
  },
  {
    id: 2,
    author: "Sarah Johnson",
    rating: 5,
    date: "2024-01-10",
    title: "Best investment for our building automation",
    content: "The integration with our existing BACnet system was seamless. Data logging features are comprehensive and the web interface is intuitive. Highly recommend for any commercial building.",
    verified: true,
    helpful: 18,
  },
  {
    id: 3,
    author: "David Park",
    rating: 4,
    date: "2024-01-05",
    title: "Great product, minor setup complexity",
    content: "The sensor itself is fantastic - accurate, reliable, and well-built. Setup took a bit longer than expected due to the comprehensive configuration options, but the manual was helpful.",
    verified: true,
    helpful: 12,
  },
  {
    id: 4,
    author: "Emily Rodriguez",
    rating: 5,
    date: "2023-12-28",
    title: "Perfect for industrial environments",
    content: "We needed something rugged for our manufacturing floor and this delivers. The IP65 rating is no joke - it's handling dust, humidity, and temperature variations without any issues.",
    verified: true,
    helpful: 9,
  },
  {
    id: 5,
    author: "James Wilson",
    rating: 5,
    date: "2023-12-20",
    title: "Outstanding value for the price",
    content: "Compared to other sensors in this category, the features you get at this price point are incredible. The accuracy rivals units costing twice as much.",
    verified: true,
    helpful: 15,
  },
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const [isAdded, setIsAdded] = useState(false);

  const product = products.find((p) => p.id === parseInt(resolvedParams.id));



  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };



  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-zinc-50 py-4">
        <div className="container mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-zinc-500 hover:text-brand-teal">
              Home
            </Link>
            <span className="text-zinc-300">/</span>
            <Link href="/#products" className="text-zinc-500 hover:text-brand-teal">
              Products
            </Link>
            <span className="text-zinc-300">/</span>
            <Link href={`/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`} className="text-zinc-500 hover:text-brand-teal">
              {product.category}
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image Gallery */}
            <div>
              <div className="relative overflow-hidden rounded-3xl border border-zinc-100 bg-zinc-50">
                <div className="aspect-square flex items-center justify-center p-8">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>
                {product.badge && (
                  <span className={`absolute left-4 top-4 rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-lg ${product.badge === "Sale" ? "bg-gradient-to-r from-red-500 to-pink-500" :
                    product.badge === "New" ? "bg-gradient-to-r from-green-500 to-emerald-500" :
                      product.badge === "Premium" ? "bg-gradient-to-r from-purple-500 to-violet-500" :
                        "bg-gradient-to-r from-brand-teal to-cyan-500"
                    }`}>
                    {product.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-2 flex items-center gap-3">
                <span className="rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-bold tracking-wide text-brand-teal uppercase">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-zinc-200"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-zinc-500">({product.reviews} reviews)</span>
                </div>
              </div>

              <h1 className="mb-4 text-4xl font-black text-zinc-900 lg:text-5xl">
                {product.name}
              </h1>

              <p className="mb-6 text-lg leading-relaxed text-zinc-600">
                {product.description}
              </p>

              <div className="mb-8 flex items-baseline gap-4">
                <span className="text-5xl font-black text-zinc-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-zinc-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mb-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-full border border-zinc-200 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-12 w-12 items-center justify-center rounded-full text-zinc-600 transition-all hover:bg-zinc-100"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-16 text-center text-lg font-bold text-zinc-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-12 w-12 items-center justify-center rounded-full text-zinc-600 transition-all hover:bg-zinc-100"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 rounded-full px-8 py-4 text-sm font-bold text-white shadow-lg transition-all active:scale-95 sm:flex-none ${isAdded
                    ? "bg-green-500"
                    : product.inStock
                      ? "bg-brand-teal hover:bg-brand-teal-dark hover:shadow-xl"
                      : "bg-zinc-400 cursor-not-allowed"
                    }`}
                >
                  {isAdded ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      ADDED TO CART
                    </span>
                  ) : product.inStock ? (
                    "ADD TO CART"
                  ) : (
                    "OUT OF STOCK"
                  )}
                </button>
              </div>

              {/* Product Meta */}
              <div className="space-y-3 rounded-2xl bg-zinc-50 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">In Stock</p>
                    <p className="text-xs text-zinc-500">{product.shippingTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{product.warranty}</p>
                    <p className="text-xs text-zinc-500">Full manufacturer coverage</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                    <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">SKU: {product.sku}</p>
                    <p className="text-xs text-zinc-500">Unique product identifier</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="border-t border-zinc-100 py-12">
        <div className="container mx-auto px-6">
          {/* Tab Headers */}
          <div className="mb-8 flex gap-4 border-b border-zinc-200">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-4 text-sm font-bold transition-all ${activeTab === "description"
                ? "text-brand-teal border-b-2 border-brand-teal"
                : "text-zinc-500 hover:text-zinc-900"
                }`}
            >
              Description & Features
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-4 text-sm font-bold transition-all ${activeTab === "specs"
                ? "text-brand-teal border-b-2 border-brand-teal"
                : "text-zinc-500 hover:text-zinc-900"
                }`}
            >
              Specifications
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "description" && (
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                {/* <h3 className="mb-6 text-2xl font-black text-zinc-900">Product Overview</h3>
                <p className="mb-6 leading-relaxed text-zinc-600">{product.description}</p> */}
                <h4 className="mb-4 text-xl font-bold text-zinc-900">Key Features</h4>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-zinc-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-brand-teal to-cyan-600 p-8 text-white">
                <h3 className="mb-6 text-2xl font-black">Why Choose {product.name}?</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold">High Performance</p>
                      <p className="text-sm text-white/80">Industry-leading accuracy and reliability</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold">Quality Assured</p>
                      <p className="text-sm text-white/80">Rigorous testing and quality control</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold">Expert Support</p>
                      <p className="text-sm text-white/80">24/7 technical assistance available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="max-w-4xl">
              <h3 className="mb-8 text-2xl font-black text-zinc-900">Technical Specifications</h3>
              <div className="overflow-hidden rounded-2xl border border-zinc-200">
                <table className="w-full">
                  <tbody>
                    {product.specifications.map((spec, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-zinc-50" : "bg-white"}
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-zinc-700">
                          {spec.label}
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-600">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Reviews Summary */}
              <div className="rounded-3xl bg-zinc-50 p-8">
                <h3 className="mb-6 text-2xl font-black text-zinc-900">Customer Reviews</h3>
                <div className="mb-6 text-center">
                  <p className="text-6xl font-black text-zinc-900">{product.rating}</p>
                  <div className="my-2 flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-6 w-6 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-zinc-200"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-zinc-500">Based on {product.reviews} reviews</p>
                </div>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const percentage = stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1;
                    return (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-xs font-medium text-zinc-600 w-3">{stars}★</span>
                        <div className="flex-1 h-2 rounded-full bg-zinc-200">
                          <div
                            className="h-2 rounded-full bg-yellow-400"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-zinc-400 w-8">{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reviews List */}
              <div className="lg:col-span-2 space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="rounded-2xl border border-zinc-100 p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "text-yellow-400" : "text-zinc-200"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          {review.verified && (
                            <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-zinc-900">{review.title}</h4>
                      </div>
                      <span className="text-sm text-zinc-500">{review.date}</span>
                    </div>
                    <p className="mb-4 text-zinc-600">{review.content}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-zinc-900">{review.author}</span>
                      <button className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-zinc-50 py-16">
          <div className="container mx-auto px-6">
            <h2 className="mb-8 text-3xl font-black text-zinc-900">Related Products</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {relatedProduct.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-brand-teal px-3 py-1 text-xs font-bold text-white">
                        {relatedProduct.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="mb-1 text-xs font-medium text-brand-teal">
                      {relatedProduct.category}
                    </p>
                    <h3 className="mb-2 font-bold text-zinc-900">{relatedProduct.name}</h3>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-zinc-900">
                        ₹{(relatedProduct.price * 80).toLocaleString('en-IN')}
                      </span>
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-zinc-500">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
