import { UserModel } from "../model/User.js";
import { adminModel } from "../model/admin.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { sendSms, verifySms } from "../Verification/twilio.js";
let PhoneNo;
const { sign, verify } = Jwt;

// User Authentication
const register = async (req, res) => {
  const email = req.body.Email;
  const phone = req.body.Phone;
  // """"""""""""""""""""""""""""""""""""""
  req.session.newUser = req.body;
  // ''""""""""""""""""""""""""""""""""""""""""
  UserModel.findOne({ Email: email }).then((user) => {
    if (user) {
      console.log("user already exists");
      req.flash("Msg", "Email already exist!");
      res.redirect("/signup");
    } else {
      sendSms(phone);
      res.render("user/otp");
    }
  });
};

const otpVerfication = (req, res) => {
  const otp = req.body.OTP;
  const email = req.session.newUser.Email;
  const password = req.session.newUser.Password;
  const name = req.session.newUser.Name;
  const phone = req.session.newUser.Phone;
  verifySms(phone, otp).then((verification_check) => {
    if (verification_check.status === "approved") {
      userRegistration(email, name, phone, password).then((token) => {
        res.cookie("Jwt", token, { httpOnly: true });
        res.redirect("/login");
      });
    } else {
      req.flash("Msg", "Invalid OTP!");
      res.redirect("/otp");
    }
  });
};

const userRegistration = async (email, name, phone, password) => {
  let hasPassword = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    UserModel.create({
      Email: email,
      Name: name,
      Phone: phone,
      Password: hasPassword,
    })
      .then((UserModel) => {
        const token = Jwt.sign(
          { userId: UserModel._id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "10h",
          }
        );
        resolve(token);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

// User Authorization
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

const adminAuth = (req, res) => {
  adminModel
    .findOne({ Email: req.body.Email })
    .then((adminModel) => {
      if (!adminModel) {
        req.flash("Msg", "Invalid Credential !");
        res.redirect("/admin/login");
      } else if (!bcrypt.compareSync(req.body.Password, adminModel.Password)) {
        req.flash("Msg", "Password Incorrect ! ");
        res.redirect("/admin/login");
      } else {
        const token = Jwt.sign(
          {
            userId: adminModel._id,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        res.cookie("Jwt", token, { httpOnly: true });
        res.redirect("/admin/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const adminLogout = (req, res) => {
  res.cookie("Jwt", "", { maxAge: 1 });
  res.redirect("/admin/login");
};

const userLogout = (req, res) => {
  res.cookie("Jwt", "", { maxAge: 1 });
  res.redirect("/login");
};

const Resend = (req, res) => {
  sendSms(PhoneNo);
  res.redirect("/otp");
};

export {
  register,
  Signin,
  adminAuth,
  adminLogout,
  otpVerfication,
  Resend,
  userLogout,
  PhoneNo,
};