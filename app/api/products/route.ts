import { NextResponse } from "next/server";
import { products } from "../../../lib/products";

let allProducts = [...products];

export async function GET() {
    return NextResponse.json(allProducts);
}

export async function POST(req: Request) {
    const body = await req.json();

    const newProduct = {
        id: allProducts.length + 1,
        ...body,
    };

    allProducts.push(newProduct);

    return NextResponse.json(newProduct);
}

export async function PUT(req: Request) {
    const body = await req.json();
    const { id, name, price, category, description } = body;

    const index = allProducts.findIndex((p) => p.id === id);

    if (index === -1) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    allProducts[index] = {
        ...allProducts[index],
        name,
        price,
        category,
        description,
    };

    return NextResponse.json(allProducts[index]);
}

export async function DELETE(req: Request) {
    const body = await req.json();
    const { id } = body;

    allProducts = allProducts.filter((p) => p.id !== id);

    return NextResponse.json({ success: true });
}
