import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../firebase.js";
import nodemailer from "nodemailer";

async function findUserByEmail(email) {
  const usersRef = db.collection("usuarios");
  const snapshot = await usersRef.where("email", "==", email).limit(1).get();

  if (snapshot.empty) {
    return null;
  }

  let userData = null;
  snapshot.forEach((doc) => {
    userData = { id: doc.id, ...doc.data() };
  });

  return userData;
}

export const register = async (req, res) => {
  try {
    const { name, lastName, email, password, birthDate } = req.body;

    // Verifica si el usuario ya existe
    const existeUsuario = await findUserByEmail(email);
    if (existeUsuario) {
      return res.status(400).json({
        message: "El email ya está registrado. Por favor, utiliza otro email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection("usuarios").add({
      name,
      lastName,
      email,
      password: hashedPassword,
      birthDate,
    });

    res.send("Nuevo usuario creado");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al registrar el usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el correo electrónico existe
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Verificar si la contraseña es correcta
    const contraseniaValida = await bcrypt.compare(password, user.password);
    if (!contraseniaValida) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar un token de acceso. Asegúrate de tener una clave secreta para JWT
    // const accessToken = jwt.sign({ userId: user.id }, config.secretKey, {
    //   expiresIn: "1h",
    // });

    // // Enviar una respuesta al cliente
    // return res.status(200).json({ accessToken });
    return res.status(200).json({ message: "Login correcto (B)" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al iniciar sesión (B)" });
  }
};

// Método para generar una contraseña aleatoria
const generateRandomPassword = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};

// Método para enviar el correo electrónico
const sendEmail = async (email, newPassword) => {
  try {
    const transporter = nodemailer.createTransport({
      // Configuramos el correo
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: "iMemory APP",
        address: process.env.MAIL,
      },
      to: email,
      subject: "Nueva contraseña generada iMemory",
      html: `<body>
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #0056b3;">iMemory: Restablecimiento de Contraseña</h2>
          <p>Hola,</p>
          <p>Se ha generado una nueva contraseña para tu cuenta en iMemory.</p>
          <p style="font-size: 18px;"><strong>Tu nueva contraseña es:</strong></p>
          <p style="font-size: 32px; font-weight: bold; color: #d04a02; margin-bottom: 20px;">
          <span style="user-select: all;">${newPassword}</span></p>
          <img src="https://i.ibb.co/p3dLtSx/logo.jpg" alt="iMemory APP" style="max-width: 100%; height: auto; width: 200px;">
          <p style="margin-top: 20px;">Atentamente,</p>
          <p>Equipo de iMemory</p>
          <footer style="font-size: 12px; color: #666; margin-top: 20px;">
            <p>Este correo ha sido enviado automáticamente. Por favor, no respondas a este mensaje.</p>
          </footer>
        </div></body>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Error al enviar el correo electrónico" + error);
  }
};

export const recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Verificar si el correo electrónico y la contraseña son correctos
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar una nueva contraseña
    const newPassword = generateRandomPassword();

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña del usuario en la base de datos
    await db.collection("usuarios").doc(user.id).update({
      password: hashedPassword,
    });

    // Enviar la nueva contraseña por correo electrónico
    await sendEmail(email, newPassword);

    return res.status(200).json({
      message:
        "Se ha enviado una nueva contraseña al correo electrónico proporcionado",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al recuperar contraseña (B)" });
  }
};
