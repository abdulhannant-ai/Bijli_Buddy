import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import predictionImage from "../assets/prediction.png";
import {
  homeOutline,
  barChartOutline,
  flashOutline,
  sunnyOutline,
  personCircleOutline,
} from "ionicons/icons";

export default function PredictScreen() {
  const [activeTab, setActiveTab] = useState("Predict");

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#E0F2F1] via-[#B2DFDB] to-[#80CBC4] relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute top-1/4 right-1/4 w-36 h-36 bg-[#0F766E] rounded-full opacity-70 blur-xl"></div>
      <div className="absolute top-1/2 left-[300px] w-28 h-28 bg-[#14B8A6] rounded-full opacity-60 blur-xl"></div>
      <div className="absolute bottom-1/4 right-[200px] w-40 h-40 bg-[#06B6D4] rounded-full opacity-80 blur-xl"></div>
      <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-[#0D9488] rounded-full opacity-70 blur-xl"></div>

      {/* Sidebar / Navbar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4 md:p-6 mt-20 md:mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
          
          {/* Prediction Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-[#0F766E] border border-[#0F766E]/50 rounded-2xl px-6 py-8 sm:px-8 sm:py-12 shadow-xl text-white text-center h-auto w-full"
          >
            <p className="text-[#E2E8F0] text-base sm:text-lg md:text-xl font-medium">
              Predicted Units
            </p>
            <p className="text-[#00E0B8] text-xl sm:text-2xl md:text-3xl font-bold mt-1">
              325 kWh
            </p>

            <p className="text-[#E2E8F0] text-base sm:text-lg md:text-xl font-medium mt-4">
              Estimated Bill
            </p>
            <p className="text-[#00E0B8] text-xl sm:text-2xl md:text-3xl font-bold mt-1">
              Rs. 5,980
            </p>

            <p className="text-white text-sm sm:text-base mt-4 leading-relaxed">
              💡 Tip: Using heavy appliances after 10 PM can lower your cost by
              up to <span className="text-[#00E0B8] font-bold">15%</span>.
            </p>
          </motion.div>

          {/* Prediction Illustration */}
          <motion.img
            src={predictionImage}
            alt="Prediction Illustration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-48 sm:w-65 md:w-72 lg:w-80 h-auto object-contain mx-auto mt-5 md:mt-0"
          />
        </div>
      </div>
    </div>
  );
}
