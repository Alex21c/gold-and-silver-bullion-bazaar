import mongoose from "mongoose";
const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: {
    type: mongoose.Types.ObjectId,
    ref: "customer-address",
    required: false,
  },
});

const CustomerModel = mongoose.model("customer", customerSchema);
export default CustomerModel;
