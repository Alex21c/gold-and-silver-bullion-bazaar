import ProductController from "../Controllers/Product.Controller.mjs";
import e from "express";
import passport from "../PassportJS/passportConfig.mjs";
import CustomError from "../Utils/CustomError.mjs";
import { configDotenv } from "dotenv";
import uploadCB from "../Multer/multer-config.mjs";

const ProductRouter = e.Router();

ProductRouter.post(
  "/add-new-product",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    uploadCB(req, res, (err) => {
      if (err) {
        if (err.message === "Unexpected field") {
          err.message = `Max. of #${process.env.MAX_ALLOWED_PRIMARY_IMAGES} primaryImage and #${process.env.MAX_ALLOWED_SUPPORTING_IMAGES} supporting Images are allowed!`;
        }
        next(new CustomError(400, err.message));
      } else {
        next();
      }
    });

    // next();
  },
  ProductController.addNewProduct
);

ProductRouter.post(
  "/remove-a-product/:productID",
  passport.authenticate("jwt", { session: false }),
  ProductController.removeAProduct
);
export default ProductRouter;
