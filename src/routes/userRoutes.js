import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
// import authenticateToken from "../middlewares/authenticateToken.js";
import { listarUsuarios } from "../controllers/listarUsuariosController.js";

const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
// router.get("/", authenticateToken, getUsers);
// router.get("/:id", authenticateToken, getUserById);
// router.patch("/:id", authenticateToken, updateUser);
// router.delete("/:id", authenticateToken, deleteUser);

router.get("/listar", listarUsuarios);

export default router;
