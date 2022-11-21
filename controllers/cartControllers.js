import { cartModel } from "../model/cart.js";
import { wishlistModel } from "../model/wishlist.js";

const wishlist = async (req, res) => {
  res.locals.user = req.session.user;
  const userId = req.session.user._id;
  const wishlist = await wishlistModel
    .findOne({ user: userId })
    .populate("wishlist.product");
  res.render("user/wishList", wishlist);
};

const addToWishlist = async (req, res) => {
  const productId = req.body.id;
  const userId = req.session.user._id;
  try {
    let user = await wishlistModel.findOne({ userId });
    if (user == null) {
      const newWishList = new wishlistModel({
        user: userId,
        wishlist: [{ product: productId }],
      });
      newWishList.save().then(() => {
        console.log("you have successfully");
      });
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
        console.log("item already exists!");
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};
// cart::::::::::::::::::::::::
const addtoCart = async (req, res) => {
  const productId = req.body.id;
  const userId = req.session.user._id;
  try {
    let user = await cartModel.findOne({ userId });
    if (user == null) {
      let newCart = new cartModel({
        user: userId,
        cart: [{ product: productId }],
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
        await cartModel
          .findOneAndUpdate(
            {
              user: userId,
              "cart.product": productId,
            },
            { $inc: { "cart.$.quantity": 4 } }
          )
          .then(() => {
            res.json({ response: true });
          });
      } else {
        let cartArray = { product: productId };
        await cartModel
          .findOneAndUpdate({ user: userId }, { $push: { cart: cartArray } })
          .then(() => {
            res.json({ response: true });
          });
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};

export { wishlist, addToWishlist, addtoCart };
