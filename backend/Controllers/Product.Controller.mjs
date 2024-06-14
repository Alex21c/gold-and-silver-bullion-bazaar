import ProductModel from "../Models/ProductModel.mjs";
import CustomError from "../Utils/CustomError.mjs";
import CloudinaryHelper from "../Utils/CloudinaryHelper.mjs";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

const addNewProduct = async (req, res, next) => {
  try {
    // Now i want to create a directory on cloudinary having same name as of doc id, and put it in all provided images

    // console.log(req.files);

    // appending additonal info
    req.body.seller = req.user._id;
    req.body.primaryImage = {
      public_id: "mlcToDoPublicID",
      url: "mlcToDoURL",
    };
    req.body.SupportingImages = {
      public_id: "mlcToDoPublicID",
      url: "mlcToDoURL",
    };
    // console.log(req.body);

    // console.log(req.files);

    // now creating a doc
    const productDoc = new ProductModel(req.body);

    // now i want to crate a directory in clodinary having name as _id of doc

    // console.log(productDoc);
    const objCloudinaryHelper = new CloudinaryHelper();

    // uploading the primary Image
    let response = await objCloudinaryHelper.uploadFile(
      req.files.primaryImage[0],
      productDoc._id
    );
    const imgData = {
      public_id: response.public_id,
      url: response.secure_url,
    };
    productDoc.primaryImage = imgData;

    // uploading the supporting images

    const uploadPromises = req.files.supportingImages.map(async (file) => {
      try {
        let response = await objCloudinaryHelper.uploadFile(
          file,
          productDoc._id
        );
        const imgData = {
          public_id: response.public_id,
          url: response.secure_url,
        };
        productDoc.supportingImages.push(imgData);
      } catch (error) {
        throw error;
      }
    });

    await Promise.all(uploadPromises);
    await productDoc.save();

    // sending response
    res.status(201).json({
      success: true,
      message: "Product added to Database Successfully!",
      productID: productDoc._id,
    });
  } catch (error) {
    next(new CustomError(500, "Failed to create product, " + error.message));
  }
};

const removeAProduct = async (req, res, next) => {
  try {
    // what is the product id, get it from params
    const { productID } = req.params;
    if (!productID) {
      next(new CustomError(400, "ProductID missing in params of request!"));
      return;
    }

    // is product ID valid?
    if (!mongoose.Types.ObjectId.isValid(productID)) {
      next(new CustomError(400, `ProductID (${productID}) is invalid!`));
      return;
    }
    // does it exist in DB
    const productDoc = await ProductModel.findById(productID);

    if (!productDoc) {
      next(new CustomError(404, `ProductID (${productID}) Not Found in DB!`));
      return;
    }

    // does it created by same seller
    if (req.user._id.toString() !== productDoc.seller.toString()) {
      next(
        new CustomError(
          401,
          `UnAuthorized, You are not allowed to Modify this product as it wasn't created by You!`
        )
      );
      return;
    }

    // first remove cloudinary images
    // trying to remove primary Image
    console.log(productDoc.primaryImage.get("public_id"));

    // objCloudinaryHelper.deleteFile()

    // then supporting images
    productDoc.supportingImages.map((imageData) => {
      const public_id = console.log(imageData);
    });

    // then remove the product

    // send response
    res.send("wait removing!");
  } catch (error) {
    throw error;
  }
};
const ProductController = { removeAProduct, addNewProduct };

export default ProductController;
