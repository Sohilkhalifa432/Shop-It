import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],

    payments: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("orders", OrderSchema);
export default orderModel;
