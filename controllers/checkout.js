import mongoose from "mongoose";
import { cartModel } from "../model/cart.js";
import { UserModel } from "../model/User.js";

const checkout = async (req, res) => {
  try {
    res.locals.user = req.session.user;
    const userId = req.session.user._id;

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
  } catch (err) {
    console.log(err.message);
  }
};

const updateDefault = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const id = req.body.id;
    console.log(id);
    console.log(userId);
    const user = await UserModel.updateOne(
      { _id: userId, "DeliveryAddress._id": id },
      {
        $set: { "DeliveryAddress.$.Default": true },
      }
    );
    res.json({ response: true });
  } catch (err) {}
};

const updateNil = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const id = req.body.id;
    await UserModel.updateOne(
      { _id: userId, "DeliveryAddress._id": id },
      {
        $set: { "DeliveryAddress.$.Default": false },
      }
    );
    res.json({ response: true });
  } catch (err) {
    console.log(err.message);
  }
};

const billingAddress = async (req, res) => {
  try {
    const userId = req.session.user._id;
    await UserModel.updateOne(
      { _id: userId },
      { $set: { "Address.Default": true } }
    );
    res.json({ response: true });
  } catch (err) {
    console.log(err.message);
  }
};

const shippingAddress = async (req, res) => {
  try {
    const userId = req.session.user._id;
    await UserModel.updateOne(
      { _id: userId },
      { $set: { "Address.Default": false } }
    );
    res.json({ response: true });
  } catch (err) {
    console.log(err.message);
  }
};

const editAddress = async (req, res) => {
  try {
    const userId = req.session.user._id;
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
  } catch (err) {
    console.log(err.message);
  }
};

const updateEditAddress = async (req, res) => {
  const userId = req.session.user._id;
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
};

export {
  checkout,
  updateDefault,
  updateNil,
  billingAddress,
  shippingAddress,
  editAddress,
  updateEditAddress,
};
