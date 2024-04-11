import app from "./app.js";

// Iniciar el servidor
app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor iniciado en el puerto", process.env.PORT || "3000");
});
