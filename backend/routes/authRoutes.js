import express from "express";
import { register, login, logout, getMe, refreshToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getMe);
router.get("/refresh", refreshToken);  // 👈 Added refresh route here

export default router;
