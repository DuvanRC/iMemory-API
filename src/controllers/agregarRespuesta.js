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

export async function agregarRazonamientoMedio(reeq, res) {
  const registrosRazonamientoMedio = db.collection("razonamiento_medio");

  for (let i = 1; i <= 3; i++) {
    const nombre = `suma10+${i}`;
    const respuesta = i + 10;

    // Crea el objeto del documento a añadir
    const docData = { nombre, respuesta };

    // Añade el documento a Firebase
    try {
      await registrosRazonamientoMedio.add(docData);
      console.log(`Registro ${nombre} = ${respuesta} añadido con éxito.`);
    } catch (error) {
      console.error(`Error añadiendo registro ${nombre}:`, error);
    }
  }
}
