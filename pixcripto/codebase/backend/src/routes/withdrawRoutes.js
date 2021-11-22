import { Router } from "express";
import { withdraw } from "../controllers/withdrawController";

const withdrawRoutes = Router();

withdrawRoutes.post('/withdraw', withdraw);

export { withdrawRoutes };