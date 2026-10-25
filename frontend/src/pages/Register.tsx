import { Car, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register(
        name,
        email,
        password,
      );

      alert("Account created successfully.");

      navigate("/login");
    } catch (error: any) {
      console.error("Registration failed:", error);

      const message =
        error.response?.data?.message ||
        "Failed to create account. Please try again.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black">
            <Car size={22} />
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Join us and find your next vehicle.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-left"
        >
          <div className="grid gap-5">
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-300"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 text-sm text-white outline-none transition focus:border-zinc-600 placeholder:text-zinc-600"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 text-sm text-white outline-none transition focus:border-zinc-600 placeholder:text-zinc-600"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-300"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 text-sm text-white outline-none transition focus:border-zinc-600 placeholder:text-zinc-600"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-zinc-300"
              >
                Confirm Password
              </label>

              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-12 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 text-sm text-white outline-none transition focus:border-zinc-600 placeholder:text-zinc-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
            {!loading && <ArrowRight size={17} />}
          </button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-white hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}