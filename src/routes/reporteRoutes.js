import { Router } from "express";
import {
  guardarRazonamientoBasico,
  generarReporte,
} from "../controllers/reporteController.js";

const router = Router();

router.post("/guardar-razonamiento-basico", guardarRazonamientoBasico);
router.post("/generar-reporte", generarReporte);

export default router;
