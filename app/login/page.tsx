"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid email or password.");
        } else {
            router.push("/sellers/1");
        }
    };

    return (
        <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
            <Navbar />

            <section className="mx-auto max-w-md px-6 py-20">
                <div className="rounded-2xl bg-white p-8 shadow-sm">
                    <h1 className="text-2xl font-bold">Login</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Sign in to access your seller dashboard.
                    </p>

                    <form onSubmit={handleLogin} className="mt-6 space-y-4">
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                required
                                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Password</label>
                            <input
                                type="password"
                                required
                                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
                        <p>Demo Credentials:</p>
                        <p>Email: seller@example.com</p>
                        <p>Password: password123</p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}