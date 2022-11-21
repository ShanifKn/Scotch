import { bannerModel } from "../model/banner.js";
import { cartModel } from "../model/cart.js";
import { productModel } from "../model/product.js";

const index = async (req, res) => {
  res.locals.user = req.session.user;
  let user = req.session.user;
  let banner = bannerModel
    .find()
    .then((banner) => {
      let product = productModel
        .find()
        .limit(4)
        .then((product) => {
          let secondProduct = productModel
            .find()
            .skip(4)
            .then((secondProduct) => {
              res.render("user/index", {
                banner,
                product,
                secondProduct,
                user,
              });
            });
        });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const cart = async (req, res) => {
  res.locals.user = req.session.user;
  try {
    const userId = req.session.user._id;
    const cartProduct = await cartModel
      .findOne({ user: userId })
      .populate("cart.product");
    res.render("user/cart", { cartProduct });
  } catch (err) {
    console.log(err.message);
  }
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

export { Signup, validation, Sample, login, index, cart, checkout, contact };
