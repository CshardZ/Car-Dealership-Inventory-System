import { useState } from "react";
import { PackagePlus, Plus, Trash2 } from "lucide-react";
import { vehicles } from "../data/vehicles";
import AddVehicleForm from "../components/AddVehicleForm";
import EditVehicleForm from "../components/EditVehicleForm";
import DeleteVehicleForm from "../components/DeleteVehicleForm";


export default function Admin() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [restockingVehicle, setRestockingVehicle] = useState<string | null>(null);
  const [deletingVehicle, setDeletingVehicle] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-xs font-semibold tracking-widest text-zinc-500 uppercase">
              Admin Panel
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              Vehicle Inventory
            </h1>

            <p className="mt-1.5 text-sm text-zinc-400">
              Manage your vehicle inventory, pricing, and stock levels.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.98]"
          >
            <Plus size={17} />
            Add Vehicle
          </button>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/50 shadow-xl">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-800 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                <th className="px-6 py-4">Vehicle Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-800/80 text-sm">
              {vehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="transition hover:bg-zinc-900/80"
                >
                  {/* Vehicle Name */}
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-white">
                    {vehicle.make} {vehicle.model}
                  </td>

                  {/* Type */}
                  <td className="whitespace-nowrap px-6 py-4 text-zinc-400">
                    {vehicle.category}
                  </td>

                  {/* Price */}
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-zinc-300">
                    ₹{vehicle.price.toLocaleString("en-IN")}
                  </td>

                  {/* Stock */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
                        vehicle.quantity === 0
                          ? "border-red-500/20 bg-red-500/10 text-red-400"
                          : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                      }`}
                    >
                      {vehicle.quantity === 0
                        ? "Out of Stock"
                        : `${vehicle.quantity} in stock`}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Restock */}
                      <button
                        title="Restock"
                        onClick={() => setRestockingVehicle(vehicle.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
                      >
                        <PackagePlus size={14} />
                        <span>Restock</span>
                      </button>

                      {/* Delete */}
                      <button
                        title="Delete vehicle"
                        onClick={() => setDeletingVehicle(vehicle.id)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-red-900/50 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Vehicle */}
      {showAddForm && (
        <AddVehicleForm onClose={() => setShowAddForm(false)} />
      )}

      {/* Restock */}
      {restockingVehicle && (
        <EditVehicleForm
          vehicleName={
            vehicles.find((vehicle) => vehicle.id === restockingVehicle)
              ? `${vehicles.find((vehicle) => vehicle.id === restockingVehicle)?.make} ${
                  vehicles.find((vehicle) => vehicle.id === restockingVehicle)
                    ?.model
                }`
              : ""
          }
          onClose={() => setRestockingVehicle(null)}
        />
      )}

      {/* Delete Vehicle */}
      {deletingVehicle && (
        <DeleteVehicleForm
          vehicleName={
            vehicles.find((vehicle) => vehicle.id === deletingVehicle)
              ? `${vehicles.find((vehicle) => vehicle.id === deletingVehicle)?.make} ${
                  vehicles.find((vehicle) => vehicle.id === deletingVehicle)?.model
                }`
              : ""
          }
          onClose={() => setDeletingVehicle(null)}
        />
      )}
    </main>
  );
}