import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_40%)]" />

      <div className="relative mx-auto flex max-w-7xl justify-center px-6 py-20 text-center lg:py-28">
        <div className="flex max-w-3xl flex-col items-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-400">
            <ShieldCheck size={14} />
            Trusted Vehicle Inventory
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find the right vehicle.
            <span className="block text-zinc-500">
              Without the hassle.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Explore our curated inventory of quality vehicles. Search,
            compare, and find your next car in one place.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#vehicles"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Browse Vehicles
              <ArrowRight size={17} />
            </a>

            <button className="rounded-lg border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}