import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      colors.cyan.underline(`MongoDB Connected: ${conn.connection.host}`)
    );
  } catch (error) {
    console.error(colors.red(`Error: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB; // const connectDB = async () => {\
