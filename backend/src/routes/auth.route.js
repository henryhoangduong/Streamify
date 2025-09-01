import { Router } from "express";
import {
  login,
  logout,
  signup,
  onboard,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

export const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", logout);

router.post("/onboarding", protectRoute, onboard);

router.get("/me", protectRoute, async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});
