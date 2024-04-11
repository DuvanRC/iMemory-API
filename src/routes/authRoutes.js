import { Router } from "express";
import {
  register,
  login,
  recoverPassword,
} from "../controllers/authController.js";

const router = Router();

// Rutas para registrarse e iniciar sesión
router.post("/register", register);
router.post("/login", login);
router.post("/recover-password", recoverPassword);

export default router;
