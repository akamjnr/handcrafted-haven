import type { Metadata } from "next";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export const metadata: Metadata = {
  title: "Sellers",
  description:
    "Meet the talented artisans behind the handcrafted products on Handcrafted Haven.",
};

const sellers = [
  {
    id: 1,
    name: "Milly Handmade Studio",
    location: "Cape Town, South Africa",
    specialty: "Jewelry & Accessories",
  },
  {
    id: 2,
    name: "Kaya Craft Works",
    location: "Johannesburg, South Africa",
    specialty: "Home Decor",
  },
  {
    id: 3,
    name: "Ink & Thread Studio",
    location: "Durban, South Africa",
    specialty: "Art Prints",
  },
  {
    id: 4,
    name: "Sage & Bloom Naturals",
    location: "Pretoria, South Africa",
    specialty: "Natural Skincare",
  },
];

export default function SellersPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-14">
        {/* Breadcrumbs */}
        <nav className="text-sm text-slate-500">
          <a href="/" className="hover:text-slate-700">
            Home
          </a>
          <span className="mx-2">/</span>
          <span className="text-slate-700">Sellers</span>
        </nav>

        <h1 className="mt-2 text-3xl font-bold">Sellers</h1>
        <p className="mt-2 text-slate-600">
          Meet the talented artisans behind the handcrafted items.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sellers.map((seller) => (
            <div
              key={seller.id}
              className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-lg font-semibold">{seller.name}</h2>

              <p className="mt-2 text-sm text-slate-600">
                <span className="font-medium text-slate-700">
                  Location:
                </span>{" "}
                {seller.location}
              </p>

              <p className="mt-2 text-sm text-slate-600">
                <span className="font-medium text-slate-700">
                  Specialty:
                </span>{" "}
                {seller.specialty}
              </p>

              <a
                href={`/sellers/${seller.id}`}
                className="mt-6 block w-full rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-700"
              >
                View Seller Profile
              </a>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}