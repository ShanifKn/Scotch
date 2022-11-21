import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const cartModel = model("cart", cartSchema);

export { cartModel };
