import { Router } from "express";

import {
  createVehicle,
  getVehicles,
  searchVehicles,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
} from "../controllers/vehicle.controller";

import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticateToken, createVehicle);

router.get("/", authenticateToken, getVehicles);

router.get("/search", authenticateToken, searchVehicles);

router.put("/:id", authenticateToken, updateVehicle);

router.delete("/:id", authenticateToken, deleteVehicle);

router.post("/:id/purchase", authenticateToken, purchaseVehicle);

router.post("/:id/restock", authenticateToken, restockVehicle);

export default router;