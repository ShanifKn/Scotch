import express from "express";
import { login, dashboard } from "../controllers/adminControllers.js";
const router = express.Router();

router.get("/", dashboard);
router.get("/login", login);

export default router;
