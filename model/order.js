import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const orderSchema = new Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  orderItems: {
    type: Array,
    require: true,
  },
  totalPrice: {
    type: Number,
    require: true,
  },
  billingAddress: [],
  deliveryAddress: {
    type: Array,
  },
  paymentDetails: {
    type: String,
  },
  orderStatus: {
    type: Boolean,
  },
  deliveryStatus: {
    type: String,
  },
});

const OrderModel = model("orders", orderSchema);

export { OrderModel };
