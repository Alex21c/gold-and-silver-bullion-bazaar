import e from "express";
import morgan from "morgan";
import "dotenv/config";
import SellerRouter from "./Routes/Seller.Routes.mjs";
import ProductRouter from "./Routes/Product.Routes.mjs";
import mongoose from "mongoose";
import passport from "./PassportJS/passportConfig.mjs";

const PORT = process.env.PORT || 4000;
const app = e();
// Req logging
app.use(morgan("dev"));

// Making connection with DB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connection Established with Database!");
  })
  .catch((err) => {
    console.log("Unable to connect to DB!");
    console.log("Exiting...");
    process.exit(1);
  });

// now using passport for jwt auth
app.use(passport.initialize());

// allow me to export json from body
app.use(e.json());

// Routes
app.use("/api/v1/seller", SellerRouter);
app.use("/api/v1/product", ProductRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error!",
  });
});

app.listen(PORT, () => {
  console.log(`SERVER is up and running at port ${PORT}`);
});
