import { UserModel } from "../model/User.js";
import Jwt from "jsonwebtoken";

const updateProfile = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      const user = await UserModel.findOne({ _id: userId });
      const Email = user.Email;
      const Phone = user.Phone;
      const { Firstname, Lastname, address, city, state, pincode } = req.body;
      const updateNew = [
        {
          Firstname: Firstname,
          Lastname: Lastname,
          address: address,
          city: city,
          state: state,
          pincode: pincode,
          email: Email,
          phone: Phone,
        },
      ];
      const updateUser = await UserModel.updateOne(
        { _id: userId },
        {
          $set: {
            Address: updateNew,
          },
        }
      );
      console.log("sucessfully");
      res.redirect("/profile");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const deliveryAddress = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;

      const updateUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            DeliveryAddress: req.body,
          },
        }
      );
      console.log("sucessfully");
      res.redirect("/checkout");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err.message);
  }
};

export { updateProfile, deliveryAddress };
