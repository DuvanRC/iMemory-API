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
      if (data.email === process.env.MAIL || data.estado == 0) {
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

export async function eliminarUsuario(req, res) {
  try {
    const { correo } = req.body;
    if (!correo) {
      return res.status(400).json({ message: "Correo es requerido" });
    }

    const usersRef = db.collection("usuarios");
    const querySnapshot = await usersRef.where("email", "==", correo).get();

    if (querySnapshot.empty) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    querySnapshot.forEach(async (doc) => {
      await usersRef.doc(doc.id).update({ estado: 0 });
      console.log(doc.id);
    });

    res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del back usuariosController.js" });
  }
}
