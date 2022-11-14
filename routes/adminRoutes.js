import express, { Router } from "express";
import {
  login,
  dashboard,
  userView,
  userBlock,
  unBlock,
  adminProfile,
} from "../controllers/adminControllers.js";

import {
  viewProduct,
  addProduct,
  add_Product,
  deleteProduct,
  editProduct,
} from "../controllers/productController.js";
import { adminAuth, adminLogout } from "../controllers/authControllers.js";
import { verifyAdmin } from "../middleware/authVerification.js";
import { addCategory } from "../controllers/categoryController.js";
import { upload } from "../middleware/muter.js";

const router = express.Router();

// get;;;;;;;
router.get("/", dashboard);
router.get("/login", login);
router.get("/logout", adminLogout);
router.get("/product", viewProduct);
router.get("/profile", adminProfile);
router.get("/user", userView);
router.get("/userblock/:id", userBlock);
router.get("/unBlock/:id", unBlock);
router.get("/add-product", addProduct);

// post::::::::
router.post("/Userlogin", adminAuth);
router.post("/addCategory", upload.single("Image"), addCategory);
router.post("/addCategory", addCategory);
router.post("/add", upload.array("img", 4), add_Product);

// Delete & patch
router.delete("/deleteproduct", deleteProduct);
router.patch("/editProduct", editProduct);

export default router;
