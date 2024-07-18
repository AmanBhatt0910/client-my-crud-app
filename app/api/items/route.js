import { connectMongoDB } from "@/lib/mongodb";
import Item from "@/models/item";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const items = await Item.find({});
  return NextResponse.json(items);
}

export async function POST(req) {
  await connectMongoDB();
  const { iconUrl, title, description } = await req.json();
  const newItem = new Item({ iconUrl, title, description });
  await newItem.save();
  return NextResponse.json(newItem, { status: 201 });
}
