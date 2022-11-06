import express from "express";
const router = express.Router();
import {
  Signup,
  otpVerfication,
  login,
  Sample,
} from "../controllers/userControllers.js";

import { register, Signin } from "../controllers/authControllers.js";

router.get("/signup", Signup);

router.post("/signup", register);

router.get("/login", login);

router.post("/Signin", Signin);

router.get("/otp", otpVerfication);

router.get("/Sample", Sample);

export default router;
