import { PhoneNo } from "./authControllers.js";

const index = (req, res) => {
  res.render("user/index");
};

const product = (req, res) => {
  res.render("user/shop");
};

const productdetail = (req, res) => {
  res.render("user/productdetail");
};

const cart = (req, res) => {
  res.render("user/cart");
};
const checkout = (req, res) => {
  res.render("user/checkout");
};
const contact = (req, res) => {
  res.render("user/contact");
};

const Signup = (req, res) => {
  res.render("user/signup", { expressFlash: req.flash("Msg") });
};

const login = (req, res) => {
  res.render("user/login", { expressFlash: req.flash("Msg") });
};

const validation = (req, res) => {
  res.render("user/otp", { PhoneNo, expressFlash: req.flash("Msg") });
};

const Sample = (req, res) => {
  res.render("user/Smaple");
};

export {
  Signup,
  validation,
  Sample,
  login,
  index,
  product,
  productdetail,
  cart,
  checkout,
  contact,
};
