import type { Metadata } from "next";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import ReviewSection from "../../../components/ReviewSection";

/* -------------------- Dynamic Metadata -------------------- */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
        { cache: "no-store" }
    );

    const products = await res.json();
    const product = products.find((p: any) => p.id === Number(id));

    if (!product) {
        return {
            title: "Product Not Found",
            description: "This product does not exist.",
        };
    }

    return {
        title: product.name,
        description: product.description,
    };
}

/* -------------------- Page -------------------- */
export default async function ProductDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
        { cache: "no-store" }
    );

    const products = await res.json();
    const product = products.find((p: any) => p.id === Number(id));

    if (!product) {
        return (
            <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
                <Navbar />
                <section className="mx-auto max-w-6xl px-6 py-14">
                    <h1 className="text-3xl font-bold">Product not found</h1>
                    <p className="mt-2 text-slate-600">
                        The product you are looking for does not exist.
                    </p>
                </section>
                <Footer />
            </main>
        );
    }

    const currentIndex = products.findIndex(
        (p: any) => p.id === Number(id)
    );

    const prevProduct =
        currentIndex > 0 ? products[currentIndex - 1] : null;

    const nextProduct =
        currentIndex < products.length - 1
            ? products[currentIndex + 1]
            : null;

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

                {/* Prev / Next */}
                <div className="mt-6 flex justify-between">
                    {prevProduct ? (
                        <a
                            href={`/marketplace/${prevProduct.id}`}
                            className="text-sm text-emerald-600 hover:underline"
                        >
                            ← Previous
                        </a>
                    ) : (
                        <span />
                    )}

                    {nextProduct ? (
                        <a
                            href={`/marketplace/${nextProduct.id}`}
                            className="text-sm text-emerald-600 hover:underline"
                        >
                            Next →
                        </a>
                    ) : (
                        <span />
                    )}
                </div>

                <div className="mt-8 grid gap-10 lg:grid-cols-2">
                    {/* Image */}
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

                        <h1 className="mt-2 text-3xl font-bold">
                            {product.name}
                        </h1>

                        <p className="mt-4 text-slate-600">
                            {product.description}
                        </p>

                        <p className="mt-6 text-3xl font-bold">
                            R {product.price}
                        </p>

                        <div className="mt-8 flex gap-4">
                            <button className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
                                Add to Cart
                            </button>

                            {product.sellerId && (
                                <a
                                    href={`/sellers/${product.sellerId}`}
                                    className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                                >
                                    View Seller
                                </a>
                            )}
                        </div>

                        <div className="mt-10 border-t border-slate-200 pt-6">
                            <h2 className="text-lg font-semibold">Seller</h2>
                            <p className="mt-2 text-slate-600">
                                Crafted by{" "}
                                <span className="font-semibold">
                                    {product.seller || "Independent Artisan"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
                    <h2 className="text-xl font-semibold">
                        Reviews & Ratings
                    </h2>
                    <ReviewSection />
                </div>
            </section>

            <Footer />
        </main>
    );
}