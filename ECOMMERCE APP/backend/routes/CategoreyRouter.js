import express from "express";
import { requireSignin } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
import {
  categoeryFilter,
  CreateCategoreyController,
} from "../controller/CategoreyController.js";
import { UpdateCategorey } from "../controller/CategoreyController.js";
import { ReadAllCategorey } from "../controller/CategoreyController.js";
import { DeleteCategorey } from "../controller/CategoreyController.js";
const router = express.Router();

// create categorie
router.post(
  "/Create-Categorey",
  requireSignin,
  isAdmin,
  CreateCategoreyController
);

// update categoery
router.put("/Update-Categorey/:id", requireSignin, isAdmin, UpdateCategorey);

// getting one single categorey
router.get("/Categorey", requireSignin, ReadAllCategorey);

// delete all categories

router.delete("/Delete-Categorey/:id", requireSignin, isAdmin, DeleteCategorey);
export default router;

// checked catgorey

router.post("/filter-categorey", requireSignin, categoeryFilter);
