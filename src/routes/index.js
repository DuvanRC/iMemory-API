import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import razonamientoRoutes from "./razonamientoRoutes.js";
import reporteRoutes from "./reporteRoutes.js";

const app = express();

app.use("/auth", authRoutes);
app.use("/usuarios", userRoutes);
app.use("/razonamiento", razonamientoRoutes);
app.use("/reporte", reporteRoutes);

export default app;
