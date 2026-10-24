import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VehicleGrid from "./components/VehicleGrid";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <VehicleGrid />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;