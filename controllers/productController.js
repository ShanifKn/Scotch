import { categoryModel } from "../model/category.js";
import { productModel } from "../model/product.js";
import { s3UploadMany } from "../database/multerS3.js";

const viewProduct = async (req, res) => {
  let product = await productModel
    .find({
      // ProductDeleted: false,
    })
    .populate("Category")
    .lean()
    .then((product) => {
      res.render("admin/product", { product });
    })
    .catch((err) => {
      console.log(err);
    });
};

const addProduct = async (req, res) => {
  const category = await categoryModel
    .find({})
    .then((category) => {
      res.render("admin/add-product", {
        category,
        expressFlash: req.flash("Msg"),
      });
    })
    .catch((err) => console.log(err));
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
    newProduct.save().then(() => {
      res.redirect("/admin/Product");
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
    const id = req.body.id;
    const product = await productModel.findById(id);
    res.render("admin/edit-product", { product });
  } catch (err) {
    console.log(err);
  }
};

export { viewProduct, addProduct, add_Product, deleteProduct, editProduct };
