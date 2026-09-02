import express from "express";
import { getCurrentUser, Login, logOut } from "../controllers/auth.controller.js";
import protect from "../Middleware/auth.middleware.js";
const router = express.Router();
router.post("/login", Login);
router.post("/logout", logOut);
router.get("/me", protect, getCurrentUser);
export default router;