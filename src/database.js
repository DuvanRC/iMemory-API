import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    // Crear conexión a MongoDB utilizando la URI de configuración
    await mongoose.connect(config.mongoURI);
    console.log("Conexión exitosa a MongoDB");

    // Manejador de evento 'error' para capturar errores en la conexión a MongoDB
    mongoose.connection.on("error", (error) => {
      console.error(`Error al conectar con MongoDB: ${error.message}`);
    });

    // Manejador de evento 'disconnected' para indicar la desconexión de MongoDB
    mongoose.connection.on("disconnected", () => {
      console.log("Desconexión de MongoDB");
    });

    // Manejador de evento 'reconnected' para indicar la reconexión a MongoDB
    mongoose.connection.on("reconnected", () => {
      console.log("Reconexión exitosa a MongoDB");
    });
  } catch (error) {
    console.error(`Error al conectar con MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

// const mongoose = require("mongoose");

// async function conexion() {
//   try {
//     await mongoose.connect("mongodb+srv://user:12345@mangeldb.jxvqlcd.mongodb.net/neuromix", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,

//     });
//     console.log("Conectado a la base de datos");
//   } catch (error) {
//     console.error('Error al conectar a MongoDB Atlas:', error.message);
//   }
// }

// module.exports = { conexion };
