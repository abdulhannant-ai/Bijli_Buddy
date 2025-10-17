import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import weatherImage from "../assets/weather.png";
import {
  homeOutline,
  barChartOutline,
  flashOutline,
  sunnyOutline,
  personCircleOutline,
} from "ionicons/icons";

export default function WeatherScreen() {
  const [activeTab, setActiveTab] = useState("Weather");

  return (
    <div className="relative flex min-h-screen bg-gradient-to-b from-[#E0F2F1] via-[#B2DFDB] to-[#80CBC4] overflow-hidden">
      {/* Background Circles */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#0F766E] rounded-full opacity-70 blur-xl"></div>
      <div className="absolute top-1/2 left-[15%] w-24 h-24 bg-[#14B8A6] rounded-full opacity-60 blur-xl"></div>
      <div className="absolute bottom-1/4 right-[10%] w-36 h-36 bg-[#06B6D4] rounded-full opacity-80 blur-xl"></div>
      <div className="absolute bottom-1/4 left-1/2 w-28 h-28 bg-[#0D9488] rounded-full opacity-70 blur-xl"></div>

      {/* Sidebar / Navbar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      {/* Main Content */}
<div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-4 py-8 mx-auto gap-10 md:flex-row md:justify-center md:items-center mt-16 md:mt-0">

  {/* Weather Illustration */}
  <motion.img
    src={weatherImage}
    alt="Weather Illustration"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="w-48 sm:w-60 md:w-72 lg:w-80 h-auto object-contain md:mr-12 mb-6 md:mb-0 mt-8 md:mt-0"
  />

  {/* Weather Card */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    className="bg-[#0F766E] border border-[#0F766E]/50 rounded-2xl shadow-xl text-white w-full sm:w-96 md:w-[400px] px-6 py-8 text-center flex flex-col items-center"
  >
    <p className="text-[#E2E8F0] text-xl md:text-2xl font-semibold mb-4">
      Weather Update
    </p>

    <div className="space-y-3">
      <div className="flex items-center justify-center space-x-3">
        <span className="text-[#14b8a6] text-lg md:text-xl">🌡</span>
        <span className="text-[#e2e8f0] text-sm md:text-lg">
          Temperature: 32°C
        </span>
      </div>

      <div className="flex items-center justify-center space-x-3">
        <span className="text-[#14b8a6] text-lg md:text-xl">⛅</span>
        <span className="text-[#e2e8f0] text-sm md:text-lg">
          Condition: Partly Cloudy
        </span>
      </div>

      <div className="flex items-center justify-center space-x-3">
        <span className="text-[#14b8a6] text-lg md:text-xl">💧</span>
        <span className="text-[#e2e8f0] text-sm md:text-lg">
          Humidity: 65%
        </span>
      </div>

      <div className="flex items-center justify-center space-x-3">
        <span className="text-[#14b8a6] text-lg md:text-xl">🕒</span>
        <span className="text-[#e2e8f0] text-sm md:text-lg">
          Sunrise: 6:15 AM | Sunset: 6:45 PM
        </span>
      </div>
    </div>
  </motion.div>
</div>
    </div>
  );
}
