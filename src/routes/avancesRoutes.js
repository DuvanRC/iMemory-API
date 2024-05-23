import { Router } from "express";
import { guardarRazonamientoBasico } from "../controllers/guardarAvances.js";

const router = Router();

router.post("/razonamiento-basico", guardarRazonamientoBasico);

export default router;
