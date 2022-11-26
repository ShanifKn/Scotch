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
  userProfile,
} from "../controllers/userControllers.js";
import { product, productdetail } from "../controllers/productController.js";
import { categoryMap } from "../controllers/categoryController.js";
import {
  addtoCart,
  addToWishlist,
  deleteCartProduct,
  deleteProductwishlist,
  quantityDec,
  quantityInc,
  wishlist,
} from "../controllers/cartControllers.js";
import { updateProfile } from "../controllers/userProfile.js";

// get request;;;;;;;;;;;;;;
router.get("/", index);
router.get("/product", product);
router.get("/productdetail/:id", productdetail);
router.get("/cart", verifyToken, cart);
router.get("/checkout", checkout);
router.get("/contact", contact);
router.get("/signup", Signup);
router.get("/login", login);
router.get("/otp", verifyToken, validation);
router.get("/resendOtp", verifyToken, Resend);
router.get("/Userlogout", userLogout);
router.get("/userCategory", categoryMap);
router.get("/wishlist", verifyToken, wishlist);
router.get("/profile", userProfile);

router.get("/orders", (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/orders");
});

// post request::::::
router.post("/signup", register);
router.post("/Userlogin", Signin);
router.post("/otp", otpVerfication);
router.post("/addToCart", addToWishlist);
router.post("/addCart", addtoCart);
router.post("/updateprofile", updateProfile);
// delete request::::::::::::

router.delete("/deleteCartProduct", deleteCartProduct);
router.delete("/deletewishlist", deleteProductwishlist);
router.patch("/quantityDec", quantityDec);
router.patch("/quantityInc", quantityInc);

// error
router.get("/error", (req, res) => {
  res.render("admin/404");
});
export default router;
