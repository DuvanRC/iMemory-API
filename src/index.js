import app from "./app.js";
import connectDB from "./database.js";

connectDB();

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
