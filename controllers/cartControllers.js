import { cartModel } from "../model/cart.js";
import { wishlistModel } from "../model/wishlist.js";
import { productModel } from "../model/product.js";
import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

const wishlist = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      res.locals.user = userId;
      const wishlist = await wishlistModel
        .findOne({ user: userId })
        .populate("wishlist.product");
      res.render("user/wishList", { wishlist });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    req.flash("Msg", " login for access");
    res.redirect("/login");
  }
};

const addToWishlist = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      const productId = req.body.id;
      let user = await wishlistModel.findOne({ user: userId });
      if (!user) {
        const newWishList = new wishlistModel({
          user: userId,
          wishlist: [{ product: productId }],
        });
        newWishList.save();
      } else {
        let wishlist = await wishlistModel.findOne({
          user: userId,
          "wishlist.product": productId,
        });
        if (!wishlist) {
          let productArray = { product: productId };
          await wishlistModel
            .findOneAndUpdate(
              { user: userId },
              { $push: { wishlist: productArray } }
            )
            .then(() => {
              res.json({ response: true });
            });
        } else {
          res.json({ response: false });
        }
      }
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    res.redirect("/error");
    console.log(err.message);
  }
};
// delete from wishlist
const deleteProductwishlist = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;

      const productId = req.body.id;

      const wishlistDelete = await wishlistModel
        .updateOne(
          {
            user: userId,
          },
          { $pull: { wishlist: { product: productId } } }
        )
        .then(() => {
          res.json({ response: true });
        });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    res.redirect("/error");
    console.log(err.message);
  }
};

// cart::::::::::::::::::::::::
const addtoCart = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      const productId = req.body.id;

      const product = await productModel.findOne({ _id: productId });
      const productPrice = product.Price.Offer_price;
      await wishlistModel.updateOne(
        { user: userId },
        { $pull: { wishlist: { product: productId } } }
      );
      let user = await cartModel.findOne({ user: userId });
      if (user == null) {
        let newCart = new cartModel({
          user: userId,
          cart: [{ product: productId, total: productPrice }],
          subtotal: productPrice,
        });
        newCart.save().then(() => {
          res.json({ response: true });
        });
      } else {
        let cartProduct = await cartModel.findOne({
          user: userId,
          "cart.product": productId,
        });
        if (cartProduct) {
          await cartModel.findOneAndUpdate(
            {
              user: userId,
              "cart.product": productId,
            },
            {
              $inc: {
                "cart.$.quantity": 1,
                "cart.$.total": productPrice,
                subtotal: productPrice,
              },
            }
          );
          res.json({ response: true });
        } else {
          let cartArray = { product: productId, total: productPrice };
          await cartModel
            .findOneAndUpdate(
              { user: userId },
              { $push: { cart: cartArray }, $inc: { subtotal: productPrice } }
            )
            .then(() => {
              res.json({ response: true });
            });
        }
      }
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    res.redirect("/error");
    console.log(err.message);
  }
};
// remove from cart::::::::
const deleteCartProduct = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      const productId = req.body.id;

      const productPrice = await cartModel.findOne({
        user: userId,
        "cart.product": productId,
      });
      const subtotalPrice = productPrice.cart[0].total;
      let deleteProduct = await cartModel
        .updateOne(
          { user: userId },
          {
            $pull: { cart: { product: productId } },
            $inc: { subtotal: -subtotalPrice },
          }
        )
        .then((deleteProduct) => {
          res.json({ response: true });
        });
    } else {
      res.redirect("/login");
    }
  } catch {
    res.redirect("/error");
    console.log(err.message);
  }
};

const quantityDec = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      const productId = req.body.id;
      const quantityLimit = req.body.quantity;
      const product = await productModel.findOne({ _id: productId });
      const productPrice = product.Price.Offer_price;
      let updateQuantity = await cartModel.findOneAndUpdate(
        { user: userId, "cart.product": productId },
        {
          $inc: {
            "cart.$.quantity": -1,
            "cart.$.total": -productPrice,
            subtotal: -productPrice,
          },
        }
      );
      const quantity = await cartModel
        .aggregate([
          {
            $match: {
              user: mongoose.Types.ObjectId(userId),
            },
          },
          {
            $project: {
              subtotal: 1,
              cart: {
                $filter: {
                  input: "$cart",
                  cond: {
                    $eq: ["$$this.product", mongoose.Types.ObjectId(productId)],
                  },
                },
              },
            },
          },
        ])
        .then((quantity) => {
          const total = quantity[0].cart[0].total;
          const subtotal = quantity[0].subtotal;
          const quan = quantity[0].cart[0].quantity;
          res.json({
            response: true,
            total: total,
            subtotal: subtotal,
            quantity: quan,
          });
        });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.error(err);
    res.redirect("/error");
  }
};

const quantityInc = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      const productId = req.body.id;

      const product = await productModel.findOne({ _id: productId });
      const productPrice = product.Price.Offer_price;
      await cartModel.findOneAndUpdate(
        { user: userId, "cart.product": productId },
        {
          $inc: {
            "cart.$.quantity": 1,
            "cart.$.total": productPrice,
            subtotal: productPrice,
          },
        }
      );
      const quantity = await cartModel
        .aggregate([
          {
            $match: {
              user: mongoose.Types.ObjectId(userId),
            },
          },
          {
            $project: {
              subtotal: 1,
              cart: {
                $filter: {
                  input: "$cart",
                  cond: {
                    $eq: ["$$this.product", mongoose.Types.ObjectId(productId)],
                  },
                },
              },
            },
          },
        ])
        .then((quantity) => {
          const total = quantity[0].cart[0].total;
          const subtotal = quantity[0].subtotal;
          const quan = quantity[0].cart[0].quantity;
          res.json({
            response: true,
            total: total,
            subtotal: subtotal,
            quantity: quan,
          });
        });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err.message);
  }
};

export {
  wishlist,
  addToWishlist,
  addtoCart,
  deleteCartProduct,
  quantityDec,
  quantityInc,
  deleteProductwishlist,
};
