"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/Config";

export default function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSignIn = async () => {
    try {
       await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Successfully logged in!");
      setError("");
      // Optionally, send user details to your backend here
      // await axios.post('/api/auth/login', { uid: userCredential.user.uid });
      window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error signing in:", error.message);
        setError(error.message);
      } else {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setSuccess("Successfully logged in with Google!");
      setError("");
      
      window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error signing in with Google:", error.message);
        setError(error.message);
      } else {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Sign In</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        {success && <p className="text-green-400 text-center mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-400 text-sm font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSignIn}
          className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          Sign In
        </button>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
        >
          Sign In with Google
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          Dont have an account?{" "}
          <a href="/sign-up" className="text-indigo-500 hover:text-indigo-600 font-semibold">
            Sign-up
          </a>
        </p>
      </div>
    </div>
  );
}
