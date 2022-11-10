import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
    trim: true,
    minlength: [6],
  },
});

const adminModel = model("admin", adminSchema);

export { adminModel };
