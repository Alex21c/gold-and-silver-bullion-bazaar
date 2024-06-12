import mongoose from "mongoose";
const sellerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false, default: "" },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: false, default: "SELLER" },
});

const SellerModel = mongoose.model("seller", sellerSchema);
export default SellerModel;
