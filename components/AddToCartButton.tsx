"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AddToCartButton({ productId }: { productId: number }) {
    const { data: session } = useSession();
    const [message, setMessage] = useState("");

    const handleAdd = async () => {
        if (!session?.user?.email) {
            setMessage("Please login to add to cart.");
            return;
        }

        const res = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId,
                userEmail: session.user.email,
            }),
        });

        if (res.ok) {
            setMessage("Added to cart!");
        } else {
            setMessage("Error adding to cart.");
        }
    };

    return (
        <div>
            <button
                onClick={handleAdd}
                className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
                Add to Cart
            </button>

            {message && (
                <p className="mt-2 text-sm text-emerald-600">{message}</p>
            )}
        </div>
    );
}