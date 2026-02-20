"use client";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    description?: string;
};

export default function MarketplaceClient() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // 🔹 Fetch products from API
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    // 🔹 Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, selectedPrice]);

    const categories = ["All", ...new Set(products.map((p) => p.category))];

    const filteredProducts = products.filter((p) => {
        const matchesCategory =
            selectedCategory === "All" || p.category === selectedCategory;

        const matchesPrice =
            selectedPrice === "All" ||
            (selectedPrice === "Under200" && p.price < 200) ||
            (selectedPrice === "200to500" && p.price >= 200 && p.price <= 500) ||
            (selectedPrice === "Over500" && p.price > 500);

        return matchesCategory && matchesPrice;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
            <Navbar />

            <section className="mx-auto max-w-6xl px-6 py-14">
                <h1 className="text-3xl font-bold">Marketplace</h1>
                <p className="mt-2 text-slate-600">
                    Browse handcrafted items made by talented artisans.
                </p>

                {/* Loading State */}
                {loading && (
                    <div className="mt-10 text-slate-600">Loading products...</div>
                )}

                {!loading && (
                    <>
                        {/* Filters */}
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <label className="text-sm font-medium text-slate-700">
                                Category:
                            </label>

                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm"
                            >
                                {categories.map((cat) => (
                                    <option key={cat}>{cat}</option>
                                ))}
                            </select>

                            <label className="ml-4 text-sm font-medium text-slate-700">
                                Price:
                            </label>

                            <select
                                value={selectedPrice}
                                onChange={(e) => setSelectedPrice(e.target.value)}
                                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm"
                            >
                                <option value="All">All</option>
                                <option value="Under200">Under R200</option>
                                <option value="200to500">R200 – R500</option>
                                <option value="Over500">Over R500</option>
                            </select>
                        </div>

                        {/* Products */}
                        {paginatedProducts.length === 0 ? (
                            <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
                                <p className="font-semibold">No products found.</p>
                                <p className="mt-2 text-sm text-slate-600">
                                    Try changing your filters.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {paginatedProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
                                        >
                                            <p className="text-xs font-semibold text-emerald-700">
                                                {product.category}
                                            </p>

                                            <h2 className="mt-2 text-lg font-semibold">
                                                {product.name}
                                            </h2>

                                            <p className="mt-3 text-sm text-slate-600">From</p>
                                            <p className="text-xl font-bold">R {product.price}</p>

                                            <a
                                                href={`/marketplace/${product.id}`}
                                                className="mt-6 block w-full rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-700"
                                            >
                                                View Product
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                                        <button
                                            onClick={() =>
                                                setCurrentPage((p) => Math.max(1, p - 1))
                                            }
                                            disabled={currentPage === 1}
                                            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold disabled:opacity-50"
                                        >
                                            Prev
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                            (page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`rounded-xl px-4 py-2 text-sm font-semibold ${currentPage === page
                                                            ? "bg-emerald-600 text-white"
                                                            : "border border-slate-300 bg-white hover:bg-slate-50"
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            )
                                        )}

                                        <button
                                            onClick={() =>
                                                setCurrentPage((p) =>
                                                    Math.min(totalPages, p + 1)
                                                )
                                            }
                                            disabled={currentPage === totalPages}
                                            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </section>

            <Footer />
        </main>
    );
}