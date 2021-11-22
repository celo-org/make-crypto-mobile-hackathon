import { Router } from "express";
import { pix } from "../controllers/pixController";

const pixRoutes = Router();

pixRoutes.post('/pix', pix);

export { pixRoutes };


// lllllll
