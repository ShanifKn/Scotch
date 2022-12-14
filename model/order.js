import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import moment from "moment";

const orderSchema = new Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
        },
        total: {
          type: Number,
        },
        active: {
          type: Boolean,
          default: true,
        },
      },
    ],
    subtotal: {
      type: Number,
    },
    totalPrice: {
      type: Number,
      require: true,
    },
    discountAmount: {
      type: Number,
    },
    billingAddress: {
      type: Array,
    },
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
    order_date: {
      type: String,
      default: moment(Date.now()).format("YYYY-MM-DD"),
    },
  },
  { timestamps: true }
);

const OrderModel = model("orders", orderSchema);

export { OrderModel };
