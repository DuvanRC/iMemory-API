import { Router } from "express";
import {
  agregarJuegoRazonamiento,
  agregarRazonamientoBasicoSumas,
  agregarRazonamientoBasicoRestas,
  agregarRazonamientoAvanzadoSumas,
  agregarRazonamientoAvanzadoRestas,
  agregarRazonamientoAvanzadoMultiplicacion,
} from "../controllers/agregarRespuesta.js";

import {
  razonamientoBasico,
  razonamientoAvanzado,
} from "../controllers/razonamientoController.js";

const router = Router();

router.get("/add", agregarJuegoRazonamiento);
router.post(
  "/agregar-razonamiento-basico-sumas",
  agregarRazonamientoBasicoSumas
);
router.post(
  "/agregar-razonamiento-basico-restas",
  agregarRazonamientoBasicoRestas
);
router.post(
  "/agregar-razonamiento-avanzado-sumas",
  agregarRazonamientoAvanzadoSumas
);
router.post(
  "/agregar-razonamiento-avanzado-restas",
  agregarRazonamientoAvanzadoRestas
);
router.post(
  "/agregar-razonamiento-avanzado-multiplicacion",
  agregarRazonamientoAvanzadoMultiplicacion
);
router.get("/basico", razonamientoBasico);
router.get("/avanzado", razonamientoAvanzado);

export default router;
