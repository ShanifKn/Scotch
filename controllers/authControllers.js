import { UserModel } from "../model/User.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const { sign, verify } = Jwt;

const register = async (req, res) => {
  const UserDetails = req.body;
  UserDetails.Password = await bcrypt.hash(UserDetails.Password, 10);
  UserModel.create(UserDetails)
    .then((UserModel) => {
      const token = Jwt.sign(
        { userId: UserModel._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "10h",
        }
      );
      res.cookie("Jwt", token, { httpOnly: true });
      res.redirect("/otp");
    })
    .catch((err) => {
      if (err.code === 11000) {
        req.flash("Email", "Email already exist!");
        res.redirect("/signup");
      }
    });
};

const Signin = (req, res) => {
  UserModel.findOne({ Email: req.body.Email })
    .then((UserModel) => {
      if (!UserModel) {
        req.flash("Msg", "Invalid Email!");
        res.redirect("/login");
      } else if (!bcrypt.compareSync(req.body.Password, UserModel.Password)) {
        req.flash("Msg", "Incorrect Password!");
        res.redirect("/login");
      } else {
        const token = Jwt.sign(
          { userId: UserModel._id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "10h",
          }
        );
        res.cookie("Jwt", token, { httpOnly: true });
        res.redirect("/user/dashboard");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export { register, Signin };
