import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";
import User from "../models/userModel.js";
require("dotenv").config();

export const register = async (req, res) => {
  try {
    const { name, lastName, email, password, department, city, address } =
      req.body;

    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Ya existe un usuario con el mismo correo electrónico",
      });
    }

    // Crear un nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      password: hashedPassword,
      name,
      lastName,
      email,
      department,
      city,
      address,
    });
    await newUser.save();

    // Generar un token de acceso
    const accessToken = jwt.sign({ userId: newUser._id }, config.secretKey);

    // Enviar una respuesta al cliente
    res.status(201).json({ accessToken });
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

    // Verificar si el correo electrónico y la contraseña son correctos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar un token de acceso
    const accessToken = jwt.sign({ userId: user._id }, config.secretKey);

    // Enviar una respuesta al cliente
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ha ocurrido un error al iniciar sesión" });
  }
};

<<<<<<< HEAD
export const forget_password = async (req, res) => {
=======
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
      html: `<div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #0056b3;">iMemory: Restablecimiento de Contraseña</h2>
        <p>Hola,</p>
        <p>Se ha generado una nueva contraseña para tu cuenta en iMemory.</p>
        <p><strong>Tu nueva contraseña es:</strong> <span style="color: #d04a02;">${newPassword}</span></p>
        <p><strong>Equipo de iMemory</strong></p>
      </div>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Error al enviar el correo electrónico");
  }
};

export const forgotPassword = async (req, res) => {
>>>>>>> 47f127d (iMemory v0.1)
  try {
    const { email } = req.body;

    // Verificar si el correo electrónico y la contraseña son correctos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar un token de acceso
    // const accessToken = jwt.sign({ userId: user._id }, config.secretKey);

    // Enviar una respuesta al cliente
    res.status(500).json({ message: "Ha ocurrido un error al iniciar sesión" });
    // res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ha ocurrido un error al iniciar sesión" });
  }
};
