import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/authVerification.js";
import {
  otpVerfication,
  register,
  Resend,
  Signin,
  userLogout,
} from "../controllers/authControllers.js";
import { validation, Signup, login } from "../controllers/userControllers.js";

router.get("/", (req, res) => {
  res.render("user/index");
});

router.get("/product", (req, res) => {
  res.render("user/shop");
});

router.get("/productdetail", (req, res) => {
  res.render("user/product_detail");
});

router.get("/cart", (req, res) => {
  res.render("user/cart");
});

router.get("/checkout", (req, res) => {
  res.render("user/checkout");
});

router.get("/contact", (req, res) => {
  res.render("user/contact");
});

router.get("/signup", Signup);

router.get("/login", login);

router.get("/otp", verifyToken, validation);

router.get("/resendOtp", verifyToken, Resend);

router.get("/logout", userLogout);

// post request::::::
router.post("/signup", register);
router.post("/Userlogin", Signin);
router.post("/otp", otpVerfication);

export default router;
