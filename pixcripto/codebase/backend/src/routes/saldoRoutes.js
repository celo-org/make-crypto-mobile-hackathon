import { Router } from "express";
import { getSaldo } from "../controllers/saldoController";

const saldoRoutes = Router();

saldoRoutes.get('/saldo', getSaldo);

export { saldoRoutes };
