import { Schema, model } from "mongoose";

const bannerSchema = new Schema({
  Category: {
    type: String,
    require: true,
  },
  Title: {
    type: String,
    require: true,
  },
  Message: {
    type: String,
    require: true,
  },
  Image: {
    type: String,
    require: true,
  },
});

const bannerModel = model("banner", bannerSchema);

export { bannerModel };
