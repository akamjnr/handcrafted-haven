"use client";

import { signIn } from "next-auth/react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
            <Navbar />

            <section className="flex items-center justify-center px-6 py-20">
                <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-sm">
                    <h1 className="text-2xl font-bold text-center">
                        Seller Login
                    </h1>

                    <p className="mt-2 text-center text-slate-600 text-sm">
                        Sign in to manage your handcrafted shop.
                    </p>

                    <form
                        className="mt-8 space-y-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            signIn("credentials", {
                                email: formData.get("email"),
                                password: formData.get("password"),
                                callbackUrl: "/dashboard",
                            });
                        }}
                    >
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="mt-6 text-xs text-center text-slate-500">
                        Demo Login:<br />
                        seller@example.com<br />
                        password123
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}