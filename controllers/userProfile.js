import { UserModel } from "../model/User.js";

const updateProfile = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const user = await UserModel.findOne({ _id: userId });
    //     const Email = user.Email;
    //     const Name = user.Name;
    //     const Phone = user.Phone;
    const { firstname, lastname, address, city, state, pincode } = req.body;

    const updateUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          Firstname: firstname,
          Lastname: lastname,
          "Address.address": address,
          "Address.city": city,
          "Address.state": state,
          "Address.pincode": pincode,
        },
      }
    );
    console.log("sucessfully");
  } catch (err) {
    console.log(err.message);
  }
};

export { updateProfile };
