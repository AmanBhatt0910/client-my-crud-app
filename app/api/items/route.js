import { connectMongoDB } from "@/lib/mongodb";
import Item from "@/models/item";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public/uploads");

export async function GET() {
  await connectMongoDB();
  const items = await Item.find({});
  return new Response(JSON.stringify(items));
}

export async function POST(req) {
  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const image = formData.get("image");

  let imageUrl = null;
  if (image) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const filePath = path.join(uploadDir, image.name);
    fs.writeFileSync(filePath, buffer);
    imageUrl = `/uploads/${image.name}`;
  }

  await connectMongoDB();
  const newItem = new Item({ iconUrl: imageUrl, title, description });
  await newItem.save();
  return new Response(JSON.stringify(newItem), { status: 201 });
}

export async function PUT(req) {
  const formData = await req.formData();
  const itemId = new URL(req.url).searchParams.get("id");
  const title = formData.get("title");
  const description = formData.get("description");
  const image = formData.get("image");

  await connectMongoDB();
  const item = await Item.findById(itemId);
  if (!item) {
    return new Response(JSON.stringify({ message: "Item not found" }), { status: 404 });
  }

  item.title = title;
  item.description = description;

  if (image) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const filePath = path.join(uploadDir, image.name);
    fs.writeFileSync(filePath, buffer);
    item.iconUrl = `/uploads/${image.name}`;
  }

  await item.save();
  return new Response(JSON.stringify(item));
}

export async function DELETE(req) {
  const itemId = new URL(req.url).searchParams.get("id");
  await connectMongoDB();
  
  const item = await Item.findById(itemId);
  if (!item) {
    return new Response(JSON.stringify({ message: "Item not found" }), { status: 404 });
  }

  const imagePath = path.join(process.cwd(), `public${item.iconUrl}`);
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

  await Item.deleteOne({ _id: itemId });

  return new Response(JSON.stringify({ message: "Item and image deleted" }));
}
