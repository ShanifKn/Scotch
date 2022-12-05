import Jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { OrderModel } from "../model/order.js";

const myOrders = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      res.locals.user = userId;

      const orders = await OrderModel.find({ User: userId }).populate(
        "orderItems.product"
      );
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
      res.render("user/orders", { order });
    } else {
      res.redirect("/login");
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
    const productId = req.body.id;
    const orderId = req.body.orderId;
    const price = await OrderModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(orderId),
        },
      },
      {
        $project: {
          orderItems: {
            $filter: {
              input: "$orderItems",
              cond: {
                $eq: ["$$this.product", mongoose.Types.ObjectId(productId)],
              },
            },
          },
        },
      },
    ]);
    const onePrice = price[0].orderItems[0].total;
    const deleteOrder = await OrderModel.updateOne(
      {
        _id: orderId,
        "orderItems.product": productId,
      },
      {
        $set: {
          "orderItems.$.active": false,
        },
        $inc: { totalPrice: -onePrice },
      }
    ).then(() => {
      res.json({ response: true });
    });
  } catch (err) {
    console.log(err.message);
  }
};

const reorder = async (req, res) => {
  try {
    const productId = req.body.id;
    const orderId = req.body.orderId;
    const price = await OrderModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(orderId),
        },
      },
      {
        $project: {
          orderItems: {
            $filter: {
              input: "$orderItems",
              cond: {
                $eq: ["$$this.product", mongoose.Types.ObjectId(productId)],
              },
            },
          },
        },
      },
    ]);
    const onePrice = price[0].orderItems[0].total;
    const ReOrder = await OrderModel.updateOne(
      {
        _id: orderId,
        "orderItems.product": productId,
      },
      {
        $set: {
          "orderItems.$.active": true,
        },
        $inc: { totalPrice: onePrice },
      }
    );
    res.json({ response: true });
  } catch (err) {
    console.log(err.message);
  }
};

// AdminSide:::::::::
const order = async (req, res) => {
  const order = await OrderModel.find({});
  res.render("admin/orders", { order });
};

const deliveryStatus = async (req, res) => {
  const orderId = req.body.Id;
  const status = req.body.Value;
  await OrderModel.updateOne(
    { _id: orderId },
    {
      $set: {
        deliveryStatus: status,
      },
    }
  );
  res.json({ response: true, status: status });
};

export {
  myOrders,
  orderPlace,
  singleOrder,
  deleteOrderItem,
  reorder,
  order,
  deliveryStatus,
};
