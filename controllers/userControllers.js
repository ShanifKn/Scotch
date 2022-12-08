import { bannerModel } from "../model/banner.js";
import { cartModel } from "../model/cart.js";
import { productModel } from "../model/product.js";
import Jwt from "jsonwebtoken";
import { subBannerModel } from "../model/subBanner.js";
import { couponModel } from "../model/coupon.js";
import { UserModel } from "../model/User.js";
import { sendSms, verifySms } from "../Verification/twilio.js";
import bcrypt from "bcrypt";

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
      const coupon = await couponModel.findOne({ "user.id": userId });
      if (!coupon) {
        const Coupon = await couponModel.find({});
        res.render("user/cart", { cartProduct, Coupon });
      } else {
        const Coupon = await couponModel.find({
          "user.id": { $ne: userId },
        });
        res.render("user/cart", { cartProduct, Coupon });
      }
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    req.flash("Msg", " login for access");
    console.log(err.message);
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

const resetPassword = async (req, res) => {
  try {
    const email = req.body.Email;
    const user = await UserModel.findOne({ Email: email });
    const phoneNo = user.Phone;
    sendSms(phoneNo);
    res.json({ response: true });
  } catch (err) {
    res.redirect("/error");
  }
};

const otpVerifiy = async (req, res) => {
  try {
    const code = req.body.Code;
    const email = req.body.Email;
    const user = await UserModel.findOne({ Email: email });
    const phoneNo = user.Phone;
    verifySms(phoneNo, code).then((verification_check) => {
      if (verification_check.status === "approved") {
        res.json({ response: true });
      }
    });
  } catch (err) {
    console.log(err.message);
    res.redirect("/error");
  }
};

const setPassword = async (req, res) => {
  try {
    const pass = req.body.Pass;
    const email = req.body.Email;
    let hasPassword = await bcrypt.hash(pass, 10);
    await UserModel.updateOne({ Email: email }, { Password: hasPassword });
    res.json({ response: true });
  } catch (err) {
    res.redirect("/error");
  }
};

export {
  Signup,
  validation,
  Sample,
  login,
  index,
  cart,
  contact,
  userProfile,
  resetPassword,
  setPassword,
  otpVerifiy,
};
