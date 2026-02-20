"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Review = {
    id: number;
    rating: number;
    comment: string;
    user_email: string;
};

export default function ReviewSection({ productId }: { productId: number }) {
    const { data: session } = useSession();

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    // 🔹 Fetch reviews from DB
    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await fetch(`/api/reviews?productId=${productId}`);
                const data = await res.json();
                setReviews(data);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchReviews();
    }, [productId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rating || !review) return;

        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId,
                    rating,
                    comment: review,
                    userEmail: session?.user?.email || "guest",
                }),
            });

            const newReview = await res.json();

            setReviews([newReview, ...reviews]);
            setRating(0);
            setReview("");
        } catch (error) {
            console.error("Failed to submit review:", error);
        }
    };

    return (
        <div className="mt-6">
            {/* Review Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Rating</label>
                    <div className="mt-2 flex gap-2 text-2xl">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                aria-label={`Rate ${star} stars`}
                                onClick={() => setRating(star)}
                                className={
                                    star <= rating ? "text-yellow-500" : "text-slate-300"
                                }
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">Review</label>
                    <textarea
                        rows={3}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                    Submit Review
                </button>
            </form>

            {/* Reviews List */}
            <div className="mt-8 space-y-6">
                {loading && (
                    <p className="text-slate-600 text-sm">Loading reviews...</p>
                )}

                {!loading && reviews.length === 0 && (
                    <p className="text-slate-600 text-sm">
                        No reviews yet. Be the first to review!
                    </p>
                )}

                {reviews.map((r) => (
                    <div
                        key={r.id}
                        className="rounded-xl border border-slate-200 p-5"
                    >
                        <p className="text-sm font-semibold text-yellow-500">
                            {"★".repeat(r.rating)}
                        </p>
                        <p className="mt-2 text-slate-700">{r.comment}</p>
                        <p className="mt-2 text-xs text-slate-500">
                            — {r.user_email || "Guest"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}