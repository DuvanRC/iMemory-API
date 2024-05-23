import { db } from "../firebase.js";

export async function listarUsuarios(req, res) {
  try {
    const usersRef = db.collection("usuarios");
    const snapshot = await usersRef.get();

    if (snapshot.empty) {
      return res.status(403).json({ message: "No hay usuarios registrados" });
    }

    const usuarios = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.email === process.env.MAIL) {
        return;
      }
      usuarios.push({
        nombre: data.name + " " + data.lastName,
        correo: data.email,
      });
    });

    res.json(usuarios);
  } catch (error) {
    console.error("Error al buscar usuarios:", error);
    res
      .status(500)
      .json({ message: "Error interno del back listarUsuariosController.js" });
  }
}
