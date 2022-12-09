import { s3Upload } from "../database/multerS3.js";
import { bannerModel } from "../model/banner.js";
import { OrderModel } from "../model/order.js";
import { subBannerModel } from "../model/subBanner.js";
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
  let banner = bannerModel.find().then(async (banner) => {
    let subbanner = await subBannerModel.find();
    res.render("admin/viewBanner", {
      banner,
      subbanner,
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

// subbanner:::::::::
const subbanner = (req, res) => {
  res.render("admin/subbanner");
};

const addSubBanner = async (req, res) => {
  const file = req.file;
  try {
    const result = await s3Upload(file);
    console.log(result);
    const newBanner = new subBannerModel({
      Title: req.body.Category,
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
const deletesubBanner = async (req, res) => {
  const id = req.body.id;
  await subBannerModel.findByIdAndDelete(id).then(() => {
    res.json({ response: true });
  });
};

const editSubBanner = async (req, res) => {
  const id = req.params.id;
  const Title = req.body.Title;
  const Image = req.file;
  if (!Image) {
    await subBannerModel
      .findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            Title: Title,
          },
        }
      )
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
        Title: Title,
        Image: result.Location,
      };
      await subBannerModel.findByIdAndUpdate(id, updateBanner).then(() => {
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

const salesReport = async (req, res) => {
  const todayDate = new Date();
  const DaysAgo = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);

  const saleReport = await OrderModel.aggregate([
    {
      $match: { createdAt: { $gte: DaysAgo } },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
        totalPrice: { $sum: "$totalPrice" },
        count: { $sum: 1 },
      },
    },
  ]);
  res.render("admin/salereport", { saleReport });
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
  subbanner,
  addSubBanner,
  deletesubBanner,
  editSubBanner,
  salesReport,
};
