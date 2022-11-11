import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    Name: { type: String, required: true },
    Image: { type: Array },
  },
  { timestamps: true }
);

const categoryModel = model("Category", categorySchema);

export { categoryModel };
