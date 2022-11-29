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

    Address: [
      {
        Default: {
          type: Boolean,
          default: false,
        },
        Firstname: {
          type: String,
          trim: true,
        },
        Lastname: {
          type: String,
          trim: true,
        },
        address: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
        pincode: {
          type: Number,
        },
      },
    ],
    DeliveryAddress: [
      {
        Default: {
          type: Boolean,
          default: false,
        },
        Firstname: {
          type: String,
          trim: true,
        },
        Lastname: {
          type: String,
          trim: true,
        },
        address: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
        pincode: {
          type: Number,
        },
        email: {
          type: String,
          trim: true,
        },
        phone: {
          type: Number,
          trim: true,
        },
      },
    ],

    refreshToken: String,
  },
  { collection: "users", timestamps: true }
);

const UserModel = model("users", UserSchema);

export { UserModel };
