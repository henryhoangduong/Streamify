import Router from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getStreamToken } from "../controllers/chat.controller";
export const router = Router();

router.get("/token", protectRoute, getStreamToken);
