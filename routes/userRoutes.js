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
  cart,
  userProfile,
  resetPassword,
  setPassword,
  otpVerifiy,
  changepassword,
  error,
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
import { deliveryAddress, updateProfile } from "../controllers/userProfile.js";
import {
  billingAddress,
  checkout,
  editAddress,
  onlinePayment,
  orderPlaced,
  shippingAddress,
  updateDefault,
  updateEditAddress,
  updateNil,
  verfiyPayment,
} from "../controllers/checkout.js";
import {
  deleteOrderItem,
  myOrders,
  orderPlace,
  reorder,
  singleOrder,
} from "../controllers/orders.js";
import { discountAdded } from "../controllers/coupon.js";

// get request;;;;;;;;;;;;;;
router.get("/", index);
router.get("/product", product);
router.get("/productdetail/:id", productdetail);
router.get("/cart", verifyToken, cart);
router.get("/checkout", verifyToken, checkout);
router.get("/contact", contact);
router.get("/signup", Signup);
router.get("/login", login);
router.get("/otp", validation);
router.get("/resendOtp", verifyToken, Resend);
router.get("/Userlogout", userLogout);
router.get("/userCategory", verifyToken, categoryMap);
router.get("/wishlist", verifyToken, wishlist);
router.get("/profile", verifyToken, userProfile);
router.get("/editAddress", verifyToken, editAddress);
router.get("/myorders", verifyToken, myOrders);
router.get("/orderPlaced", verifyToken, orderPlace);
router.get("/singleOrder/:id", singleOrder);

// post request::::::
router.post("/signup", register);
router.post("/Userlogin", Signin);
router.post("/otp", otpVerfication);
router.post("/addToCart", verifyToken, addToWishlist);
router.post("/addCart", verifyToken, addtoCart);
router.post("/updateprofile", verifyToken, updateProfile);
router.post("/deliveryAddress", verifyToken, deliveryAddress);
router.post("/updateEditAddress", verifyToken, updateEditAddress);
router.post("/order", verifyToken, orderPlaced);
router.post("/onlineOrder", verifyToken, onlinePayment);
router.post("/verfiyPayment", verifyToken, verfiyPayment);
router.post("/resetPassword", verifyToken, verifyToken, resetPassword);
router.post("/otpVerif", verifyToken, otpVerifiy);
// delete request::::::::::::
router.delete("/deleteCartProduct", verifyToken, deleteCartProduct);
router.delete("/deletewishlist", verifyToken, deleteProductwishlist);
router.delete("/deleteOrderItem", verifyToken, deleteOrderItem);

// patch request::::::::::::
router.patch("/quantityDec", verifyToken, quantityDec);
router.patch("/quantityInc", verifyToken, quantityInc);
router.patch("/updateDefault", verifyToken, updateDefault);
router.patch("/updateAdd", verifyToken, updateNil);
router.patch("/billingAddress", verifyToken, billingAddress);
router.patch("/shippingAddress", verifyToken, shippingAddress);
router.patch("/reorder", verifyToken, reorder);
router.patch("/discount", verifyToken, discountAdded);
router.patch("/setPassword", verifyToken, setPassword);
router.patch("/ChangePassword", verifyToken, changepassword);

// Error request::::::::::::
router.get("/error", error);

export default router;
