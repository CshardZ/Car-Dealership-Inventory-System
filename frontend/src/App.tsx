import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VehicleGrid from "./components/VehicleGrid";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function Home() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <Hero />

      {isLoggedIn ? (
        <VehicleGrid />
      ) : (
        <section className="border-b border-zinc-800 bg-zinc-950 px-6 py-20">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-2xl font-bold text-white">
              Login to view our inventory
            </h2>

            <p className="mt-3 text-sm text-zinc-500">
              Please login to browse vehicles and make purchases.
            </p>

            <a
              href="/login"
              className="mt-6 inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Login to continue
            </a>
          </div>
        </section>
      )}
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

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;