const index = (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/index");
};

const product = (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/shop");
};

const productdetail = (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/product_detail");
};

const cart = (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/cart");
};
const checkout = (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/checkout");
};
const contact = (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/contact");
};

const Signup = (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/signup", { expressFlash: req.flash("Msg") });
};

const login = (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/login", { expressFlash: req.flash("Msg") });
};

const validation = (req, res) => {
  const phone = req.session.newUser.Phone;
  res.render("user/otp", { phone, expressFlash: req.flash("Msg") });
};

const Sample = (req, res) => {
  res.render("user/Smaple");
};

export {
  Signup,
  validation,
  Sample,
  login,
  index,
  product,
  productdetail,
  cart,
  checkout,
  contact,
};
