import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
      <div className="flex flex-col gap-3 lg:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search by make or model..."
            className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
          />
        </div>

        {/* Category */}
        <select className="h-12 rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-sm text-zinc-400 outline-none focus:border-zinc-600 lg:w-48">
          <option value="">All Categories</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Luxury">Luxury</option>
        </select>

        {/* Price */}
        <select className="h-12 rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-sm text-zinc-400 outline-none focus:border-zinc-600 lg:w-48">
          <option value="">Any Price</option>
          <option value="under-20">Under ₹20L</option>
          <option value="20-50">₹20L - ₹50L</option>
          <option value="above-50">Above ₹50L</option>
        </select>

        {/* Filter Button */}
        <button className="flex h-12 items-center justify-center gap-2 rounded-xl border border-zinc-800 px-5 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-white">
          <SlidersHorizontal size={17} />
          Filters
        </button>
      </div>
    </div>
  );
}