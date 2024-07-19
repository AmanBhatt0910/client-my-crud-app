import { connectMongoDB } from "@/lib/mongodb";
import Item from "@/models/item";
import { saveFile } from "@/lib/fileUpload";
import formidable from "formidable";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public/uploads");

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
  const form = formidable({ multiples: true });
  
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const { title, description } = fields;
  let updateData = { title, description };

  if (files.image) {
    const imageFile = files.image[0];
    const imageUrl = await saveFile(imageFile);
    updateData.iconUrl = imageUrl;
  }

  await connectMongoDB();
  const { itemId } = params;
  const item = await Item.findByIdAndUpdate(itemId, updateData, { new: true });
  if (!item) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function DELETE(req, { params }) {
  await connectMongoDB();
  const { itemId } = params;

  const item = await Item.findById(itemId);
  if (!item) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  const imagePath = path.join(process.cwd(), `public${item.iconUrl}`);
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

  await Item.findByIdAndDelete(itemId);

  return NextResponse.json({ message: "Item and image deleted" });
}
