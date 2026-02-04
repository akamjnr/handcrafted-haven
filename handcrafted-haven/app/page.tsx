export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* Navbar */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold tracking-tight">
            Handcrafted Haven
          </h1>

          <nav className="flex gap-6 text-sm font-medium text-slate-700">
            <a href="#" className="hover:text-slate-900">Marketplace</a>
            <a href="#" className="hover:text-slate-900">Sellers</a>
            <a href="#" className="hover:text-slate-900">About</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl bg-white p-10 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">
            Support local artisans • Shop handmade
          </p>

          <h2 className="mt-3 text-4xl font-bold leading-tight">
            Discover unique handcrafted treasures, made with love.
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Handcrafted Haven is a marketplace where artisans share their stories,
            showcase their craft, and sell beautiful handmade items to customers who
            value quality and sustainability.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">
              Browse Products
            </button>

            <button className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50">
              Become a Seller
            </button>
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
          {["Jewelry", "Home Decor", "Art Prints", "Skincare"].map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h4 className="text-lg font-semibold">{item}</h4>
              <p className="mt-2 text-sm text-slate-600">
                Browse handcrafted {item.toLowerCase()} made by local creators.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Handcrafted Haven</p>
          <p>Built with Next.js • Deployed on Vercel</p>
        </div>
      </footer>
    </main>
  );
}
