import { db } from "../firebase.js";
import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";

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

export async function generarReporte(req, res) {
  const email = req.body;

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

      // Configurar Nodemailer
      let transporter = nodemailer.createTransport({
        // Configuramos el correo
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL,
          pass: process.env.PASSWORD,
        },
      });

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
