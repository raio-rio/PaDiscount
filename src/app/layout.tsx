import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { OfflineProvider } from "@/components/offline-provider";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PaDiscount | PWD & Senior Discount Checker (PH)",
  description:
    "PaDiscount helps verify PWD and Senior citizen discounts for Philippine food establishments with receipt scanning and calculators.",
  manifest: "/manifest.json",
  keywords: [
    "PaDiscount",
    "PWD discount",
    "Senior citizen discount",
    "Philippines",
    "VAT exemption",
    "restaurant discount",
    "receipt scanner",
  ],
  openGraph: {
    title: "PaDiscount | PWD & Senior Discount Checker (PH)",
    description:
      "Scan receipts or use the calculator to verify the 20% discount and VAT exemption for PWD/Seniors in Philippine food establishments.",
    url: "/",
    siteName: "PaDiscount",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PaDiscount | PWD & Senior Discount Checker (PH)",
    description:
      "Verify PWD/Senior discounts for food establishments in the Philippines via receipt scan or manual calculator.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans", manrope.variable)}>
        <OfflineProvider>{children}</OfflineProvider>
      </body>
    </html>
  );
}
