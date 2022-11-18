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
  contact,
  checkout,
  cart,
} from "../controllers/userControllers.js";
import { product, productdetail } from "../controllers/productController.js";

// get request6;;;;;;;;;;;;;;
router.get("/", index);
router.get("/product", product);
router.get("/productdetail/:id", productdetail);

router.get("/cart", cart);
router.get("/checkout", checkout);
router.get("/contact", contact);
router.get("/signup", Signup);
router.get("/login", login);
router.get("/otp", verifyToken, validation);
router.get("/resendOtp", verifyToken, Resend);
router.get("/Userlogout", userLogout);
router.get("/wishlist", (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/wishList");
});

// post request::::::
router.post("/signup", register);
router.post("/Userlogin", Signin);
router.post("/otp", otpVerfication);

export default router;
