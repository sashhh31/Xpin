"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/Config";
import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; 

      await axios.post("/api/signup", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonymous", 
        photoURL: user.photoURL || ""
      });

      setSuccess("Successfully signed up!");
      setError("");
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

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user; 
          
      await axios.post("/api/signup", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonymous",
        photoURL: user.photoURL || ""
      });      setSuccess("Successfully signed up with Google!");
      setError("");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Create an Account</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        {success && <p className="text-green-400 text-center mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-400 text-sm font-semibold mb-2" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            id="confirm-password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSignUp}
          className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          Sign Up
        </button>

        {/* Google Sign Up Button */}
        <button
          onClick={handleGoogleSignUp}
          className="w-full mt-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
        >
          Sign Up with Google
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/LogIn" className="text-indigo-500 hover:text-indigo-600 font-semibold">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
