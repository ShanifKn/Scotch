import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import logger from "morgan";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import adminRoutes from "../Scotch/routes/adminRoutes.js";
import userRoutes from "../Scotch/routes/userRoutes.js";
import mongoose from "mongoose";
import connectDB from "./database/db.js";
import session from "express-session";
import flash from "express-flash";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const __dirname = path.resolve();

// body-Parser Json
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// morgan: https
// app.use(logger("dev"));

// Connect to Mongoose
connectDB();

// Session:::
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
// middleware to handle urlencoded from data
app.use(bodyParser.urlencoded({ extended: false }));

// server static files
app.use(express.static(path.join(__dirname, "public")));

// view engine configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// express_ejs_layouts
app.use(expressEjsLayouts);
app.set("layout", "./layout/layout");

// flash-message
app.use(flash());

// Routes
app.use("/", userRoutes);
app.use("/admin", adminRoutes);
app.use((req, res) => {
  res.redirect("/error");
});

// Server configuration
const port = process.env.PORT;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
