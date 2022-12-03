import Jwt from "jsonwebtoken";
import { OrderModel } from "../model/order.js";

const myOrders = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      res.locals.user = userId;
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

const singleOrder = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      res.locals.user = userId;
      const orderId = req.params.id;
      const order = await OrderModel.findOne({ _id: orderId }).populate(
        "orderItems.product"
      );
      console.log(order);
      res.render("user/orders", { order });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const orderPlace = (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      res.locals.user = userId;

      res.render("user/orderComfrom");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    console.log(req.body);
    const productId = req.body.id;
    const orderId = req.body.orderId;
    const deleteOrder = await OrderModel.updateOne(
      {
        _id: orderId,
        "orderItems.product": productId,
      },
      {
        $set: {
          "orderItems.$.active": false,
        },
      }
    ).then(() => {
      res.json({ response: true });
    });
  } catch (err) {
    console.log(err.message);
  }
};

export { myOrders, orderPlace, singleOrder, deleteOrderItem };
