import express from "express";
import vehicleRoutes from "./routes/vehicle.routes";
import authRoutes from "./routes/auth.routes";




const app = express();


app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);


export default app;