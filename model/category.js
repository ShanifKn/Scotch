import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: { type: String, required: true, unique: true },
    categoryImage: { type: String },
  },
  { timestamps: true }
);

const categoryModel = model("Category", categorySchema);

export { categoryModel };
