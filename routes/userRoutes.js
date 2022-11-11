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
import {
  validation,
  Signup,
  login,
  index,
  product,
  contact,
  checkout,
  cart,
  productdetail,
} from "../controllers/userControllers.js";




// get request6;;;;;;;;;;;;;;
router.get("/", index);
router.get("/product", product);
router.get("/productdetail", productdetail);
router.get("/cart", cart);
router.get("/checkout", checkout);
router.get("/contact", contact);
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
