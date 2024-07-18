import mongoose, { Schema, models } from "mongoose";

const itemSchema = new Schema(
  {
    iconUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Item = models.Item || mongoose.model("Item", itemSchema);
export default Item;