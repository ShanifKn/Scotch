import express from "express";
const router = express.Router();

router.get("/error", (req, res) => {
  res.render("admin/404");
});
export default router;
