import { ArrowUpRight, ShoppingCart } from "lucide-react";
import type { Vehicle } from "../types/vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const vehicleImages: Record<string, string> = {
  "1": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
  "2": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
  "3": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
  "4": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80",
  "5": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
  "6": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
};

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const isOutOfStock = vehicle.quantity === 0;

  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/20">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-zinc-900">
        <img
          src={vehicleImages[vehicle.id]}
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
            : `${vehicle.quantity} ${vehicle.quantity === 1 ? "unit" : "units"} left`}
        </div>

        {/* View button */}
        <button
          aria-label={`View ${vehicle.make} ${vehicle.model}`}
          className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-zinc-200"
        >
          <ArrowUpRight size={17} />
        </button>
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
            disabled={isOutOfStock}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
          >
            <ShoppingCart size={16} />
            {isOutOfStock ? "Unavailable" : "Purchase"}
          </button>
        </div>
      </div>
    </article>
  );
}