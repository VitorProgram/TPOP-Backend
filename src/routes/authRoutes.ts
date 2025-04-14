import { Router } from "express";
import { deleteUser, login, register } from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.delete("/delete", deleteUser);

export default authRoutes;
