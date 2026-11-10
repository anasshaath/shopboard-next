import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
export const metadata: Metadata = { title: "ShopBoard", description: "Useful goods for a well-lived day." };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={geist.variable}><body className="flex min-h-screen flex-col bg-surface font-sans text-ink"><CartProvider><Navbar /><main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8">{children}</main><Footer /></CartProvider></body></html>;
}
