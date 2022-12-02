import Jwt from "jsonwebtoken";
import { OrderModel } from "../model/order.js";

const myOrders = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      res.locals.user = userId;
      res.locals.user = req.session.user;

      const orders = await OrderModel.find({ user: userId }).populate(
        "orderItems.product"
      );
      console.log(orders[0].orderItems[0]);
      res.render("user/myorders", { orders });
    } else {
      res.render("/login");
    }
  } catch (err) {
    console.log(err.message);
  }
};

export { myOrders };
