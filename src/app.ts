import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import session from "express-session";
import nocache from "nocache";

import connectDB from "./config/db";
const app = express();
connectDB();

app.use(nocache());

app.use(
  session({
    secret: "somesecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(morgan("dev"));
// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files for serving compiled TypeScript
app.use(express.static(path.join(__dirname, "../dist/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

import userRoute from "./routes/userRoutes";
import adminRoute from "./routes/adminRoutes";

app.use("/", userRoute);
app.use("/admin", adminRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
