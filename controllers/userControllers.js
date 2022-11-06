const Signup = (req, res) => {
  res.render("user/signup", { expressFlash: req.flash("Email") });
};

const login = (req, res) => {
  res.render("user/login", { expressFlash: req.flash("Msg") });
};

const otpVerfication = (req, res) => {
  res.render("user/otp");
};

const Sample = (req, res) => {
  res.render("user/Smaple");
};

export { Signup, otpVerfication, Sample, login };
