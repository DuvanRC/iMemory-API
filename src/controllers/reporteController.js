import { db, Timestamp } from "../firebase.js";
import PDFDocument from "pdfkit";
import transporter from "../config/correoConfig.js";

async function obtenerIdUsuario(correo) {
  const userSnapshot = await db
    .collection("usuarios")
    .where("email", "==", correo)
    .get();

  if (userSnapshot.empty) {
    return null;
  }

  let userId;
  userSnapshot.forEach((doc) => {
    userId = doc.id;
  });
  return userId;
}

export async function guardarRazonamientoBasico(req, res) {
  let { correo, correctas, incorrectas, tiempo } = req.body;

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
    const idUsuario = await obtenerIdUsuario(correo);
    if (!idUsuario) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    let fechaRegistro = Timestamp.now();

    const userRef = db.collection("usuarios").doc(idUsuario);
    const statsRef = userRef.collection("avance_razonamiento_basico").doc();
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

export async function guardarRazonamientoAvanzado(req, res) {
  let { correo, correctas, incorrectas, tiempo } = req.body;

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
    const idUsuario = await obtenerIdUsuario(correo);
    if (!idUsuario) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    let fechaRegistro = Timestamp.now();

    const userRef = db.collection("usuarios").doc(idUsuario);
    const statsRef = userRef.collection("avance_razonamiento_avanzado").doc();
    await statsRef.set({
      correctas,
      incorrectas,
      tiempo,
      fechaRegistro,
    });

    res
      .status(200)
      .send("Avances almacenados correctamente a razonamiento Avanzado");
  } catch (error) {
    console.error("Error actualizando el usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
}

export async function guardarMemoriaBasico(req, res) {
  let { correo, intentos, tiempo } = req.body;

  if (!correo || intentos === undefined || tiempo === undefined) {
    return res
      .status(400)
      .send("Todos los campos son necesarios: correo, intentos, tiempo");
  }

  try {
    const idUsuario = await obtenerIdUsuario(correo);
    if (!idUsuario) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    let fechaRegistro = Timestamp.now();

    const userRef = db.collection("usuarios").doc(idUsuario);
    const statsRef = userRef.collection("avance_memoria_basico").doc();
    await statsRef.set({
      intentos,
      tiempo,
      fechaRegistro,
    });

    res.status(200).send("Avance subido correctamente");
  } catch (error) {
    console.error("Error actualizando el usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
}

export async function guardarMemoriaAvanzado(req, res) {
  let { correo, intentos, tiempo } = req.body;

  if (!correo || intentos === undefined || tiempo === undefined) {
    return res
      .status(400)
      .send("Todos los campos son necesarios: correo, intentos, tiempo");
  }

  try {
    const idUsuario = await obtenerIdUsuario(correo);
    if (!idUsuario) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    let fechaRegistro = Timestamp.now();

    const userRef = db.collection("usuarios").doc(idUsuario);
    const statsRef = userRef.collection("avance_memoria_avanzado").doc();
    await statsRef.set({
      intentos,
      tiempo,
      fechaRegistro,
    });

    res.status(200).send("Avance subido correctamente");
  } catch (error) {
    console.error("Error actualizando el usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
}

export async function guardarLenguajeBasico(req, res) {
  let { correo, correctas, incorrectas, tiempo } = req.body;

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
    const idUsuario = await obtenerIdUsuario(correo);
    if (!idUsuario) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    let fechaRegistro = Timestamp.now();

    const userRef = db.collection("usuarios").doc(idUsuario);
    const statsRef = userRef.collection("avance_lenguaje_basico").doc();
    await statsRef.set({
      correctas,
      incorrectas,
      tiempo,
      fechaRegistro,
    });

    res.status(200).send("Avancez almacenados correctamente a Lenguaje Básico");
  } catch (error) {
    console.error("Error actualizando el usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
}

export async function guardarLenguajeAvanzado(req, res) {
  let { correo, correctas, incorrectas, tiempo } = req.body;

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
    const idUsuario = await obtenerIdUsuario(correo);
    if (!idUsuario) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    let fechaRegistro = Timestamp.now();

    const userRef = db.collection("usuarios").doc(idUsuario);
    const statsRef = userRef.collection("avance_lenguaje_avanzado").doc();
    await statsRef.set({
      correctas,
      incorrectas,
      tiempo,
      fechaRegistro,
    });

    res
      .status(200)
      .send("Avances almacenados correctamente a Lenguaje Avanzado");
  } catch (error) {
    console.error("Error actualizando el usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
}

export async function generarReporte(req, res) {
  let email = req.body;

  try {
    // Obtén el documento de la colección "usuarios" donde el email coincide
    const userSnapshot = await db
      .collection("usuarios")
      .where("email", "==", email.correo)
      .get();

    if (userSnapshot.empty) {
      return res.status(404).send("Usuario no encontrado");
    }

    let userData;
    userSnapshot.forEach((doc) => {
      userData = doc.data();
    });

    const user = userData;

    // Crear PDF
    const doc = new PDFDocument();
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);

      let mailOptions = {
        from: {
          name: "iMemory APP",
          address: process.env.MAIL,
        },
        to: email,
        subject: "Reporte de Usuario",
        text: "Adjunto encontrarás el reporte de usuario.",
        attachments: [
          {
            filename: "reporte.pdf",
            content: pdfData,
          },
        ],
      };

      // Enviar correo
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send("Error al enviar el correo");
        }
        res.status(200).send("Correo enviado correctamente");
      });
    });
    console.log(user.name);
    // Agregar contenido al PDF
    doc.fontSize(25).text("Reporte de Usuario", { align: "center" });
    doc.moveDown();
    doc.fontSize(16).text(`Nombre: ${user.name}`);
    doc.text(`Apellido: ${user.lastName}`);
    doc.text(`Email: ${user.email}`);
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al generar el reporte");
  }
}

export async function generarReporteSemanal(req, res) {
  try {
    let email = req.query.correo;
    if (!email) {
      return res
        .status(400)
        .json({ error: "Error de validación, el correo es requerido" });
    }

    const usersRef = db.collection("usuarios");
    const userSnapshot = await usersRef.where("email", "==", email).get();

    if (userSnapshot.empty) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const userId = userSnapshot.docs[0].id;

    const unaSemanaAtras = Timestamp.fromDate(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );
    const ahora = Timestamp.fromDate(new Date());

    const collectionsToFetch = [
      "avance_razonamiento_basico",
      "avance_razonamiento_avanzado",
    ];
    const dataPromises = collectionsToFetch.map((collection) =>
      usersRef
        .doc(userId)
        .collection(collection)
        .where("fechaRegistro", ">=", unaSemanaAtras)
        .where("fechaRegistro", "<=", ahora)
        .get()
    );

    const snapshots = await Promise.all(dataPromises);

    const results = snapshots.reduce((acc, snapshot, index) => {
      const collectionName = collectionsToFetch[index];
      if (!snapshot.empty) {
        let totalCorrecto = 0;
        let totalIncorrecto = 0;
        let totalTiempo = 0;
        let count = 0;
        let fechaInicial = null;
        let fechaFinal = null;

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const fechaRegistro = data.fechaRegistro.toDate();
          const correcto = data.correctas || 0;
          const incorrecto = data.incorrectas || 0;
          const tiempo = data.tiempo || 0;

          totalCorrecto += correcto;
          totalIncorrecto += incorrecto;
          totalTiempo += tiempo;
          count += 1;

          if (!fechaInicial || fechaRegistro < fechaInicial) {
            fechaInicial = fechaRegistro;
          }
          if (!fechaFinal || fechaRegistro > fechaFinal) {
            fechaFinal = fechaRegistro;
          }
        });

        const promedioCorrecto = count ? (totalCorrecto / count).toFixed(2) : 0;
        const promedioIncorrecto = count
          ? (totalIncorrecto / count).toFixed(2)
          : 0;
        const promedioTiempo = count ? (totalTiempo / count).toFixed(2) : 0;

        acc[collectionName] = {
          promedioCorrecto,
          promedioIncorrecto,
          promedioTiempo,
          fechaInicial,
          fechaFinal,
          // data: snapshot.docs.map((doc) => doc.data()),
        };
      } else {
        acc[collectionName] = {
          promedioCorrecto: 0,
          promedioIncorrecto: 0,
          promedioTiempo: 0,
          fechaInicial: null,
          fechaFinal: null,
          data: [],
        };
      }
      return acc;
    }, {});

    return res.status(200).json(results);
  } catch (error) {
    console.error("Error al generar reporte semanal:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
