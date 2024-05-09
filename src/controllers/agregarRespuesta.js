import { db } from "../firebase.js";
import crypto from "crypto";

async function añadirRegistros() {
  const registrosRef = db.collection("razonamiento_facil");

  for (let i = 1; i <= 1; i++) {
    const nombre = `suma10+${i}`;
    const respuesta = i + 10;

    //   Generamos un número aleatorio criptográfico
    const randomBytes = crypto.randomBytes(4);
    const randomValue = randomBytes.readUInt32BE(0, true) / 4294967295;

    // Crea el objeto del documento a añadir
    const docData = { nombre, respuesta, randomField: randomValue };

    // Añade el documento a Firebase
    try {
      await registrosRef.add(docData);
      console.log(`Registro ${nombre} = ${respuesta} añadido con éxito.`);
    } catch (error) {
      console.error(`Error añadiendo registro ${nombre}:`, error);
    }
  }
}

export const agregarJuegoRazonamiento = async (req, res) => {
  // Llama a la función para ejecutarla
  añadirRegistros();
  return res.send("Hecho");
};

async function actualizarRandomField() {
  const coleccionRef = db.collection("razonamiento_facil");

  try {
    // Obtener todos los datos de la colección
    const querySnapshot = await coleccionRef.get();

    const updates = [];
    querySnapshot.forEach((doc) => {
      //   Generamos un número aleatorio criptográfico
      const randomBytes = crypto.randomBytes(4);
      const randomValue = randomBytes.readUInt32BE(0, true) / 4294967295;

      // Preparar la actualización del campo randomField
      const updatePromise = coleccionRef.doc(doc.id).update({
        randomField: randomValue,
      });

      updates.push(updatePromise);
    });

    // Ejecutar todas las promesas de actualización
    await Promise.all(updates);
    console.log("Todos los campos randomField han sido actualizados.");
  } catch (error) {
    console.error("Error al actualizar campos:", error);
  }
}

export const actualizarCampoRandom = async (req, res) => {
  // Llamar a la función para ejecutar la actualización
  actualizarRandomField();
  return res.send("Hecho actualizarRandomField");
};

export async function agregarRazonamientoBasicoSumas(req, res) {
  try {
    const datos = req.body;
    for (let dato of datos) {
      await db.collection("razonamiento_basico").add({
        nombre: dato.nombre,
        respuesta: dato.resultado,
      });
    }

    res
      .status(200)
      .json({ message: "Datos almacenados correctamente en Firebase" });
  } catch (error) {
    console.error("Error al almacenar datos en Firebase:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function agregarRazonamientoBasicoRestas(req, res) {
  try {
    const datos = req.body;
    for (let dato of datos) {
      await db.collection("razonamiento_basico").add({
        nombre: dato.nombre,
        respuesta: dato.resultado,
      });
    }

    res
      .status(200)
      .json({ message: "Datos almacenados correctamente en Firebase" });
  } catch (error) {
    console.error("Error al almacenar datos en Firebase:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function agregarRazonamientoAvanzadoSumas(req, res) {
  try {
    const datos = req.body;
    for (let dato of datos) {
      await db.collection("razonamiento_avanzado").add({
        nombre: dato.nombre,
        respuesta: dato.resultado,
      });
    }

    res
      .status(200)
      .json({ message: "Datos almacenados correctamente en Firebase" });
  } catch (error) {
    console.error("Error al almacenar datos en Firebase:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function agregarRazonamientoAvanzadoRestas(req, res) {
  try {
    const datos = req.body;
    for (let dato of datos) {
      await db.collection("razonamiento_avanzado").add({
        nombre: dato.nombre,
        respuesta: dato.resultado,
      });
    }

    res
      .status(200)
      .json({ message: "Datos almacenados correctamente en Firebase" });
  } catch (error) {
    console.error("Error al almacenar datos en Firebase:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function agregarRazonamientoAvanzadoMultiplicacion(req, res) {
  try {
    const datos = req.body;
    for (let dato of datos) {
      await db.collection("razonamiento_avanzado").add({
        nombre: dato.nombre,
        respuesta: dato.resultado,
      });
    }

    res
      .status(200)
      .json({ message: "Datos almacenados correctamente en Firebase" });
  } catch (error) {
    console.error("Error al almacenar datos en Firebase:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
