import express from "express";
import morgan from "morgan";
import routes from "./routes/index.js";
import path from "path";

const app = express();
app.use(morgan("dev"));

// Configurar moddlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log(path.resolve("./firebase.json"));

// Configurar rutas
app.use("/api", routes);

export default app;
