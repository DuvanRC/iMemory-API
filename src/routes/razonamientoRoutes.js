import { Router } from "express";
import {
  agregarJuegoRazonamiento,
  actualizarCampoRandom,
} from "../controllers/agregarRespuesta.js";

import {
  razonamientoFacil,
  razonamientoMedio,
} from "../controllers/razonamientoController.js";

const router = Router();

router.get("/add", agregarJuegoRazonamiento);
router.get("/actualizar-random", actualizarCampoRandom);
router.get("/facil", razonamientoFacil);
router.get("/medio", razonamientoMedio);

export default router;
