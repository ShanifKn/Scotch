import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const orderSchema = new Schema({
  Firstname: {
    type: String,
    trim: true,
  },
  Lastname: {
    type: String,
    trim: true,
  },
  Address: [
    {
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
  Status: {
    type: String,
    required: true,
  },
});
