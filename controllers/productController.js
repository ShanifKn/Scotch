import { categoryModel } from "../model/category.js";
import { productModel } from "../model/product.js";
import { s3DeleteMany, s3UploadMany } from "../database/multerS3.js";
import Jwt from "jsonwebtoken";

let style = "bg-blue-500/13";

const viewProduct = async (req, res) => {
  let product = await productModel
    .find({
      ProductDeleted: false,
    })
    .populate("Category")
    .lean()
    .then((product) => {
      res.render("admin/product", {
        product,
        Product: style,
        expressFlash: req.flash("Msg"),
      });
    })
    .catch((err) => {
      res.redirect("/admin/error404");
    });
};

const addProduct = async (req, res) => {
  try {
    const category = await categoryModel.find({}).then((category) => {
      res.render("admin/add-product", {
        category,
        expressFlash: req.flash("Msg"),
      });
    });
  } catch (err) {
    res.redirect("/error");
  }
};

const add_Product = async (req, res) => {
  try {
    const files = req.files;
    const result = await s3UploadMany(files);
    const newProduct = new productModel({
      Product_title: req.body.ProductName,
      Product_des: req.body.ProductDes,
      Price: {
        Retail_price: req.body.RetailPrice,
        Offer_price: req.body.OfferPrice,
      },
      Product_quantity: req.body.Product_quantity,
      Category: req.body.ProductCategory,
      color: req.body.ProductColor,
      Size: req.body.ProductSize,
      Product_info: req.body.ProductInfo,
      Product_material: req.body.ProductMaterial,
      images: result,
    });
    newProduct
      .save()
      .then(() => {
        req.flash("Msg", " New Product has Added");
        res.redirect("/admin/Product");
      })
      .catch((err) => {
        req.flash("Msg", `${err.message}`);
        res.redirect("/admin/add-product");
      });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: err,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.body.id;
    let response;
    const delProduct = await productModel
      .findByIdAndUpdate(id, {
        ProductDeleted: true,
      })
      .then(() => {
        res.json({ response: true });
      });
  } catch {}
};

const editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryModel.find({});
    productModel
      .findById(id)
      .populate("Category")
      .then((product) => {
        res.render("admin/edit-product", {
          product,
          category,
          expressFlash: req.flash("Msg"),
        });
      });
  } catch (err) {
    res.redirect("/admin/error404");
  }
};

const updateProduct = async (req, res) => {
  try {
  } catch (err) {
    res.redirect("/");
  }
  const id = req.params.id;
  const UpdatedProduct = {
    Product_title: req.body.ProductName,
    Product_des: req.body.ProductDes,
    Price: {
      Retail_price: req.body.RetailPrice,
      Offer_price: req.body.OfferPrice,
    },
    Product_quantity: req.body.Product_quantity,
    Category: req.body.ProductCategory,
    color: req.body.ProductColor,
    Size: req.body.ProductSize,
    Product_info: req.body.ProductInfo,
    Product_material: req.body.ProductMaterial,
  };
  const newImg = req.files;
  if (req.files.length) {
    const result = await s3UploadMany(newImg)
      .then((result) => {
        UpdatedProduct.images = result;
      })
      .catch((err) => {
        req.flash("Msg", `${err.message}`);
        res.redirect("/admin/edit-product");
      });
  }
  productModel
    .findByIdAndUpdate(id, UpdatedProduct)
    .then(() => {
      req.flash("Msg", "Product update");
      res.redirect("/admin/product");
    })
    .catch((err) => {
      req.flash("Msg", "Unable to update product!");
      res.redirect("admin/product");
    });
};

// User Side::::::::::::::::::::::::::::::::
const product = (req, res) => {
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      res.locals.user = userId;
      let product = productModel.find({}).then((product) => {
        categoryModel.find({}).then((category) => {
          res.locals.product = product;
          res.render("user/shop", { category });
        });
      });
    } else {
      res.locals.user = req.session.user;
      let product = productModel.find({}).then((product) => {
        categoryModel.find({}).then((category) => {
          res.locals.product = product;
          res.render("user/shop", { category });
        });
      });
    }
  } catch (err) {
    res.redirect("/error");
  }
};

const productdetail = async (req, res) => {
  const id = req.params.id;
  try {
    res.locals.user = req.session.user;
    let product = await productModel.findById(id).then((product) => {
      productModel
        .find({})
        .limit(4)
        .then((allProducts) => {
          res.render("user/product_detail", { product, allProducts });
        });
    });
  } catch (err) {
    res.redirect("/error");
  }
};

export {
  viewProduct,
  addProduct,
  add_Product,
  deleteProduct,
  editProduct,
  updateProduct,
  product,
  productdetail,
};
