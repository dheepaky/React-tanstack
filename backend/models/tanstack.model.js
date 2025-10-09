import mongoose from "mongoose";

const TanstackSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);
const TanstackModel = mongoose.model("Tanstack", TanstackSchema);

export default TanstackModel;
