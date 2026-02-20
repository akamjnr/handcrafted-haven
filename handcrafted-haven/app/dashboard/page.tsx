import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
    title: "Dashboard",
    description:
        "Manage your handcrafted products, orders, and seller profile on Handcrafted Haven.",
};

export default function DashboardPage() {
    return <DashboardClient />;
}