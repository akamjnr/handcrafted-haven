import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl bg-white p-10 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">
            Support Local Artisans • Shop Handmade
          </p>

          <h2 className="mt-3 text-4xl font-bold leading-tight">
            Unique Handcrafted Treasures, Made with Love.
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Handcrafted Haven is a marketplace where artisans share their stories,
            showcase their craft, and sell beautiful handmade items to customers who
            value quality and sustainability.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/marketplace"
              className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Browse Products
            </a>

            <a
              href="/sellers"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Become a Seller
            </a>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h3 className="text-xl font-semibold">Featured Categories</h3>
        <p className="mt-2 text-slate-600">
          Explore handmade items by category.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {["Jewelry", "Home Decor", "Art Prints", "Skincare Products"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <h4 className="text-lg font-semibold">{item}</h4>
                <p className="mt-2 text-sm text-slate-600">
                  Browse handcrafted {item.toLowerCase()} made by local creators.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
