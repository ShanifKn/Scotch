import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    Email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Phone: {
      type: Number,
      required: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
      trim: true,
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
