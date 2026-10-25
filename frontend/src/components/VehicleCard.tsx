import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { Vehicle } from "../types/vehicle";
import { purchaseVehicle } from "../api/api";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [quantity, setQuantity] = useState(vehicle.quantity);
  const [purchasing, setPurchasing] = useState(false);

  const isOutOfStock = quantity === 0;

  const handlePurchase = async () => {
    try {
      setPurchasing(true);

      // alert(`Vehicle id to purchase, ${vehicle._id}`);
      const data = await purchaseVehicle(vehicle._id);

      // Handle common backend response formats
      const updatedVehicle = data.vehicle ?? data;

      if (updatedVehicle.quantity !== undefined) {
        setQuantity(updatedVehicle.quantity);
      } else {
        // Fallback if backend only returns a success message
        setQuantity((prev) => Math.max(0, prev - 1));
      }

      setShowConfirm(false);
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Failed to purchase vehicle. Please try again.");
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <>
      <article className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/20">
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-zinc-900">
          <img
            src="https://placehold.co/600x400/black/white"
            alt={`${vehicle.make} ${vehicle.model}`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category */}
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {vehicle.category}
          </div>

          {/* Stock */}
          <div
            className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-medium backdrop-blur ${
              isOutOfStock
                ? "bg-red-500/15 text-red-300"
                : "bg-emerald-500/15 text-emerald-300"
            }`}
          >
            {isOutOfStock
              ? "Out of stock"
              : `${quantity} ${
                  quantity === 1 ? "unit" : "units"
                } left`}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="mb-5">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              {vehicle.make}
            </p>

            <h3 className="mt-1 text-xl font-semibold tracking-tight text-white">
              {vehicle.model}
            </h3>
          </div>

          <div className="flex items-end justify-between border-t border-zinc-800 pt-4">
            <div>
              <p className="text-xs text-zinc-500">Starting at</p>

              <p className="mt-1 text-lg font-semibold text-white">
                ₹{vehicle.price.toLocaleString("en-IN")}
              </p>
            </div>

            <button
              disabled={isOutOfStock || purchasing}
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500 cursor-pointer"
            >
              <ShoppingCart size={16} />
              {purchasing
                ? "Purchasing..."
                : isOutOfStock
                ? "Unavailable"
                : "Purchase"}
            </button>
          </div>
        </div>
      </article>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-white">
              Confirm Purchase
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Are you sure you want to purchase the{" "}
              <span className="font-medium text-white">
                {vehicle.make} {vehicle.model}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={purchasing}
                className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handlePurchase}
                disabled={purchasing}
                className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {purchasing ? "Confirming..." : "Confirm Purchase"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}