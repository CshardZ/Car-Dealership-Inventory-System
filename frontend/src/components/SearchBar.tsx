import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { searchVehicles } from "../api/api";
import type { Vehicle } from "../types/vehicle";

interface SearchBarProps {
  onResults: (vehicles: Vehicle[]) => void;
}

export default function SearchBar({ onResults }: SearchBarProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const params: {
        make?: string;
        model?: string;
        category?: string;
        minPrice?: number;
        maxPrice?: number;
      } = {};

      if (search.trim()) {
        params.make = search.trim();
        params.model = search.trim();
      }

      if (category) {
        params.category = category;
      }

      if (price === "under-5") {
        params.maxPrice = 500000;
      } else if (price === "under-10") {
        params.maxPrice = 1000000;
      } else if (price === "10-20") {
        params.minPrice = 1000000;
        params.maxPrice = 2000000;
      } else if (price === "20-40") {
        params.minPrice = 2000000;
        params.maxPrice = 4000000;
      } else if (price === "above-40") {
        params.minPrice = 4000000;
      }

      const data = await searchVehicles(params);

      onResults(data.vehicles ?? data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
          />
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-12 rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-sm text-zinc-400 outline-none focus:border-zinc-600 lg:w-48"
        >
          <option value="">All Categories</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Luxury">Luxury</option>
        </select>

        {/* Price Range Select */}
        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="h-12 rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-sm text-zinc-400 outline-none focus:border-zinc-600 lg:w-48"
        >
          <option value="">Any Price</option>
          <option value="under-5">Under ₹5L</option>
          <option value="under-10">Under ₹10L</option>
          <option value="10-20">₹10L - ₹20L</option>
          <option value="20-40">₹20L - ₹40L</option>
          <option value="above-40">Above ₹40L</option>
        </select>

        {/* Filter Button */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-zinc-800 px-5 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-white disabled:opacity-50 cursor-pointer"
        >
          <SlidersHorizontal size={17} />
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
}