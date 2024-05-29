import { Router } from "express";
import {
  guardarRazonamientoBasico,
  guardarRazonamientoAvanzado,
  guardarMemoriaBasico,
  guardarMemoriaAvanzado,
  guardarLenguajeBasico,
  guardarLenguajeAvanzado,
  generarReporte,
  generarReporteSemanal,
} from "../controllers/reporteController.js";

const router = Router();

router.post("/guardar-razonamiento-basico", guardarRazonamientoBasico);
router.post("/guardar-razonamiento-avanzado", guardarRazonamientoAvanzado);
router.post("/guardar-memoria-basico", guardarMemoriaBasico);
router.post("/guardar-memoria-avanzado", guardarMemoriaAvanzado);
router.post("/guardar-lenguaje-basico", guardarLenguajeBasico);
router.post("/guardar-lenguaje-avanzado", guardarLenguajeAvanzado);
router.post("/generar-reporte", generarReporte);
router.get("/semanal", generarReporteSemanal);

export default router;
