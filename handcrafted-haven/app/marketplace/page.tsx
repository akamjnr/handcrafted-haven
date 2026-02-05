import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const products = [
  {
    id: 1,
    name: "Handmade Bracelet",
    price: 180,
    category: "Jewelry",
  },
  {
    id: 2,
    name: "Wall Hanging Clock",
    price: 450,
    category: "Home Decor",
  },
  {
    id: 3,
    name: "Minimal Art Print",
    price: 1200,
    category: "Art Prints",
  },
  {
    id: 4,
    name: "Natural Body Lotion",
    price: 95,
    category: "Skincare",
  },
];

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <p className="mt-2 text-slate-600">
          Browse handcrafted items made by talented artisans.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <p className="text-xs font-semibold text-emerald-700">
                {product.category}
              </p>

              <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>

              <p className="mt-3 text-sm text-slate-600">From</p>
              <p className="text-xl font-bold">R {product.price}</p>

              <button className="mt-6 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
                View Product
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
