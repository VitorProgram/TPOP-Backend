import { Router } from "express";
import { deleteUser, login, register } from "../controllers/authController";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.delete("/delete/:id", deleteUser);

export default authRoutes;
