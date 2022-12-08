import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const couponSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    description: {
      type: String,
    },
    percentage: {
      type: Number,
      required: true,
    },
    maximum: {
      type: Number,
      required: true,
    },
    user: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
    ],
  },
  { timestamps: true }
);

const couponModel = model("coupon", couponSchema);

export { couponModel };
