import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from "./api/api";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VehicleGrid from "./components/VehicleGrid";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

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
  useEffect(() => {
    api
      .get("/health")
      .then((response) => {
        console.log("Backend:", response.data);
      })
      .catch((error) => {
        console.error("Backend connection failed:", error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;