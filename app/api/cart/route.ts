import { NextResponse } from "next/server";
import pool from "../../../lib/db";

// GET cart items for user
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");

    try {
        const result = await pool.query(
            `SELECT cart.id, products.*, cart.quantity
       FROM cart
       JOIN products ON cart.product_id = products.id
       WHERE cart.user_email = $1`,
            [userEmail]
        );

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch cart" },
            { status: 500 }
        );
    }
}

// ADD to cart
export async function POST(req: Request) {
    try {
        const { productId, userEmail } = await req.json();

        // Check if already in cart
        const existing = await pool.query(
            "SELECT * FROM cart WHERE product_id = $1 AND user_email = $2",
            [productId, userEmail]
        );

        if (existing.rows.length > 0) {
            await pool.query(
                "UPDATE cart SET quantity = quantity + 1 WHERE product_id = $1 AND user_email = $2",
                [productId, userEmail]
            );
        } else {
            await pool.query(
                "INSERT INTO cart (product_id, user_email) VALUES ($1, $2)",
                [productId, userEmail]
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to add to cart" },
            { status: 500 }
        );
    }
}