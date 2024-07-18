import { connectMongoDB } from "@/lib/mongodb";
import Item from "@/models/item";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectMongoDB();
  const { itemId } = params;
  const item = await Item.findById(itemId);
  if (!item) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(req, { params }) {
  await connectMongoDB();
  const { itemId } = params;
  const { iconUrl, title, description } = await req.json();
  const item = await Item.findByIdAndUpdate(itemId, { iconUrl, title, description }, { new: true });
  if (!item) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function DELETE(req, { params }) {
  await connectMongoDB();
  const { itemId } = params;
  const item = await Item.findByIdAndDelete(itemId);
  if (!item) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Item deleted" });
}
