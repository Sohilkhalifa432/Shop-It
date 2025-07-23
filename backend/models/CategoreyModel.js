import mongoose from "mongoose";

const CategoreySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const CategoreyModel = mongoose.model("Categorey", CategoreySchema);
export default CategoreyModel;
