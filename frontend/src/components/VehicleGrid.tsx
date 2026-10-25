import { useEffect, useState } from "react";
import { PackageOpen } from "lucide-react";
import SearchBar from "./SearchBar";
import VehicleCard from "./VehicleCard";
import { getVehicles } from "../api/api";
import type { Vehicle } from "../types/vehicle";

export default function VehicleGrid() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);

        const data = await getVehicles();

        setVehicles(data.vehicles ?? data);
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
        setError("Failed to load vehicles.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <section
      id="vehicles"
      className="border-b border-zinc-800 bg-zinc-950 px-6 py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-widest">
              <PackageOpen size={15} />
              INVENTORY
            </div>

            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
              Browse our collection of quality vehicles and find something
              that fits your needs.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {vehicles.length} vehicles in inventory
          </div>
        </div>

        {/* Search & Filters */}
        <SearchBar onResults={setVehicles} />

        {/* Results */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            Showing{" "}
            <span className="font-medium text-zinc-300">
              {vehicles.length}
            </span>{" "}
            vehicles
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-sm text-zinc-500">
            Loading vehicles...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}

        {/* Vehicle Grid */}
        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}