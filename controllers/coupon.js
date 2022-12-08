import { couponModel } from "../model/coupon.js";
import Jwt from "jsonwebtoken";
import { cartModel } from "../model/cart.js";

const style = "bg-blue-500/13";

const coupon = async (req, res) => {
  const couponList = await couponModel.find();
  res.render("admin/coupon", { Vochers: style, couponList });
};

const addCoupon = async (req, res) => {
  try {
    const { CouponName, Code, description, Maximum, Percentage } = req.body;
    const OldCoupon = await couponModel.findOne({ name: CouponName });
    if (!OldCoupon) {
      const newCoupon = new couponModel({
        name: CouponName,
        code: Code,
        description: description,
        percentage: Percentage,
        maximum: Maximum,
      });
      await newCoupon.save().then(() => {
        res.redirect("/admin/coupon");
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};
// User Side::::::::;
const discountAdded = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      let couponCode = req.body.Value.trim();
      const coupon = await couponModel.findOne({ code: couponCode });
      const couponId = coupon._id;
      const couponToCart = await cartModel.updateOne(
        { user: userId },
        { $set: { coupon: couponId } }
      );
      const Cart = await cartModel.findOne({ user: userId });
      const discountedAmount = (Cart.subtotal * coupon.percentage) / 100;
      const discountAmount =
        Cart.subtotal - (Cart.subtotal * coupon.percentage) / 100;
      res.json({ response: true, discountAmount, discountedAmount });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export { coupon, addCoupon, discountAdded };
