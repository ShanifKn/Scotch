import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const wishlistSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    wishlist: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
      },
    ],
  },
  { timestamps: true }
);

const wishlistModel = model("wishlist", wishlistSchema);

export { wishlistModel };
