import { Car, LogIn, LogOut, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black">
            <Car size={20} />
          </div>

          <span className="text-lg font-semibold tracking-tight text-white">
            Incubyte Car Dealers
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="hidden items-center gap-2 rounded-lg px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white sm:flex"
              >
                <LogIn size={16} />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                <UserPlus size={16} />
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white cursor-pointer"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}