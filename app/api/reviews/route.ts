import { NextResponse } from "next/server";
import pool from "../../../lib/db";

// ==============================
// GET Reviews for a Product
// ==============================
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
        return NextResponse.json([]);
    }

    try {
        const result = await pool.query(
            "SELECT * FROM reviews WHERE product_id = $1 ORDER BY created_at DESC",
            [Number(productId)] // Convert to number
        );

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("GET Reviews Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}

// ==============================
// POST New Review
// ==============================
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { productId, rating, comment, userEmail } = body;

        const result = await pool.query(
            `INSERT INTO reviews (product_id, rating, comment, user_email)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
            [Number(productId), rating, comment, userEmail] // Convert to number
        );

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error("POST Review Error:", error);
        return NextResponse.json(
            { error: "Failed to create review" },
            { status: 500 }
        );
    }
}