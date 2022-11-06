import { UserModel } from "../model/User.js";
import Jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.Jwt;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.userId;
    const user = await UserModel.findById(userId);
    console.log(user);
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
  return next();
};

export { verifyToken };
