import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Phone: {
      type: Number,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Active: {
      type: Boolean,
      default: false,
    },
    refreshToken: String,
  },
  { collection: "users", timestamps: true }
);

const UserModel = model("users", UserSchema);

export { UserModel };
