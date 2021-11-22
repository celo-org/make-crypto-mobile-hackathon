import { Router } from "express";
import { getUser } from "../controllers/userController";

const userRoutes = Router();

userRoutes.get("/user", getUser);

export { userRoutes };
