import Router from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";
export const router = Router();

router.get("/token", protectRoute, getStreamToken);
