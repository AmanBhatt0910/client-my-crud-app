"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold text-white mb-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="px-3 py-2 rounded-md bg-gray-700 text-white"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            className="px-3 py-2 rounded-md bg-gray-700 text-white"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button
            className="bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-500 transition-colors"
            type="submit"
          >
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link href="/admin/register" passHref>
            <span className="text-sm text-gray-300 mt-2 cursor-pointer hover:underline">
              Don't have an account? Register
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
}
