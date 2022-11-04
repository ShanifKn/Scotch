import express from "express";
import logger from "morgan";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import * as dotenv from "dotenv";
import adminRoutes from "../Scotch/routes/adminRoutes.js";
import userRoutes from "../Scotch/routes/userRoutes.js";

const app = express();
const __dirname = path.resolve();
app.use(logger("dev"));
dotenv.config();

// view engine configuration

app.use(expressEjsLayouts);
app.set("layout", "./layout/layout");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", userRoutes);
+app.use("/admin", adminRoutes);

// Server configuration
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server Running....");
});
