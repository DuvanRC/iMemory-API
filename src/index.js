import app from "./app.js";

const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log("Servidor iniciado en el puerto", PORT);
});
