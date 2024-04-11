import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";

const app = express();

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

export default app;
