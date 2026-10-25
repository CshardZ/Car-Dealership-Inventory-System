import { Request, Response } from "express";
import Vehicle from "../models/Vehicle";



export const createVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.create(req.body);

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create vehicle",
    });
  }
};

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await Vehicle.find();

    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch vehicles",
    });
  }
};

export const searchVehicles = async (req: Request, res: Response) => {
  try {
    const { make, model, category, minPrice, maxPrice } = req.query;

    const filter: Record<string, any> = {};

    // Search make OR model
    if (make || model) {
      const searchTerm = String(make || model);

      filter.$or = [
        {
          make: {
            $regex: searchTerm,
            $options: "i",
          },
        },
        {
          model: {
            $regex: searchTerm,
            $options: "i",
          },
        },
      ];
    }

    // Category
    if (category) {
      filter.category = {
        $regex: String(category),
        $options: "i",
      };
    }

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const vehicles = await Vehicle.find(filter);

    res.status(200).json(vehicles);
  } catch (error) {
    console.error("Search vehicles error:", error);

    res.status(400).json({
      message: "Invalid search parameters",
    });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update vehicle",
    });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete vehicle",
    });
  }
};

export const purchaseVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findOneAndUpdate(
      {
        _id: req.params.id,
        quantity: { $gt: 0 },
      },
      {
        $inc: { quantity: -1 },
      },
      {
        returnDocument: "after"
      }
    );

    if (!vehicle) {
      const existingVehicle = await Vehicle.findById(req.params.id);

      if (!existingVehicle) {
        return res.status(404).json({
          message: "Vehicle not found",
        });
      }

      return res.status(400).json({
        message: "Vehicle is out of stock",
      });
    }

    res.status(200).json({
      message: "Vehicle purchased successfully",
      vehicle,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to purchase vehicle",
    });
  }
};

export const restockVehicle = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be a positive integer",
      });
    }

    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { quantity },
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      message: "Vehicle restocked successfully",
      vehicle,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to restock vehicle",
    });
  }
};