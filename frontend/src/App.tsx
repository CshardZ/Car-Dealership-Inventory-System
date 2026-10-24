import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VehicleGrid from "./components/VehicleGrid";

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <Hero />
      <VehicleGrid />
    </div>
  );
}

export default App;