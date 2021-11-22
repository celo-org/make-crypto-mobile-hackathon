import { Router } from "express";
import { register, login, moeda } from "../controllers/authController";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/moeda", moeda);

export { authRoutes };
