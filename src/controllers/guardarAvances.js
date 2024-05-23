import { db } from "../firebase.js";

export async function guardarRazonamientoBasico(req, res) {
  const { correo, correctas, incorrectas, tiempo } = req.body;

  if (
    !correo ||
    correctas === undefined ||
    incorrectas === undefined ||
    tiempo === undefined
  ) {
    return res
      .status(400)
      .send(
        "Todos los campos son necesarios: correo, correctas, incorrectas, tiempo"
      );
  }

  try {
    const userSnapshot = await db
      .collection("usuarios")
      .where("email", "==", correo)
      .get();

    if (userSnapshot.empty) {
      return res.status(404).send("Usuario no encontrado");
    }

    let userId;
    userSnapshot.forEach((doc) => {
      userId = doc.id;
    });

    let fechaRegistro = new Date();

    const userRef = db.collection("usuarios").doc(userId);
    const statsRef = userRef.collection("test_stats").doc();
    await statsRef.set({
      correctas,
      incorrectas,
      tiempo,
      fechaRegistro,
    });

    res.status(200).send("Datos actualizados correctamente");
  } catch (error) {
    console.error("Error actualizando el usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
}
