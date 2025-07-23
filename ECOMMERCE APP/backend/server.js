import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRouter from "./routes/authRouter.js";
import CategoreyRouter from "./routes/CategoreyRouter.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import cors from "cors";
import path from "path";

dotenv.config();
connectDB();

const app = express();
const __dirname = path.resolve(); 

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/Categorey", CategoreyRouter);
app.use("/api/v1/product", ProductRoutes);


export default app;
