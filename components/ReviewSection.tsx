"use client";

import { useState } from "react";

export default function ReviewSection() {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [reviews, setReviews] = useState([
        {
            rating: 5,
            text: "Beautiful quality! Looks even better in person.",
            author: "Sarah",
        },
        {
            rating: 4,
            text: "Lovely item, fast delivery.",
            author: "Thando",
        },
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!rating || !review) return;

        setReviews([
            ...reviews,
            {
                rating,
                text: review,
                author: "Guest",
            },
        ]);

        setRating(0);
        setReview("");
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
                                className={star <= rating ? "text-yellow-500" : "text-slate-300"}
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
                {reviews.map((r, index) => (
                    <div key={index} className="rounded-xl border border-slate-200 p-5">
                        <p className="text-sm font-semibold text-yellow-500">
                            {"★".repeat(r.rating)}
                        </p>
                        <p className="mt-2 text-slate-700">{r.text}</p>
                        <p className="mt-2 text-xs text-slate-500">— {r.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}