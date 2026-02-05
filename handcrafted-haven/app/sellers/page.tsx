import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function SellersPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="text-3xl font-bold">Sellers</h1>
        <p className="mt-2 text-slate-600">
          Meet the artisans behind the handcrafted items.
        </p>

        <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-slate-700">
            Seller profiles will be available soon.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
