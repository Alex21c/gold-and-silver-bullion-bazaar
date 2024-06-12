import ProductController from "../Controllers/Product.Controller.mjs";
import e from "express";
const ProductRouter = e.Router();

ProductRouter.post("/add-new-product", ProductController.addNewProduct);
export default ProductRouter;
