import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import pool from "../../../lib/db";
import { notFound } from "next/navigation";

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
};

export default async function SellerProfilePage({
    params,
}: {
    params: Promise<{ email: string }>;
}) {
    const { email } = await params;

    const decodedEmail = decodeURIComponent(email);

    const sellerResult = await pool.query(
        "SELECT DISTINCT seller FROM products WHERE seller_email = $1",
        [decodedEmail]
    );

    if (sellerResult.rows.length === 0) {
        notFound();
    }

    const sellerName = sellerResult.rows[0].seller;

    const productsResult = await pool.query(
        "SELECT id, name, price, category FROM products WHERE seller_email = $1 ORDER BY created_at DESC",
        [decodedEmail]
    );

    const products: Product[] = productsResult.rows;

    return (
        <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
            <Navbar />

            <section className="mx-auto max-w-6xl px-6 py-14">
                <h1 className="text-3xl font-bold">{sellerName}</h1>
                <p className="mt-2 text-slate-600">
                    Artisan seller profile and product collection.
                </p>

                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-6">
                        Products by {sellerName}
                    </h2>

                    {products.length === 0 ? (
                        <p className="text-slate-600">No products yet.</p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
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

                                    <a
                                        href={`/marketplace/${product.id}`}
                                        className="mt-4 block rounded-xl bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-emerald-700"
                                    >
                                        View Product
                                    </a>
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