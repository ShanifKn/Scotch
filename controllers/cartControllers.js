import { wishlistModel } from "../model/wishlist.js";

const wishlist = (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/wishList");
};

const addToCart = async (req, res) => {
  const productId = req.body.id;
  console.log(productId);
  const userId = req.session.user;
  try {
    let user = await wishlistModel.findOne({ userId });
    if (!user) {
      req.flash("Msg", "you need to LogIn");
      res.redirect("/login");
    } else {
      let wishlist = await wishlistModel.findOne({ userId, productId });
      if (!wishlist) {
        console.log("hello");
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
