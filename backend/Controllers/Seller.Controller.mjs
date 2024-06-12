import SellerModel from "../Models/SellerModel.mjs";
import helperFxns from "../Utils/helperFxns.mjs";
import CustomError from "../Utils/CustomError.mjs";
const registerNewSeller = async (req, res, next) => {
  try {
    // Safeguard if seller already exist exit
    const seller = await SellerModel.findOne({ email: req.body.email });
    if (seller) {
      next(new CustomError(200, "Seller already exist!"));
      return;
    }

    // encrypt the password
    req.body.password = await helperFxns.genPasswordHash(req.body.password);
    req.body.role = "SELLER";

    // creating new doc
    const doc = new SellerModel(req.body);
    doc.save();

    res.status(201).json({
      success: true,
      message: "Seller Account Created Successfully!",
      token: helperFxns.genJwtToken(doc),
    });
  } catch (error) {
    next(new CustomError(500, "Failed to Register User, " + error.message));
  }
};

const login = async (req, res, next) => {
  try {
    // validate
    const seller = await SellerModel.findOne({ email: req.body.email });
    if (
      !seller ||
      !(await helperFxns.isPasswordValid(req.body.password, seller.password))
    ) {
      next(new CustomError(200, "Invalid Credentials!"));
      return;
    }
    // return token

    res.json({
      success: true,
      Authorization: helperFxns.genJwtToken(seller),
    });
  } catch (error) {
    next(new CustomError(500, "Authentication failed, " + error.message));
  }
};

const SellerController = {
  registerNewSeller,
  login,
};

export default SellerController;
