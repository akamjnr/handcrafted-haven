import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import pool from "../../lib/db";

type Seller = {
  name: string;
  email: string;
};

export default async function SellersPage() {
  const result = await pool.query(
    "SELECT DISTINCT seller AS name, seller_email AS email FROM products WHERE seller_email IS NOT NULL"
  );

  const sellers: Seller[] = result.rows;

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

        {sellers.length === 0 ? (
          <p className="mt-10 text-slate-600">
            No sellers available yet.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sellers.map((seller) => (
              <div
                key={seller.email}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <h2 className="text-lg font-semibold">{seller.name}</h2>

                <p className="mt-2 text-sm text-slate-600">
                  Verified artisan seller
                </p>

                <a
                  href={`/sellers/${encodeURIComponent(seller.email)}`}
                  className="mt-6 block w-full rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  View Seller Profile
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}