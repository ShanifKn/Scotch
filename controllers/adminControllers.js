import { UserModel } from "../model/User.js";

const dashboard = (req, res) => {
  res.render("admin/dashboard");
};

const login = (req, res) => {
  res.render("admin/login");
};

const userView = async (req, res) => {
  let user = await UserModel.find({});
  console.log(user);
  res.render("admin/userlist", { user });
};

const userBlock = async (req, res) => {
  await UserModel.findByIdAndUpdate(req.params.id, {
    Active: true,
  });
  res.redirect("/admin/table");
};

const unBlock = async (req, res) => {
  await UserModel.findByIdAndUpdate(req.params.id, {
    Active: false,
  });
  res.redirect("/admin/table");
};

export { login, dashboard, userView, userBlock, unBlock };
