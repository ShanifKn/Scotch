import { categoryModel } from "../model/category.js";

const addCategory = async (req, res) => {
  const categoryName = req.body.Category_name;
  console.log(categoryName);
  const image = req.files.Image;
  const newCategory = new categoryModel({
    Name: categoryName,
  });
  newCategory.save().then((category) => {
    image.mv("./public/admin/images/" + category._id + ".jpg", (err) => {
      if (err) {
        console.log(err);
      } else {
        // let alert;
        // res.json({ alert: true });
        req.flash("Msg", "New Category has been Added");
        res.redirect("/admin/add-product");
      }
    });
  });
};

export { addCategory };
