import express, { Router } from "express";
import {
  login,
  dashboard,
  userView,
  userBlock,
  unBlock,
  banner,
  addBanner,
  bannerList,
  editBanner,
  deleteBanner,
  subbanner,
  addSubBanner,
  deletesubBanner,
  editSubBanner,
  salesReport,
  error404,
} from "../controllers/adminControllers.js";

import {
  viewProduct,
  addProduct,
  add_Product,
  deleteProduct,
  editProduct,
  updateProduct,
} from "../controllers/productController.js";
import { adminAuth, adminLogout } from "../controllers/authControllers.js";
import { verifyAdmin } from "../middleware/authVerification.js";
import {
  addCategory,
  Category,
  deleteCategory,
  editCategory,
} from "../controllers/categoryController.js";
import { upload } from "../middleware/muter.js";
import { deliveryStatus, order } from "../controllers/orders.js";
import { addCoupon, coupon } from "../controllers/coupon.js";

const router = express.Router();

// get;;;;;;;
router.get("/", verifyAdmin, dashboard);
router.get("/login", login);
router.get("/logout", verifyAdmin, adminLogout);
router.get("/product", verifyAdmin, viewProduct);
router.get("/user", verifyAdmin, userView);
router.get("/userblock/:id", verifyAdmin, userBlock);
router.get("/unBlock/:id", verifyAdmin, unBlock);
router.get("/add-product", verifyAdmin, addProduct);
router.get("/editProduct/:id", verifyAdmin, editProduct);
router.get("/category", verifyAdmin, Category);
router.get("/banner", verifyAdmin, banner);
router.get("/bannerlist", verifyAdmin, bannerList);
router.get("/order", verifyAdmin, order);
router.get("/subbanner", verifyAdmin, subbanner);
router.get("/coupon", verifyAdmin, coupon);
router.get("/salesreport", salesReport);
router.get("/error404", error404);

// post::::::::
router.post("/Userlogin", adminAuth);
router.post("/addCategory", verifyAdmin, upload.single("Image"), addCategory);
router.post("/addCategory", verifyAdmin, addCategory);
router.post("/add", verifyAdmin, upload.array("img", 4), add_Product);
router.post("/edit/:id", verifyAdmin, upload.array("img", 4), updateProduct);
router.post(
  "/editcategory/:id",
  verifyAdmin,
  upload.single("img"),
  editCategory
);
router.post("/addBannar", verifyAdmin, upload.single("Image"), addBanner);
router.post("/editBanner/:id", verifyAdmin, upload.single("Image"), editBanner);
router.post("/addsubannar", verifyAdmin, upload.single("Image"), addSubBanner);
router.post(
  "/editSubBanner/:id",
  verifyAdmin,
  upload.single("Image"),
  editSubBanner
);
router.post("/addcoupon", verifyAdmin, addCoupon);

// Delete & patch
router.delete("/deleteproduct", verifyAdmin, deleteProduct);
router.delete("/deleteBanner", verifyAdmin, deleteBanner);
router.delete("/deletesubBanner", verifyAdmin, deletesubBanner);
router.patch("/deliveryStatus", verifyAdmin, deliveryStatus);
router.delete("/deleteCategory", verifyAdmin, deleteCategory);

export default router;
