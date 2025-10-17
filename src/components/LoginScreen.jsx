import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.js"; // ✅ Import your Firebase setup
import logo from "../assets/Bijli Buddy Icon.png";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Restrict login to Gmail addresses
  const isGmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter all fields");
      return;
    }

    if (!isGmail(email)) {
      alert("Only Gmail addresses are allowed (example@gmail.com)");
      return;
    }

    setLoading(true);

    try {
      // ✅ Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem("userData", JSON.stringify(userData)); // store locally

        alert(`Welcome back, ${userData.name}!`);
        navigate("/dashboard");
      } else {
        alert("User data not found in Firestore.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#E0F2F1] via-[#B2DFDB] to-[#80CBC4]">
      
      {/* Background Circles */}
      <div className="absolute top-1/4 right-1/4 w-36 h-36 bg-[#0F766E] rounded-full opacity-70 blur-xl"></div>
      <div className="absolute top-1/2 left-[300px] w-28 h-28 bg-[#14B8A6] rounded-full opacity-60 blur-xl"></div>
      <div className="absolute bottom-1/4 right-[200px] w-40 h-40 bg-[#06B6D4] rounded-full opacity-80 blur-xl"></div>
      <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-[#0D9488] rounded-full opacity-70 blur-xl"></div>

      {/* Login Box */}
      <div className="w-full max-w-md flex flex-col items-center z-10 animate-fadeIn px-4 sm:px-0">
        
        {/* Logo */}
        <div className="w-40 h-40 mb-5 flex items-center justify-center">
          <img src={logo} alt="Bijli Buddy Logo" className="w-full h-full object-contain" />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-8 animate-fadeIn opacity-0">
          Welcome Back
        </h1>

        {/* Form */}
        <div className="w-full bg-white/95 rounded-2xl p-6 shadow-md animate-fadeIn opacity-0">
          
          {/* Email */}
          <div className="flex items-center bg-gray-100 border-2 border-gray-300 rounded-xl mb-4 px-3 focus-within:border-[#14B8A6] transition">
            <Mail className="text-gray-500 mr-3" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent outline-none py-4 text-gray-900 placeholder-gray-400"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-gray-100 border-2 border-gray-300 rounded-xl mb-4 px-3 focus-within:border-[#14B8A6] transition">
            <Lock className="text-gray-500 mr-3" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent outline-none py-4 text-gray-900 placeholder-gray-400"
              autoComplete="current-password"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-4 mt-2 text-white font-bold text-lg rounded-xl shadow-md transition-transform duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#1EB6BA] to-[#24D1B2] hover:scale-105"
            }`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          {/* Sign Up */}
          <div className="text-center mt-5">
            <button
              onClick={handleSignUp}
              className="text-gray-500 text-sm hover:text-[#0F766E] transition"
            >
              Don’t have an account?{" "}
              <span className="font-bold text-[#0F766E]">Sign Up</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        `}
      </style>
    </div>
  );
};

export default LoginScreen;
