import { bannerModel } from "../model/banner.js";
import { cartModel } from "../model/cart.js";
import { productModel } from "../model/product.js";
import Jwt from "jsonwebtoken";
import { subBannerModel } from "../model/subBanner.js";
import { couponModel } from "../model/coupon.js";

const index = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      res.locals.user = userId;
      let banner = bannerModel.find().then((banner) => {
        let product = productModel
          .find()
          .limit(4)
          .then((product) => {
            let secondProduct = productModel
              .find()
              .skip(4)
              .then(async (secondProduct) => {
                const subBanner = await subBannerModel.find();
                res.render("user/index", {
                  banner,
                  product,
                  secondProduct,
                  subBanner,
                });
              });
          });
      });
    } else {
      res.locals.user = req.session.user;
      let banner = bannerModel.find().then((banner) => {
        let product = productModel
          .find()
          .limit(4)
          .then((product) => {
            let secondProduct = productModel
              .find()
              .skip(4)
              .then(async (secondProduct) => {
                const subBanner = await subBannerModel.find();
                res.render("user/index", {
                  banner,
                  product,
                  secondProduct,
                  subBanner,
                });
              });
          });
      });
    }
  } catch (err) {
    console.log(err.message);
    res.redirect("/login");
  }
};

const cart = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      res.locals.user = userId;
      const cartProduct = await cartModel
        .findOne({ user: userId })
        .populate("cart.product");
      const coupon = await couponModel.findOne({ user: userId });
      if (!coupon) {
        const Coupon = await couponModel.find();
        res.render("user/cart", { cartProduct, Coupon });
      } else {
        const Coupon = await couponModel.find();
        res.render("user/cart", { cartProduct, Coupon });
      }
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    req.flash("Msg", " login for access");
    res.redirect("/login");
  }
};

const userProfile = (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/profile");
};

const contact = (req, res) => {
  res.locals.user = req.session.user;
};

const Signup = (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/signup", { expressFlash: req.flash("Msg") });
};

const login = (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/login", { expressFlash: req.flash("Msg") });
};

const validation = (req, res) => {
  const phone = req.session.newUser.Phone;
  res.render("user/otp", { phone, expressFlash: req.flash("Msg") });
};

const Sample = (req, res) => {
  res.render("user/Smaple");
};

export { Signup, validation, Sample, login, index, cart, contact, userProfile };
