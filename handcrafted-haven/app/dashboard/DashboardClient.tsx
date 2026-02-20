"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    seller?: string;
    sellerId?: string;
};

export default function DashboardClient() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [products, setProducts] = useState<Product[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Jewelry");
    const [description, setDescription] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (status === "loading") return;
        if (!session) router.push("/login");
    }, [session, status, router]);

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, [success]);

    if (status === "loading") {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </main>
        );
    }

    if (!session) return null;

    const resetForm = () => {
        setEditingId(null);
        setName("");
        setPrice("");
        setCategory("Jewelry");
        setDescription("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            await fetch("/api/products", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: editingId,
                    name,
                    price: Number(price),
                    category,
                    description,
                }),
            });

            setSuccess("Product updated successfully!");
        } else {
            await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    price: Number(price),
                    category,
                    description,
                    seller: session.user?.name,
                    sellerId: session.user?.email,
                }),
            });

            setSuccess("Product submitted successfully!");
        }

        resetForm();
    };

    const sellerProducts = products.filter(
        (p) => p.sellerId === session.user?.email
    );

    return (
        <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
            <Navbar />

            <section className="mx-auto max-w-6xl px-6 py-14">
                <h1 className="text-3xl font-bold">
                    Welcome, {session.user?.name}
                </h1>

                <p className="mt-2 text-slate-600">
                    Manage your handcrafted business below.
                </p>

                {/* Dashboard Cards */}
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">Manage Products</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Add, edit, and organize your handcrafted items.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">View Orders</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Track and manage incoming customer orders.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">Account Settings</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Update your seller information and profile.
                        </p>
                    </div>
                </div>

                {/* Add Product Form */}
                <div className="mt-14 rounded-2xl bg-white p-8 shadow-sm">
                    <h2 className="text-xl font-semibold mb-6">
                        {editingId ? "Edit Product" : "Add New Product"}
                    </h2>

                    {success && (
                        <div className="mb-4 rounded-lg bg-emerald-100 p-3 text-emerald-800 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium">
                                Product Name
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">
                                Price (R)
                            </label>
                            <input
                                type="number"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2"
                            >
                                <option>Jewelry</option>
                                <option>Home Decor</option>
                                <option>Art Prints</option>
                                <option>Skincare</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">
                                Description
                            </label>
                            <textarea
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2"
                                rows={4}
                            />
                        </div>

                        <button
                            type="submit"
                            className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                        >
                            {editingId ? "Update Product" : "Submit Product"}
                        </button>
                    </form>
                </div>

                {/* Your Products Section */}
                <div className="mt-14">
                    <h2 className="text-xl font-semibold mb-6">
                        Your Products
                    </h2>

                    {sellerProducts.length === 0 ? (
                        <p className="text-slate-600">
                            You have not added any products yet.
                        </p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {sellerProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="rounded-2xl bg-white p-6 shadow-sm"
                                >
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <p className="text-sm text-slate-600">
                                        R {product.price}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-2">
                                        {product.category}
                                    </p>

                                    <div className="mt-4 flex gap-3">
                                        <button
                                            onClick={() => {
                                                setEditingId(product.id);
                                                setName(product.name);
                                                setPrice(String(product.price));
                                                setCategory(product.category);
                                                setDescription(product.description);
                                            }}
                                            className="rounded-lg border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={async () => {
                                                await fetch("/api/products", {
                                                    method: "DELETE",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ id: product.id }),
                                                });

                                                setSuccess("Product deleted successfully!");
                                            }}
                                            className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}