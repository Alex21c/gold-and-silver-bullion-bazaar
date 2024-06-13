import ProductModel from "../Models/ProductModel.mjs";
import CustomError from "../Utils/CustomError.mjs";
import CloudinaryHelper from "../Utils/CloudinaryHelper.mjs";
import { configDotenv } from "dotenv";

const addNewProduct = async (req, res, next) => {
  try {
    // Now i want to create a directory on cloudinary having same name as of doc id, and put it in all provided images

    // console.log(req.files);

    // appending additonal info
    req.body.seller = req.user;
    req.body.primaryImage = {
      public_id: "mlcToDoPublicID",
      url: "mlcToDoURL",
    };
    req.body.SupportingImages = {
      public_id: "mlcToDoPublicID",
      url: "mlcToDoURL",
    };
    // console.log(req.body);

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
    res.send("wait, adding new product!");
  } catch (error) {
    next(new CustomError(500, "Failed to create product, " + error.message));
  }
};
const ProductController = { addNewProduct };

export default ProductController;
