import mongoose from "mongoose";
import Categorey from "./CategoreyModel.js";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
      required: true,
    },
    categorey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Categorey,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("products", ProductSchema);
export default ProductModel;
