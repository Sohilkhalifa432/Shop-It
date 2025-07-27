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
const _dirname = path.resolve();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/Categorey", CategoreyRouter);
app.use("/api/v1/product", ProductRoutes);
app.get('/hello', (req, res) => {
  res.send("hello world");
});


app.listen(3000, () => {
  console.log(
    colors.green(
      `Server running on ${process.env.NODE_ENV} port http://localhost:3000`
    )
  );
});
