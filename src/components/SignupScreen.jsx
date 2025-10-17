import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, MapPin } from "lucide-react";
import { auth, db } from "../config/firebase.js"; // ✅ Make sure firebase.js is configured
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignupScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const [appliances, setAppliances] = useState({
    fans: "",
    ac: "",
    lights: "",
    refrigerator: "",
    iron: "",
    washingMachine: "",
  });

  const applianceList = [
    { key: "fans", label: "Fans" },
    { key: "ac", label: "AC" },
    { key: "lights", label: "Lights" },
    { key: "refrigerator", label: "Refrigerator" },
    { key: "iron", label: "Iron" },
    { key: "washingMachine", label: "Washing Machine" },
  ];

  const handleApplianceChange = (key, value) => {
    setAppliances((prev) => ({ ...prev, [key]: value }));
  };

  const isGmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email);

  const handleSignup = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !location.trim() ||
      Object.values(appliances).some((v) => v.toString().trim() === "")
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!isGmail(email)) {
      alert("Only Gmail addresses are allowed (example@gmail.com)");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      // ✅ Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Prepare Data for Firestore
      const newUserData = {
        name,
        email,
        location,
        appliances: Object.fromEntries(
          Object.entries(appliances).map(([key, value]) => [key, parseInt(value) || 0])
        ),
        createdAt: new Date(),
      };

      // ✅ Store Data in Firestore
      await setDoc(doc(db, "users", user.uid), newUserData);

      alert("✅ Signup successful! Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#E0F2F1] via-[#B2DFDB] to-[#80CBC4] flex items-center justify-center relative overflow-y-auto p-6">
      {/* Background Circles */}
      <div className="absolute top-1/4 right-1/4 w-36 h-36 bg-[#0F766E] rounded-full opacity-70 blur-xl"></div>
      <div className="absolute top-1/2 left-[300px] w-28 h-28 bg-[#14B8A6] rounded-full opacity-60 blur-xl"></div>
      <div className="absolute bottom-1/4 right-[200px] w-40 h-40 bg-[#06B6D4] rounded-full opacity-80 blur-xl"></div>
      <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-[#0D9488] rounded-full opacity-70 blur-xl"></div>

      {/* Signup Card */}
      <div className="relative bg-white/90 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-md p-8 z-10 animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Create Account
        </h1>

        {/* Full Name */}
        <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 px-4 mb-3 focus-within:border-teal-500 transition">
          <User size={20} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-3 bg-transparent outline-none text-gray-800"
          />
        </div>

        {/* Email */}
        <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 px-4 mb-3 focus-within:border-teal-500 transition">
          <Mail size={20} className="text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Email (Gmail only)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 bg-transparent outline-none text-gray-800"
          />
        </div>

        {/* Password */}
        <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 px-4 mb-3 focus-within:border-teal-500 transition">
          <Lock size={20} className="text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 bg-transparent outline-none text-gray-800"
          />
        </div>

        {/* Location */}
        <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 px-4 mb-3 focus-within:border-teal-500 transition">
          <MapPin size={20} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Location (Area)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full py-3 bg-transparent outline-none text-gray-800"
          />
        </div>

        {/* Appliances Section */}
        <div className="mt-5">
          <h3 className="text-lg font-semibold text-teal-700 mb-3">
            Appliances in Use
          </h3>
          {applianceList.map((item) => (
            <div
              key={item.key}
              className="flex justify-between items-center mb-2"
            >
              <label className="text-gray-700">{item.label}</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={appliances[item.key]}
                onChange={(e) =>
                  handleApplianceChange(item.key, e.target.value)
                }
                className="w-20 text-center border border-gray-300 rounded-lg py-1 px-2 focus:border-teal-500 outline-none"
              />
            </div>
          ))}
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full py-4 mt-2 text-white font-bold text-lg rounded-xl shadow-md transition-transform duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#1EB6BA] to-[#24D1B2] hover:scale-105"
          }`}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Login Redirect */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-teal-700 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupScreen;
