import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Configurar moddlewares
app.use(express.json());

// Configurar rutas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

export default app;

// app.get("/test", (req, res) => {
//   res.json({ message: "GET request successful" });
// });

// app.post("/test", (req, res) => {
//   console.log(req.body);
//   res.json({ message: "POST request received", data: req.body });
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
