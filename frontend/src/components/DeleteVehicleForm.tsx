import { AlertTriangle, X } from "lucide-react";

interface DeleteVehicleFormProps {
  vehicleName: string;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteVehicleForm({
  vehicleName,
  onClose,
  onDelete,
}: DeleteVehicleFormProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-start justify-between border-b border-zinc-800 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
              <AlertTriangle size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Delete Vehicle
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
          >
            <X size={17} />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm leading-6 text-zinc-400">
            Are you sure you want to delete{" "}
            <span className="font-medium text-white">
              {vehicleName}
            </span>
            ?
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-800 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-400 transition hover:border-zinc-700 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Delete Vehicle
          </button>
        </div>
      </div>
    </div>
  );
}