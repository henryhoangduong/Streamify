import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

export const router = Router();

router.post("/signup", signup);

router.get("/login", login);

router.get("/logout", logout);
