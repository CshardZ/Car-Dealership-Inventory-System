import { X } from "lucide-react";

interface AddVehicleFormProps {
  onClose: () => void;
}

export default function AddVehicleForm({ onClose }: AddVehicleFormProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Add Vehicle
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Add a new vehicle to your inventory.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Make
              </label>

              <input
                type="text"
                placeholder="Toyota"
                className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Model
              </label>

              <input
                type="text"
                placeholder="Camry"
                className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Category
            </label>

            <select className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-400 outline-none focus:border-zinc-600">
              <option value="">Select category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Price
              </label>

              <input
                type="number"
                min="0"
                placeholder="2500000"
                className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Quantity
              </label>

              <input
                type="number"
                min="0"
                placeholder="10"
                className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-zinc-800 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-400 transition hover:border-zinc-700 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}