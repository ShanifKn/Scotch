import { s3Upload } from "../database/multerS3.js";
import { bannerModel } from "../model/banner.js";
import { OrderModel } from "../model/order.js";
import { subBannerModel } from "../model/subBanner.js";
import { UserModel } from "../model/User.js";
import { couponModel } from "../model/coupon.js";
import { productModel } from "../model/product.js";
import { categoryModel } from "../model/category.js";
import Jwt from "jsonwebtoken";

let style = "bg-blue-500/13";

const dashboard = async (req, res) => {
  try {
    // Dashboard Title:::::::
    const totalSales = await OrderModel.aggregate([
      { $match: { deliveryStatus: "Delivered" } },
      {
        $group: { _id: "", totalPrice: { $sum: "$totalPrice" } },
      },
      { $project: { _id: 0, totalPrice: "$totalPrice" } },
    ]);
    let totalSalesAmount;
    if (totalSales.length == 0) {
      totalSalesAmount = 0;
    } else {
      totalSalesAmount = Math.round(totalSales[0].totalPrice);
    }

    const order = await couponModel.find().count();
    const product = await productModel.find().count();
    const user = await UserModel.find().count();
    // Dashboard table:::::::;
    const productList = await productModel.find().limit(4);
    const category = await categoryModel.find();
    const orderList = await OrderModel.find();
    res.render("admin/dashboard", {
      totalSalesAmount,
      user,
      category,
      order,
      orderList,
      product,
      productList,
      Dashboard: style,
      expressFlash: req.flash("Msg"),
    });
  } catch (err) {
    res.redirect("/admin/error404");
  }
};

const login = (req, res) => {
  res.render("admin/login", { expressFlash: req.flash("Msg") });
};

const userView = async (req, res) => {
  let user = await UserModel.find({})
    .then((user) => {
      res.render("admin/userlist", { user, User: style });
    })
    .catch((err) => {
      if (err) {
        res.redirect("/admin/error404");
      }
    });
};

// Banner::::::::::::::::::::::::::::::::::::::::
const bannerList = (req, res) => {
  try {
    let banner = bannerModel.find().then(async (banner) => {
      let subbanner = await subBannerModel.find();
      res.render("admin/viewBanner", {
        banner,
        subbanner,
        Banner: style,
        expressFlash: req.flash("Msg"),
      });
    });
  } catch (err) {
    res.redirect("/admin/error404");
  }
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
    res.redirect("/admin/error404");
  }
};

const editBanner = async (req, res) => {
  try {
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
        res.redirect("/admin/error404");
      }
    }
  } catch (err) {
    res.redirect("/admin/error404");
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
    const newBanner = new subBannerModel({
      Title: req.body.Category,
      Image: result.Location,
    });
    newBanner.save().then(() => {
      req.flash("Msg", "New Category has been Added");
      res.redirect("/admin/bannerlist");
    });
  } catch (err) {
    res.redirect("/admin/error404");
  }
};
const deletesubBanner = async (req, res) => {
  try {
    const id = req.body.id;
    await subBannerModel.findByIdAndDelete(id).then(() => {
      res.json({ response: true });
    });
  } catch (err) {
    res.redirect("/admin/error404");
  }
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
      res.redirect("/admin/error404");
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
  try {
    const user = req.params.id;
    await UserModel.findByIdAndUpdate(user, {
      Active: true,
    });
    res.redirect("/admin/user");
  } catch (err) {
    res.redirect("/admin/error404");
  }
};

const unBlock = async (req, res) => {
  try {
    const user = req.params.id;
    await UserModel.findByIdAndUpdate(user, {
      Active: false,
    });
    res.redirect("/admin/user");
  } catch (err) {
    res.redirect("/admin/error404");
  }
};

const salesReport = async (req, res) => {
  try {
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
    res.render("admin/salereport", { saleReport, SalesReport: style });
  } catch (err) {
    res.redirect("/admin/error404");
  }
};

const error404 = (req, res) => {
  res.render("admin/error404");
};

export {
  login,
  dashboard,
  userView,
  userBlock,
  unBlock,
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
  error404,
};
