import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const productSchema = new Schema({
  Product_title: {
    type: String,
    // require: true,
  },
  Product_des: {
    type: String,
    // require: true,
  },
  Price: {
    Retail_price: {
      type: Number,
      // require: true,
    },
    Offer_price: {
      type: Number,
      // require: true,
    },
  },
  Product_quantity: {
    type: Number,
    // require: true,
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  color: {
    type: String,
    // require: true,
  },
  Size: {
    type: String,
    // require: true,
  },
  Product_info: {
    type: String,
    // require: true,
  },
  Product_material: {
    type: String,
    // require: true,
  },
  images: {
    type: Array,
  },
  ProductDeleted: {
    type: Boolean,
    default: false,
  },
});

const productModel = model("product", productSchema);

export { productModel };
