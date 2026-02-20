import AddToCartButton from "../../../components/AddToCartButton";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import ReviewSection from "../../../components/ReviewSection";
import pool from "../../../lib/db";
import { notFound } from "next/navigation";

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    seller: string;
    seller_email: string;
};

export default async function ProductDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const productId = parseInt(id, 10);

    // 🔥 Protect against invalid IDs
    if (isNaN(productId)) {
        notFound();
    }

    const result = await pool.query(
        "SELECT * FROM products WHERE id = $1",
        [productId]
    );

    if (result.rows.length === 0) {
        notFound();
    }

    const product: Product = result.rows[0];

    return (
        <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
            <Navbar />

            <section className="mx-auto max-w-6xl px-6 py-14">
                {/* Breadcrumbs */}
                <nav className="text-sm text-slate-500">
                    <a href="/" className="hover:text-slate-700">
                        Home
                    </a>
                    <span className="mx-2">/</span>
                    <a href="/marketplace" className="hover:text-slate-700">
                        Marketplace
                    </a>
                    <span className="mx-2">/</span>
                    <span className="text-slate-700">{product.name}</span>
                </nav>

                <div className="mt-8 grid gap-10 lg:grid-cols-2">
                    {/* Image Placeholder */}
                    <div className="rounded-2xl bg-white p-8 shadow-sm">
                        <div className="flex h-80 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                            Product Image
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="rounded-2xl bg-white p-8 shadow-sm">
                        <p className="text-sm font-semibold text-emerald-700">
                            {product.category}
                        </p>

                        <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>

                        <p className="mt-4 text-slate-600">{product.description}</p>

                        <p className="mt-6 text-3xl font-bold">R {product.price}</p>

                        <div className="mt-8 flex gap-4">
                            <AddToCartButton productId={product.id} />

                            <a
                                href={`/sellers/${encodeURIComponent(product.seller_email)}`}
                                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                            >
                                View Seller
                            </a>
                        </div>

                        <div className="mt-10 border-t border-slate-200 pt-6">
                            <h2 className="text-lg font-semibold">Seller</h2>
                            <p className="mt-2 text-slate-600">
                                Crafted by{" "}
                                <span className="font-semibold">{product.seller}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
                    <h2 className="text-xl font-semibold">Reviews & Ratings</h2>
                    <ReviewSection productId={product.id} />
                </div>
            </section>

            <Footer />
        </main>
    );
}