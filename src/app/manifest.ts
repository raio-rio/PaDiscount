import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PaDiscount",
    short_name: "PaDiscount",
    description:
      "Scan receipts and verify PWD/Senior discounts for food establishments in the Philippines.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111827",
  };
}
