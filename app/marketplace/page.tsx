import type { Metadata } from "next";
import MarketplaceClient from "./MarketplaceClient";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Browse handcrafted items by category and price from talented artisans.",
};

export default function MarketplacePage() {
  return <MarketplaceClient />;
}