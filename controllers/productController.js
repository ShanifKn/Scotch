const viewProduct = (req, res) => {
  res.render("admin/product");
};

const addProduct = (req, res) => {
  res.render("admin/add-product");
};

export { viewProduct, addProduct };
