import { categoryModel } from "../model/category.js";
import { productModel } from "../model/product.js";

const viewProduct = (req, res) => {
  res.render("admin/product", {});
};

const addProduct = async (req, res) => {
  const category = await categoryModel
    .find({})
    .catch((err) => console.log(err));
  res.render("admin/add-product", { category, expressFlash: req.flash("Msg") });
};

const add_Product = (req, res) => {
  console.log(req.body);

  const newProduct = new productModel({
    Product_title: req.body.ProductName,
    Product_des: req.body.ProductDes,
    Price: {
      Retail_price: req.body.RetailPrice,
      Offer_price: req.body.OfferPrice,
    },
    Product_quantity: req.body.ProductQuantity,
    Category: req.body.ProductCategory,
    color: req.body.ProductColor,
    Size: req.body.ProductSize,
    Product_info: req.body.ProductInfo,
    Product_material: req.body.ProductMaterial,
  });
  newProduct
    .save()
    .then((product) => {
      console.log(product);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { viewProduct, addProduct, add_Product };
