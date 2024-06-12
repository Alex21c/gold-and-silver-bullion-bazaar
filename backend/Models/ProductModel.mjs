import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    commodity: { type: String, required: true },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    currencySymbol: { type: String, required: true, default: "₹" },
    reviews: [
      { type: mongoose.Types.ObjectId, ref: "review", required: false },
    ],
    seller: { type: mongoose.Types.ObjectId, ref: "seller", required: true },
    images: [{ type: String, required: true }],
    imagesRootDir: { type: String, required: true },
    productDetails: { type: Map, of: String, required: true },
    aboutThisItem: [{ type: String, required: true }],
    productSpecifications: { type: Map, of: String, required: true },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("products", productSchema);
export default ProductModel;
