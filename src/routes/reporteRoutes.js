import { Router } from "express";
import {
  guardarRazonamientoBasico,
  guardarRazonamientoAvanzado,
  generarReporte,
  generarReporteSemanal,
} from "../controllers/reporteController.js";

const router = Router();

router.post("/guardar-razonamiento-basico", guardarRazonamientoBasico);
router.post("/guardar-razonamiento-avanzado", guardarRazonamientoAvanzado);
router.post("/generar-reporte", generarReporte);
router.get("/semanal", generarReporteSemanal);

export default router;
