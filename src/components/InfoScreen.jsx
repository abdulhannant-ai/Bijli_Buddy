import React from "react";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icon.png";

export default function InfoScreen() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/login");
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#E0F2F1] via-[#B2DFDB] to-[#80CBC4]">
      {/* Background Circles */}
      <div className="absolute top-1/4 right-1/4 w-36 h-36 bg-[#0F766E] rounded-full opacity-70 blur-xl"></div>
      <div className="absolute top-1/2 left-[300px] w-28 h-28 bg-[#14B8A6] rounded-full opacity-60 blur-xl"></div>
      <div className="absolute bottom-1/4 right-[200px] w-40 h-40 bg-[#06B6D4] rounded-full opacity-80 blur-xl"></div>
      <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-[#0D9488] rounded-full opacity-70 blur-xl"></div>
      {/* Main Image */}
      <img
        src={icon}
        alt="Bijli Buddy"
        className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain animate-fade-in mb-5"
      />

      {/* Text Container */}
      <div className="bg-white/95 rounded-3xl shadow-lg max-w-md w-11/12 p-6 text-center animate-fade-in delay-300">
        <h1 className="text-[#0E5E5F] font-bold text-2xl md:text-3xl mb-2">Smart Energy, Simplified</h1>
        <p className="text-[#334155] text-sm md:text-base leading-6">
          Monitor your usage, save electricity, and optimize your power like never before.
        </p>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="mt-6 bg-gradient-to-r from-[#1EB6BA] to-[#24D1B2] text-white font-bold text-lg md:text-xl px-14 py-4 rounded-xl shadow-md hover:shadow-lg transition-all animate-fade-in delay-500"
      >
        Continue
      </button>

      {/* Tailwind animations */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fadeIn 1s ease-out forwards; }

          @keyframes bounceSlow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce-slow { animation: bounceSlow 6s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
}