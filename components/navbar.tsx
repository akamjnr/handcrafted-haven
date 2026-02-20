"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Clickable Logo */}
        <a
          href="/"
          className="text-xl font-bold tracking-tight hover:opacity-80"
        >
          Handcrafted Haven
        </a>

        <nav className="flex gap-6 text-sm font-medium text-slate-700 items-center">
          <a href="/" className="hover:text-slate-900">
            Home
          </a>
          <a href="/marketplace" className="hover:text-slate-900">
            Marketplace
          </a>
          <a href="/sellers" className="hover:text-slate-900">
            Sellers
          </a>

          {session ? (
            <>
              <a href="/dashboard" className="hover:text-slate-900">
                Dashboard
              </a>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-xl bg-slate-900 px-4 py-2 text-white text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-white text-sm"
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}