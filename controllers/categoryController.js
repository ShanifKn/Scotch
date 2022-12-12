import { response } from "express";
import { s3Upload } from "../database/multerS3.js";
import { categoryModel } from "../model/category.js";
import { productModel } from "../model/product.js";

const style = "bg-blue-500/13";

const addCategory = async (req, res) => {
  const CategoryName = req.body.Category_name;
  const file = req.file;
  const result = await s3Upload(file);
  const newCategory = new categoryModel({
    categoryName: CategoryName,
    categoryImage: result.Location,
  });
  newCategory.save().then((category) => {
    req.flash("Msg", "New Category has been Added");
    res.redirect("/admin/add-product");
  });
};

const Category = async (req, res) => {
  const category = await categoryModel
    .find()
    .then((category) => {
      res.render("admin/category", { category, Category: style });
    })
    .catch((err) => {
      res.redirect("/admin/error404");
    });
};

const editCategory = async (req, res) => {
  const id = req.params.id;
  const img = req.file;
  const category = {
    categoryName: req.body.CategoryName,
  };
  if (img !== undefined) {
    const result = await s3Upload(img);
    category.categoryImage = result.Location;
  }
  categoryModel
    .findByIdAndUpdate(id, category)
    .then((category) => {
      req.flash("Msg", "New Category has been Added");
      res.redirect("/admin/category");
    })
    .catch((error) => {
      req.flash("Msg", `${error.message}`);
      res.redirect("/admin/category");
    });
};

const categoryMap = (req, res) => {
  const id = req.query.id;
  let categoryProduct = productModel
    .find({ Category: id })
    .then((categoryProduct) => {
      res.json({ product: categoryProduct, user: req.session.user });
    });
};

// admin Side delet category

const deleteCategory = async (req, res) => {
  try {
    const id = req.body.id;
    const usedProduct = await productModel.findOne({ Category: id });
    if (!usedProduct) {
      await categoryModel.findOneAndDelete({ Category: id });
      res.json({ response: false });
    } else {
      res.json({ response: true });
    }
  } catch (err) {
    res.redirect("/admin/error404");
  }
};

export { addCategory, Category, editCategory, categoryMap, deleteCategory };
