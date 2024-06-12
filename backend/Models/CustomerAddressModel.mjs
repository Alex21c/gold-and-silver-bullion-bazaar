import mongoose from "mongoose";
const customerAddressSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    FlatOrHouseNoOrBuildingOrApartment: { type: String, required: true },
    AreaOrStreetOrSector: { type: String, required: true },
    Landmark: { type: String, required: false },
    city: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    customer: { type: mongoose.Types.ObjectId, ref: "customer" },
  },
  { timestamps: true }
);

const customerAddressModel = mongoose.model(
  "customers-address",
  customerAddressSchema
);
export default customerAddressModel;
