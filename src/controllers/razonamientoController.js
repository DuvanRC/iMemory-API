import db from "../firebase.js";
import crypto from "crypto";

export async function razonamientoFacil(req, res) {
  const coleccionRef = db.collection("razonamiento_facil");

  try {
    // Generar un número aleatorio criptográficamente seguro
    const randomBytes = crypto.randomBytes(4);
    const randomSeed = randomBytes.readUInt32BE(0, true) / 4294967295;

    // Obtener 10 juegos medio aletariamente
    const querySnapshot = await coleccionRef
      .orderBy("randomField")
      .startAt(randomSeed)
      .limit(10)
      .select("nombre", "respuesta")
      .get();

    const resultados = [];
    querySnapshot.forEach((doc) => {
      resultados.push(doc.data());
    });

    // console.log("Datos aleatorios:", resultados);
    res.json(resultados);
  } catch (error) {
    console.error("Error al obtener datos aleatorios:", error);
    res.status(500).send("Error al obtener datos aleatorios");
  }
}

export async function razonamientoMedio(req, res) {
  const coleccionRef = db.collection("razonamiento_medio");

  try {
    // Generar un número aleatorio criptográficamente seguro
    const randomBytes = crypto.randomBytes(4);
    const randomSeed = randomBytes.readUInt32BE(0, true) / 4294967295;

    // Obtener 10 juegos medio aletariamente
    const querySnapshot = await coleccionRef
      .orderBy("randomField")
      .startAt(randomSeed)
      .limit(10)
      .select("nombre", "respuesta")
      .get();

    const resultados = [];
    querySnapshot.forEach((doc) => {
      resultados.push(doc.data());
    });

    // console.log("Datos aleatorios:", resultados);
    res.json(resultados);
  } catch (error) {
    console.error("Error al obtener datos aleatorios:", error);
    res.status(500).send("Error al obtener datos aleatorios");
  }
}
