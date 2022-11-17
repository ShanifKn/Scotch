import { s3Upload } from "../database/multerS3.js";
import { categoryModel } from "../model/category.js";

let style = "bg-blue-500/13";

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
      console.log(err.message);
    });
};

const editCategory = async (req, res) => {
  const id = req.params.id;
  const img = req.file;
  const category = {
    categoryName: req.body.CategoryName,
  };
  console.log(req.file);

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

export { addCategory, Category, editCategory };
