import { NextResponse } from "next/server";
import pool from "../../../lib/db";

// GET all products
export async function GET() {
    try {
        const result = await pool.query(
            "SELECT * FROM products ORDER BY created_at DESC"
        );
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

// POST new product
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, price, category, description, seller, sellerId } = body;

        const result = await pool.query(
            `INSERT INTO products (name, price, category, description, seller, seller_email)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
            [name, price, category, description, seller, sellerId]
        );

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}

// DELETE product
export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { id } = body;

        await pool.query("DELETE FROM products WHERE id = $1", [id]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}