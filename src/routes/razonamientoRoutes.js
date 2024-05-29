import { Router } from "express";

import {
  razonamientoBasico,
  razonamientoAvanzado,
} from "../controllers/razonamientoController.js";

const router = Router();

router.get("/basico", razonamientoBasico);
router.get("/avanzado", razonamientoAvanzado);

export default router;
