import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { pixRoutes } from "./pixRoutes";
import { withdrawRoutes } from "./withdrawRoutes";
import { saldoRoutes } from "./saldoRoutes";
import { userRoutes } from "./userRoutes";

const routes = Router();

routes.use(authRoutes);
routes.use(pixRoutes);
routes.use(withdrawRoutes);
routes.use(saldoRoutes);
routes.use(userRoutes);

export { routes };
