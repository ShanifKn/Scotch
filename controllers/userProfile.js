import { UserModel } from "../model/User.js";

const updateProfile = async (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      const user = await UserModel.findOne({ _id: userId });
      //     const Email = user.Email;
      //     const Name = user.Name;
      //     const Phone = user.Phone;
      const { firstname, lastname, address, city, state, pincode } = req.body;

      const updateUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            "Address.Default": false,
            "Address.Firstname": firstname,
            "Address.Lastname": lastname,
            "Address.address": address,
            "Address.city": city,
            "Address.state": state,
            "Address.pincode": pincode,
          },
        }
      );
      console.log("sucessfully");
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

      // const { firstname, lastname, address, city, state, pincode } = req.body;
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
