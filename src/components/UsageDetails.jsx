import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  homeOutline,
  barChartOutline,
  flashOutline,
  sunnyOutline,
  personCircleOutline,
} from "ionicons/icons";
import UsageImage from "../assets/usage.png";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const menuItems = [
  { name: "Dashboard", icon: homeOutline, path: "/dashboard" },
  { name: "Usage", icon: barChartOutline, path: "/usage" },
  { name: "Predict", icon: flashOutline, path: "/predict" },
  { name: "Weather", icon: sunnyOutline, path: "/weather" },
  { name: "Profile", icon: personCircleOutline, path: "/profile" },
];

export default function UsageDetails() {
  const [activeTab, setActiveTab] = useState("Usage");

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Usage (kWh)",
        data: [10, 12, 8, 14, 11, 13, 9],
        borderColor: "#00E0B8",
        backgroundColor: "rgba(0, 181, 173, 0.3)",
        pointBorderColor: "#00E0B8",
        pointBackgroundColor: "#00B5AD",
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { color: "rgba(255,255,255,0.8)" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: { color: "rgba(255,255,255,0.8)" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-[#E0F2F1] via-[#B2DFDB] to-[#80CBC4] relative overflow-hidden">

      {/* Background Circles */}
      <div className="absolute top-1/4 right-1/4 w-28 h-28 bg-[#0F766E] rounded-full opacity-70 blur-2xl"></div>
      <div className="absolute top-1/2 left-[20%] w-20 h-20 bg-[#14B8A6] rounded-full opacity-60 blur-2xl"></div>
      <div className="absolute bottom-1/4 right-[15%] w-32 h-32 bg-[#06B6D4] rounded-full opacity-80 blur-2xl"></div>
      <div className="absolute bottom-1/4 left-1/2 w-28 h-28 bg-[#0D9488] rounded-full opacity-70 blur-2xl"></div>

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 md:px-8 py-6 pt-20 md:pt-10">
        {/* pt-20 ensures the content starts below navbar on mobile */}

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Usage Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center"
          >
            <img
              src={UsageImage}
              alt="Usage Illustration"
              className="w-36 sm:w-44 md:w-43 lg:w-47 xl:w-57 h-auto object-contain drop-shadow-lg"
            />
          </motion.div>

          {/* Chart Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-[#0F766E] border border-[#0F766E]/50 rounded-2xl w-full p-4 sm:p-6 md:p-8 text-center shadow-xl"
          >
            <h2 className="text-[#E2E8F0] text-lg sm:text-xl md:text-2xl font-semibold mb-3 md:mb-4">
              📊 Weekly Usage Overview
            </h2>
            <div className="w-full h-[220px] sm:h-[260px] md:h-[320px] lg:h-[380px]">
              <Line data={data} options={options} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
