import * as dotenv from "dotenv";
dotenv.config();
import Razorpay from "razorpay";
import crypto from "crypto";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const verfiyRazorPay = (response, order) => {
  return new Promise((resolve, reject) => {
    const key = response.razorpay_order_id + "|" + response.razorpay_payment_id;
    const Signature = crypto
      .createHmac("sha256", instance.key_secret)
      .update(key.toString())
      .digest("hex");
    if (Signature === response.razorpay_signature) {
      resolve(order.receipt);
    } else {
      reject();
    }
  });
};

export { instance, verfiyRazorPay };
