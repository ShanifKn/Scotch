import { UserModel } from "../model/User.js";
import { adminModel } from "../model/admin.js";
import Jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.Jwt;
  if (!token) {
    req.flash("Msg", "LogIn with  Credential");
    res.redirect("/login");
  } else {
    const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.userId;
    const user = await UserModel.findById(userId);
    next();
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.Jwt;
    if (!token) {
      req.flash("Msg", "LogIn with  Credential");
      res.redirect("/admin/login");
    } else {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      const user = await adminModel.findById(userId);
      next();
    }
  } catch (err) {
    req.flash("Msg", "Session Expired");
    res.redirect("/admin/login");
  }
};
export { verifyToken, verifyAdmin };
