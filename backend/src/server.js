import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { router as AuthRoutes } from "./routes/auth.route.js";
import { router as UserRoutes } from "./routes/user.route.js";
import { router as ChatRoutes } from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow frontend to send cookies
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/chat", ChatRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
