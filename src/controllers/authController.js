// import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../firebase.js";
import transporter from "../config/correoConfig.js";
import crypto from "crypto";
import validator from "validator";

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

export async function register(req, res) {
  try {
    const { name, lastName, email, password, birthDate, correoCuidador } =
      req.body;

    // Validación de correos electrónicos
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message:
          "El correo proporcionado no es válido. Por favor, introduce un correo válido.",
      });
    }

    if (correoCuidador && !validator.isEmail(correoCuidador)) {
      return res.status(401).json({
        message:
          "El correo del cuidador proporcionado no es válido. Por favor, introduce un correo válido.",
      });
    }

    // Verifica si el usuario ya existe
    const existeUsuario = await findUserByEmail(email);
    if (existeUsuario) {
      return res.status(402).json({
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
      correoCuidador,
      rol: 2,
      estado: 1,
    });

    res.send("Nuevo usuario creado");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al registrar el usuario" });
  }
}

export async function login(req, res) {
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

    if (user.rol == 1) {
      return res.status(210).send(email);
    }
    return res.status(200).send(email);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al iniciar sesión (B)" });
  }
}

// Método para generar una contraseña aleatoria
function generarContrasenia(length = 10) {
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const allCharacters = upperCaseLetters + lowerCaseLetters + numbers;

  const passwordArray = [];

  // Asegurar al menos un carácter de cada tipo
  passwordArray.push(upperCaseLetters[getRandomInt(upperCaseLetters.length)]);
  passwordArray.push(lowerCaseLetters[getRandomInt(lowerCaseLetters.length)]);
  passwordArray.push(numbers[getRandomInt(numbers.length)]);

  // Rellenar el resto de la contraseña
  for (let i = 3; i < length; i++) {
    passwordArray.push(allCharacters[getRandomInt(allCharacters.length)]);
  }

  // Mezclar los caracteres para asegurar aleatoriedad
  return shuffleArray(passwordArray).join("");
}

function getRandomInt(max) {
  return crypto.randomInt(0, max);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(crypto.randomInt(0, i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Método para enviar el correo electrónico
const sendEmail = async (email, newPassword) => {
  try {
    const detallesCorreo = {
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

    await transporter.sendMail(detallesCorreo);
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
    const newPassword = generarContrasenia();

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

export async function cambiarContrasenia(req, res) {
  try {
    const { correo, password } = req.body;
    const user = await findUserByEmail(correo);
    if (!user) {
      return res.status(400).json({ message: "No existe correo" });
    }

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar la contraseña del usuario en la base de datos
    await db.collection("usuarios").doc(user.id).update({
      password: hashedPassword,
    });
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error cambio de contraseña" });
  }
}
