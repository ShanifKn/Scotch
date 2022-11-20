import { s3Upload } from "../database/multerS3.js";
import { bannerModel } from "../model/banner.js";
import { UserModel } from "../model/User.js";
let style = "bg-blue-500/13";

const dashboard = (req, res) => {
  res.render("admin/dashboard", {
    Dashboard: style,
    expressFlash: req.flash("Msg"),
  });
};

const login = (req, res) => {
  res.render("admin/login", { expressFlash: req.flash("Msg") });
};

const adminProfile = (req, res) => {
  res.render("admin/profile");
};

const userView = async (req, res) => {
  let user = await UserModel.find({})
    .then((user) => {
      res.render("admin/userlist", { user, User: style });
    })
    .catch((err) => {
      if (err) {
        console.log(err.message);
      }
    });
};

// Banner::::::::::::::::::::::::::::::::::::::::
const bannerList = (req, res) => {
  let banner = bannerModel.find().then((banner) => {
    res.render("admin/viewBanner", {
      banner,
      Banner: style,
      expressFlash: req.flash("Msg"),
    });
  });
};

const banner = (req, res) => {
  res.render("admin/banner");
};

const addBanner = async (req, res) => {
  const { Category, Title, Message } = req.body;
  const file = req.file;
  try {
    const result = await s3Upload(file);
    const newBanner = new bannerModel({
      Category: Category,
      Title: Title,
      Message: Message,
      Image: result.Location,
    });
    newBanner.save().then(() => {
      req.flash("Msg", "New Category has been Added");
      res.redirect("/admin/bannerlist");
    });
  } catch (err) {
    console.log(err.message);
  }
};

const editBanner = async (req, res) => {
  const id = req.params.id;
  const { Category, Title, Message } = req.body;
  const Image = req.file;
  if (!Image) {
    const updateBanner = {
      Category: Category,
      Title: Title,
      Message: Message,
    };
    await bannerModel
      .findByIdAndUpdate(id, updateBanner)
      .then(() => {
        req.flash("Msg", "Banner update");
        res.redirect("/admin/bannerlist");
      })
      .catch((err) => {
        req.flash("Msg", `${err.message}`);
        res.redirect("/admin/bannerlist");
      });
  } else {
    try {
      const result = await s3Upload(Image);
      const updateBanner = {
        Category: Category,
        Title: Title,
        Message: Message,
        Image: result.Location,
      };
      await bannerModel.findByIdAndUpdate(id, updateBanner).then(() => {
        req.flash("Msg", "Banner update");
        res.redirect("/admin/bannerlist");
      });
    } catch (err) {
      console.log(err.message);
    }
  }
};
const deleteBanner = async (req, res) => {
  const id = req.body.id;
  await bannerModel.findByIdAndDelete(id).then(() => {
    res.json({ response: true });
  });
};

// User Block::::::::::::::::::::::::::::::::::::::::
const userBlock = async (req, res) => {
  const user = req.params.id;
  await UserModel.findByIdAndUpdate(user, {
    Active: true,
  });
  res.redirect("/admin/user");
};

const unBlock = async (req, res) => {
  const user = req.params.id;
  await UserModel.findByIdAndUpdate(user, {
    Active: false,
  });
  res.redirect("/admin/user");
};

export {
  login,
  dashboard,
  userView,
  userBlock,
  unBlock,
  adminProfile,
  banner,
  addBanner,
  bannerList,
  editBanner,
  deleteBanner,
};
