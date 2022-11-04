import express from "express";
const router = express.Router();
import {
  Signup,
  login,
  otpVerfication,
} from "../controllers/userControllers.js";

router.get("/signup", Signup);

router.get("/login", login);

router.get("/otp", otpVerfication);

export default router;
