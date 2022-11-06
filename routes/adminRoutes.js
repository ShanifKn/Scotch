import express from "express";
import {
  login,
  dashboard,
  userView,
  userBlock,
  unBlock,
} from "../controllers/adminControllers.js";

const router = express.Router();

router.get("/", dashboard);

router.get("/login", login);

router.get("/table", userView);

router.get("/userblock/:id", userBlock);

router.get("/unBlock/:id", unBlock);

export default router;
