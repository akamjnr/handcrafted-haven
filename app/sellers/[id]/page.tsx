import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { products } from "../../../lib/products";

const sellers = [
    {
        id: 1,
        name: "Milly Handmade Studio",
        location: "Cape Town, South Africa",
        specialty: "Jewelry & Accessories",
        bio: "Milly Handmade Studio creates handcrafted jewelry inspired by simple elegance and everyday wear.",
    },
    {
        id: 2,
        name: "Kaya Craft Works",
        location: "Johannesburg, South Africa",
        specialty: "Home Decor",
        bio: "Kaya Craft Works designs warm, handmade decor pieces that bring personality into your home.",
    },
    {
        id: 3,
        name: "Ink & Thread Studio",
        location: "Durban, South Africa",
        specialty: "Art Prints",
        bio: "Ink & Thread Studio produces premium art prints with a modern, calm, minimal aesthetic.",
    },
    {
        id: 4,
        name: "Sage & Bloom Naturals",
        location: "Pretoria, South Africa",
        specialty: "Natural Skincare",
        bio: "Sage & Bloom Naturals creates gentle skincare products using natural ingredients and simple formulas.",
    },
];

export default async function SellerProfilePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const sellerId = Number(id);

    const seller = sellers.find((s) => s.id === sellerId);

    if (!seller) {
        return (
            <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
                <Navbar />
                <section className="mx-auto max-w-6xl px-6 py-14">
                    <h1 className="text-3xl font-bold">Seller not found</h1>
                    <p className="mt-2 text-slate-600">
                        The seller profile you are looking for does not exist.
                    </p>
                </section>
                <Footer />
            </main>
        );
    }

    // Products made by this seller
    const sellerProducts = products.filter((p) => p.seller === seller.name);

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
                    <a href="/sellers" className="hover:text-slate-700">
                        Sellers
                    </a>
                    <span className="mx-2">/</span>
                    <span className="text-slate-700">{seller.name}</span>
                </nav>

                <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
                    <h1 className="text-3xl font-bold">{seller.name}</h1>

                    <p className="mt-3 text-slate-600">{seller.bio}</p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-xs font-semibold text-slate-500">Location</p>
                            <p className="mt-1 font-semibold text-slate-900">
                                {seller.location}
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-xs font-semibold text-slate-500">Specialty</p>
                            <p className="mt-1 font-semibold text-slate-900">
                                {seller.specialty}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Seller Products */}
                <div className="mt-10">
                    <h2 className="text-xl font-semibold">Products by {seller.name}</h2>
                    <p className="mt-2 text-slate-600">
                        Browse handcrafted items created by this seller.
                    </p>

                    {sellerProducts.length === 0 ? (
                        <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
                            <p className="text-slate-700">
                                This seller has not listed any products yet.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {sellerProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
                                >
                                    <p className="text-xs font-semibold text-emerald-700">
                                        {product.category}
                                    </p>

                                    <h3 className="mt-2 text-lg font-semibold">
                                        {product.name}
                                    </h3>

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
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
