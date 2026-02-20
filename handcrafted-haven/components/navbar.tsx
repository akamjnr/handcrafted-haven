"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <a
          href="/"
          className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
        >
          Handcrafted Haven
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 sm:flex">
          <a href="/" className="hover:text-slate-900">
            Home
          </a>
          <a href="/marketplace" className="hover:text-slate-900">
            Marketplace
          </a>
          <a href="/sellers" className="hover:text-slate-900">
            Sellers
          </a>

          {!session ? (
            <a
              href="/login"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            >
              Login
            </a>
          ) : (
            <>
              <a
                href="/dashboard"
                className="hover:text-slate-900"
              >
                Dashboard
              </a>

              <button
                onClick={() => signOut()}
                className="rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Icon Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-xl text-slate-900 shadow-sm hover:bg-slate-50 sm:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden">
          <div className="mx-auto max-w-6xl px-4 pb-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-md">
              <nav className="flex flex-col gap-2 text-base font-semibold text-slate-800">
                <a
                  href="/"
                  className="rounded-xl px-4 py-3 hover:bg-slate-50"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </a>

                <a
                  href="/marketplace"
                  className="rounded-xl px-4 py-3 hover:bg-slate-50"
                  onClick={() => setMenuOpen(false)}
                >
                  Marketplace
                </a>

                <a
                  href="/sellers"
                  className="rounded-xl px-4 py-3 hover:bg-slate-50"
                  onClick={() => setMenuOpen(false)}
                >
                  Sellers
                </a>

                {!session ? (
                  <a
                    href="/login"
                    className="rounded-xl bg-emerald-600 px-4 py-3 text-center text-white hover:bg-emerald-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </a>
                ) : (
                  <>
                    <a
                      href="/dashboard"
                      className="rounded-xl px-4 py-3 hover:bg-slate-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </a>

                    <button
                      onClick={() => {
                        signOut();
                        setMenuOpen(false);
                      }}
                      className="rounded-xl border border-slate-300 px-4 py-3 hover:bg-slate-50"
                    >
                      Logout
                    </button>
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}