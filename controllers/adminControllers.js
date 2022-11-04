const dashboard = (req, res) => {
  res.render("admin/dashboard");
};

const login = (req, res) => {
  res.render("admin/login");
};

export { login, dashboard };
