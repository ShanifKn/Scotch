import { wishlistModel } from "../model/wishlist.js";

const wishlist = async (req, res) => {
  res.locals.user = req.session.user;
  const userId = req.session.user._id;
  const wishlist = await wishlistModel
    .findOne({ user: userId })
    .populate("wishlist.product");
  res.render("user/wishList", wishlist);
};

const addToCart = async (req, res) => {
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

  //   if (user) {
  //     console.log("1");
  //     let wishList = await wishlistModel
  //       .findOne({
  //         user: userId,
  //         "wishlist.product": productId,
  //       })
  //       .lean();
  //     if (wishList) {
  //       console.log("2");
  //       req.flash("Msg", "Product already Exist");
  //       res.redirect("/wishlist");
  //     } else {
  //       console.log("3");
  //       let productArray = { product: productId };
  //       wishlistModel.findOneAndUpdate(
  //         { user: userId },
  //         { $push: { wishlist: productArray } }
  //       );
  //       req.flash("Msg", "Added to cart");
  //       res.redirect("/product");
  //     }
  //   } else {
  //     console.log("4");
  //     const Wishlist = new wishlistModel({
  //       user: userId,
  //       wishlist: [{ product: productId }],
  //     });
  //     Wishlist.save().then((wishList) => {
  //       console.log(wishList);
  //     });
  //   }
};

export { wishlist, addToCart };
