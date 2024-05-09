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

export async function razonamientoMedioOld(req, res) {
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

export async function razonamientoAvanzado(req, res) {
  try {
    // Obtenemos los id del juego
    const razonamientoRef = db.collection("razonamiento_avanzado");
    const snapshot = await razonamientoRef.select("id").get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    // Los almacenamos en un array
    let ids = [];
    snapshot.forEach((doc) => {
      ids.push(doc.id);
    });
    // Paso 2: Seleccionar 10 ID aleatorios
    let diesIds = [];
    for (let i = 0; i < 10; i++) {
      let idx = Math.floor(Math.random() * ids.length);
      diesIds.push(ids[idx]);
      ids.splice(idx, 1); //para evitar el mismo id
    }

    // Consultamos los datos de los documentos
    const results = await Promise.all(
      diesIds.map((id) => razonamientoRef.doc(id).get())
    );
    res.json(results);

    // results.forEach(doc => {
    //   if (!doc.exists) {
    //     console.log('No data found for ID:', doc.id);
    //   } else {
    //     console.log(`ID: ${doc.id}, Nombre: ${doc.data().nombre}, Respuesta: ${doc.data().respuesta}`);
    //   }
    // });
  } catch (error) {
    console.error("Error getting documents:", error);
  }
}
