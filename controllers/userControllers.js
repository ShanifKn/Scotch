import { PhoneNo } from "./authControllers.js";

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

export { Signup, validation, Sample, login };
