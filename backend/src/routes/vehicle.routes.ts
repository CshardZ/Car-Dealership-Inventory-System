import { Router } from "express";
import { requireAdmin } from "../middlewares/admin.middleware";

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

router.post("/", createVehicle);
router.get("/", getVehicles);
router.get("/search", searchVehicles);

router.put("/:id", authenticateToken, updateVehicle);

router.delete(
  "/:id",
  // authenticateToken,
  // requireAdmin,
  deleteVehicle
);

router.post("/:id/purchase", purchaseVehicle);
router.post(
  "/:id/restock",
  // authenticateToken,
  // requireAdmin,
  restockVehicle
);

export default router;