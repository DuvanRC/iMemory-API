import { Router } from "express";
import {
  register,
  login,
  recoverPassword,
  cambiarContrasenia,
} from "../controllers/authController.js";

const router = Router();

// Rutas para registrarse e iniciar sesión
router.post("/register", register);
router.post("/login", login);
router.post("/recover-password", recoverPassword);
router.post("/cambiar-contrasenia", cambiarContrasenia);

export default router;
