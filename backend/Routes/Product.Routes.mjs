import ProductController from "../Controllers/Product.Controller.mjs";
import e from "express";
import passport from "../PassportJS/passportConfig.mjs";

const ProductRouter = e.Router();

ProductRouter.post(
  "/add-new-product",
  passport.authenticate("jwt", { session: false }),
  ProductController.addNewProduct
);
export default ProductRouter;
