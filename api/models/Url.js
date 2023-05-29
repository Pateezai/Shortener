import mongoose from "mongoose";
const UrlSchema = new mongoose.Schema(
  {
    original: {
      type: String,
      required: true,
    },
    custom: {
      type: String,
      required: false,
    },
    // generate: {
    //   type: String,
    //   required: false,
    // },
    shorturl: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Url", UrlSchema);