import { Schema, model } from "mongoose";

const bannerSchema = new Schema({
  Title: {
    type: String,
  },

  Image: {
    type: String,
  },
});

const subBannerModel = model("subbanner", bannerSchema);

export { subBannerModel };
