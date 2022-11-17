import { UserModel } from "../model/User.js";
let style = "bg-blue-500/13";

const dashboard = (req, res) => {
  res.render("admin/dashboard", { Dashboard: style });
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

export { login, dashboard, userView, userBlock, unBlock, adminProfile };
