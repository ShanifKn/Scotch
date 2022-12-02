import mongoose from "mongoose";
import { cartModel } from "../model/cart.js";
import { OrderModel } from "../model/order.js";
import { UserModel } from "../model/User.js";
import Jwt from "jsonwebtoken";
import { instance, verfiyRazorPay } from "../database/paymeny.js";

const checkout = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      res.locals.user = userId;
      const Address = await UserModel.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(userId),
          },
        },
        {
          $project: {
            Address: 1,
            DeliveryAddress: 1,
            Email: 1,
            Phone: 1,
          },
        },
      ]);
      const cartSaved = await cartModel
        .findOne({
          user: userId,
        })
        .populate("cart.product");

      res.render("user/checkout", {
        Address,
        cartSaved,
        expressFlash: req.flash("Msg"),
      });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const updateDefault = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      const id = req.body.id;
      await UserModel.updateOne(
        { _id: userId },
        { $set: { "Address.Default": false } }
      );
      await UserModel.updateMany(
        { _id: userId, "DeliveryAddress.Default": true },
        {
          $set: {
            "DeliveryAddress.$[elem].Default": false,
          },
        },
        { arrayFilters: [{ "elem.Default": true }], multi: true }
      );

      const user = await UserModel.updateOne(
        { _id: userId, "DeliveryAddress._id": id },
        {
          $set: { "DeliveryAddress.$.Default": true },
        }
      );
      res.json({ response: true });
    } else {
      res.redirect("/login");
    }
  } catch (err) {}
};

const updateNil = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      const id = req.body.id;
      await UserModel.updateOne(
        { _id: userId, "DeliveryAddress._id": id },
        {
          $set: { "DeliveryAddress.$.Default": false },
        }
      ).then(() => {
        res.json({ response: true });
      });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const billingAddress = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;

      await UserModel.updateMany(
        { _id: userId, "DeliveryAddress.Default": true },
        {
          $set: {
            "DeliveryAddress.$[elem].Default": false,
          },
        },
        { arrayFilters: [{ "elem.Default": true }], multi: true }
      );
      await UserModel.updateOne(
        { _id: userId },
        { $set: { "Address.Default": true } }
      );
      res.json({ response: true });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const shippingAddress = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;

      await UserModel.updateOne(
        { _id: userId },
        { $set: { "Address.Default": false } }
      );
      res.json({ response: true });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const editAddress = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;

      const id = req.query.id;

      const address = await UserModel.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(userId),
          },
        },
        {
          $project: {
            DeliveryAddress: {
              $filter: {
                input: "$DeliveryAddress",
                cond: {
                  $eq: ["$$this._id", mongoose.Types.ObjectId(id)],
                },
              },
            },
          },
        },
      ]);
      res.json({ Address: address, response: true });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const updateEditAddress = async (req, res) => {
  const token = req.cookies.Jwt;
  if (token) {
    const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.userId;

    const { firstname, lastname, address, city, state, pincode, phone, email } =
      req.body;

    const id = req.body.id;
    await UserModel.updateOne(
      { _id: userId, "DeliveryAddress._id": id },
      {
        $set: {
          "DeliveryAddress.$.Firstname": firstname,
          "DeliveryAddress.$.Lastname": lastname,
          "DeliveryAddress.$.address": address,
          "DeliveryAddress.$.city": city,
          "DeliveryAddress.$.state": state,
          "DeliveryAddress.$.pincode": pincode,
          "DeliveryAddress.$.phone": phone,
          "DeliveryAddress.$.email": email,
        },
      }
    );
    console.log("success");
    req.flash("Msg", " Address Updated ");
    res.redirect("/checkout");
  }
};

// Order COD
const orderPlaced = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;

      const billingAddress = await UserModel.findOne(
        {
          _id: userId,
          "Address.Default": true,
        },
        { DeliveryAddress: 0 }
      );
      if (!billingAddress) {
        const deliveryAddress = await UserModel.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(userId),
            },
          },
          {
            $project: {
              _id: 0,
              DeliveryAddress: {
                $filter: {
                  input: "$DeliveryAddress",
                  cond: {
                    $eq: ["$$this.Default", true],
                  },
                },
              },
            },
          },
        ]);
        const billingAddress = await UserModel.findOne(
          {
            _id: userId,
            "Address.Default": false,
          },
          { _id: 0, DeliveryAddress: 0, "Address._id": 0 }
        );
        const cart = await cartModel.findOne(
          { user: userId },
          { cart: 1, subtotal: 1 }
        );
        const address = deliveryAddress[0].DeliveryAddress[0];
        const newOrder = new OrderModel({
          User: userId,
          orderItems: cart.cart,
          totalPrice: cart.subtotal,
          billingAddress: billingAddress.Address,
          deliveryAddress: address,
          paymentDetails: "COD",
          orderStatus: true,
          deliveryStatus: "Pending",
        });
        await newOrder.save();
        await cartModel.updateOne(
          { user: userId },
          {
            $set: { cart: [], subtotal: 0 },
          }
        );
        res.json({ response: true });
      } else {
        const cart = await cartModel.findOne(
          { user: userId },
          { cart: 1, subtotal: 1 }
        );
        const newOrder = new OrderModel({
          User: userId,
          orderItems: cart.cart,
          totalPrice: cart.subtotal,
          billingAddress: billingAddress.Address,
          deliveryAddress: billingAddress.Address,
          paymentDetails: "COD",
          orderStatus: true,
          deliveryStatus: "Pending",
        });
        await newOrder.save();
        await cartModel.updateOne(
          { user: userId },
          {
            $set: { cart: [], subtotal: 0 },
          }
        );
        res.json({ response: true });
      }
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    res.redirect("/error");
    console.log(err.message);
  }
};

const onlinePayment = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      const billingAddress = await UserModel.findOne(
        {
          _id: userId,
          "Address.Default": true,
        },
        { DeliveryAddress: 0 }
      );
      if (!billingAddress) {
        const deliveryAddress = await UserModel.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(userId),
            },
          },
          {
            $project: {
              _id: 0,
              DeliveryAddress: {
                $filter: {
                  input: "$DeliveryAddress",
                  cond: {
                    $eq: ["$$this.Default", true],
                  },
                },
              },
            },
          },
        ]);
        const billingAddress = await UserModel.findOne(
          {
            _id: userId,
            "Address.Default": false,
          },
          { _id: 0, DeliveryAddress: 0, "Address._id": 0 }
        );
        const cart = await cartModel.findOne(
          { user: userId },
          { cart: 1, subtotal: 1 }
        );
        const address = deliveryAddress[0].DeliveryAddress[0];
        const newOrder = new OrderModel({
          User: userId,
          orderItems: cart.cart,
          totalPrice: cart.subtotal,
          billingAddress: billingAddress.Address,
          deliveryAddress: address,
          paymentDetails: "ONLINE",
          orderStatus: false,
          deliveryStatus: "Pending",
        });
        await newOrder.save().then((order) => {
          instance.orders
            .create({
              amount: order.totalPrice * 100,
              currency: "INR",
              receipt: order.id,
            })
            .then(async (order) => {
              await cartModel.updateOne(
                { user: userId },
                {
                  $set: { cart: [], subtotal: 0 },
                }
              );
              res.json({ response: true, order: order });
            });
        });
      } else {
        const cart = await cartModel.findOne(
          { user: userId },
          { cart: 1, subtotal: 1 }
        );
        const newOrder = new OrderModel({
          User: userId,
          orderItems: cart.cart,
          totalPrice: cart.subtotal,
          billingAddress: billingAddress.Address,
          deliveryAddress: billingAddress.Address,
          paymentDetails: "ONLINE",
          orderStatus: false,
          deliveryStatus: "Pending",
        });
        await newOrder.save().then((order) => {
          instance.orders
            .create({
              amount: order.totalPrice * 100,
              currency: "INR",
              receipt: order.id,
            })
            .then(async (order) => {
              await cartModel.updateOne(
                { user: userId },
                {
                  $set: { cart: [], subtotal: 0 },
                }
              );
              res.json({ response: true, order: order });
            });
        });
      }
    }
  } catch (err) {
    console.log(err.messages);
    res.redirect("/error");
  }
};

const verfiyPayment = async (req, res) => {
  const response = req.body.response;
  const order = req.body.order;
  verfiyRazorPay(response, order)
    .then(async (id) => {
      const order = await OrderModel.updateOne(
        { _id: id },
        { $set: { orderStatus: true } }
      );
      res.json({ response: true });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export {
  checkout,
  updateDefault,
  updateNil,
  billingAddress,
  shippingAddress,
  editAddress,
  updateEditAddress,
  orderPlaced,
  onlinePayment,
  verfiyPayment,
};
