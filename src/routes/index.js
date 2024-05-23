import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import razonamientoRoutes from "./razonamientoRoutes.js";
import avancesRoutes from "./avancesRoutes.js";

const app = express();

app.use("/auth", authRoutes);
app.use("/usuarios", userRoutes);
app.use("/razonamiento", razonamientoRoutes);
app.use("/avances", avancesRoutes);

export default app;
