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


const router = Router();

router.post("/", createVehicle);
router.get("/", getVehicles);
router.get("/search", searchVehicles);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);
router.post("/:id/purchase", purchaseVehicle);
router.post("/:id/restock", restockVehicle);

export default router;