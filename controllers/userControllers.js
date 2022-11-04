const Signup = (req, res) => {
  res.render("user/signup");
};

const login = (req, res) => {
  res.render("user/login");
};

const otpVerfication = (req, res) => {
  res.render("user/otp");
};

export { Signup, login, otpVerfication };
