import express from "express";

import {
  loginController,
  registerController,
  testController,
  forgotPasswordController,
  UpdateProfileController,
} from "../controller/authController.js";
import { requireSignin } from "../middlewares/authMiddleware.js";

import { isAdmin } from "../middlewares/authMiddleware.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
router.use(express.json());
router.post("/register", registerController);
router.post("/login", loginController);

router.get("/test", requireSignin, isAdmin, testController);
router.post("/forgot-password", forgotPasswordController);
// dashboard route
router.get("/dashboard", requireSignin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

router.get("/admin", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

// update user profile\

router.put("/update-profile", requireSignin, UpdateProfileController);
export default router;
