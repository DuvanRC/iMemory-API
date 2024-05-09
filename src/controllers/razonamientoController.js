import { db } from "../firebase.js";
import crypto from "crypto";

export async function razonamientoBasico(req, res) {
  try {
    const idsSnapshot = await db.collection("razonamiento_basico").get();
    const ids = idsSnapshot.docs.map((doc) => doc.id);
    const idsAleatorios = [];

    while (idsAleatorios.length < 10) {
      const randomIndex = Math.floor(Math.random() * ids.length);
      const randomId = ids[randomIndex];
      if (!idsAleatorios.includes(randomId)) {
        idsAleatorios.push(randomId);
      }
    }

    const datosAleatorios = [];

    for (const id of idsAleatorios) {
      const docRef = db.collection("razonamiento_basico").doc(id);
      const docSnapshot = await docRef.get();
      const datos = docSnapshot.data();
      datosAleatorios.push({
        id: id,
        nombre: datos.nombre,
        respuesta: datos.respuesta,
      });
    }

    res.json(datosAleatorios);

    // res.json(resultados);
  } catch (error) {
    console.error("Error al obtener datos aleatorios:", error);
    res.status(500).send("Error al obtener datos aleatorios");
  }
}

export async function razonamientoAvanzado(req, res) {
  try {
    const idsSnapshot = await db.collection("razonamiento_avanzado").get();
    const ids = idsSnapshot.docs.map((doc) => doc.id);
    const idsAleatorios = [];

    while (idsAleatorios.length < 10) {
      const randomIndex = Math.floor(Math.random() * ids.length);
      const randomId = ids[randomIndex];
      if (!idsAleatorios.includes(randomId)) {
        idsAleatorios.push(randomId);
      }
    }

    const datosAleatorios = [];

    for (const id of idsAleatorios) {
      const docRef = db.collection("razonamiento_avanzado").doc(id);
      const docSnapshot = await docRef.get();
      const datos = docSnapshot.data();
      datosAleatorios.push({
        id: id,
        nombre: datos.nombre,
        respuesta: datos.respuesta,
      });
    }

    res.json(datosAleatorios);

    // res.json(resultados);
  } catch (error) {
    console.error("Error al obtener datos aleatorios:", error);
    res.status(500).send("Error al obtener datos aleatorios");
  }
}
