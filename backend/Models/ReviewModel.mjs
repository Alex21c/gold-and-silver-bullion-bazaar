import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: "customer" },
  },
  { timestamps: true }
);
const ReviewModel = mongoose.model("reviews", reviewSchema);
export default ReviewModel;
