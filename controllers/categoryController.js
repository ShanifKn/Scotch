import { s3Upload } from "../database/multerS3.js";
import { categoryModel } from "../model/category.js";

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

export { addCategory };
