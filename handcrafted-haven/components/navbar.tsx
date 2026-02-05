export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold tracking-tight">
          Handcrafted Haven
        </h1>

        <nav className="flex gap-6 text-sm font-medium text-slate-700">
          <a href="/" className="hover:text-slate-900">Home</a>
          <a href="/marketplace" className="hover:text-slate-900">Marketplace</a>
          <a href="/sellers" className="hover:text-slate-900">Sellers</a>
        </nav>

      </div>
    </header>
  );
}
