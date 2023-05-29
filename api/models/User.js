import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    admin: {
      type: Boolean,
      required: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);