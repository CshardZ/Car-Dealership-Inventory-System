import express from "express";
import vehicleRoutes from "./routes/vehicle.routes";
import authRoutes from "./routes/auth.routes";
import cors from "cors";

const app = express();


app.use(
  cors({
    origin:
      process.env.NODE_APP_ENVIRONMENT === "PRODUCTION"
        ? process.env.NODE_CLIENT_PRODUCTION_URL
        : process.env.NODE_CLIENT_DEVELOPMENT_URL,
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);


export default app;