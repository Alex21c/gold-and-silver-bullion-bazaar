import SellerController from "../Controllers/Seller.Controller.mjs";
import e from "express";

const SellerRouter = e.Router();

SellerRouter.post("/register", SellerController.registerNewSeller);
SellerRouter.post("/login", SellerController.login);

export default SellerRouter;
