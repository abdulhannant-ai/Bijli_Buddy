import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/Bijli-Buddy.png";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import {
  homeOutline,
  barChartOutline,
  flashOutline,
  sunnyOutline,
  personCircleOutline,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";



const menuItems = [
  { name: "Dashboard", icon: homeOutline, path: "/dashboard" },
  { name: "Usage", icon: barChartOutline, path: "/usage" },
  { name: "Predict", icon: flashOutline, path: "/predict" },
  { name: "Weather", icon: sunnyOutline, path: "/weather" },
  { name: "Profile", icon: personCircleOutline, path: "/profile" },
];

export default function Sidebar({ activeTab, setActiveTab }) {

    const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/login"); // redirect to login page
  } catch (error) {
    console.error("Logout error:", error);
    alert("Failed to logout. Try again.");
  }
};

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 📱 Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#0F766E] text-white flex justify-between items-center px-6 py-4 z-50">
        {/* Logo (mobile visible) */}
        <div className="flex items-center">
          <img src={logo} alt="Bijli Buddy Logo" className="h-8 w-auto" />
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none z-[60]"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 💻 Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-shrink-0 bg-[#0F766E] shadow-xl pt-6 pb-4 flex-col items-start z-10">
        {/* Logo at top */}
        <div className="flex items-center px-6 mb-8">
          <img src={logo} alt="Bijli Buddy Logo" className="h-12 w-auto" />
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col w-full px-4 mt-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center w-full px-4 py-3 my-1 rounded-xl text-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-b from-[#E0F2F1] via-[#B2DFDB] to-[#80CBC4] text-[#0F766E] shadow-md"
                    : "text-teal-200 hover:bg-teal-700 hover:text-white"
                }`}
              >
                <IonIcon icon={item.icon} className="text-xl mr-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        {/* Logout Button */}
      <div className="w-full px-4 py-4 border-t border-gray-200 mt-auto">
        <button
          onClick={handleLogout}
            className="w-full py-2 mt-2 text-white font-bold text-lg rounded-xl shadow-md transition-transform duration-300"
        >
          <span>Logout</span>
        </button>
      </div>
      </div>

      {/* 📱 Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 left-0 h-screen w-64 bg-[#0F766E] text-white z-50 flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              {/* ✅ Removed extra cross icon */}
              <div className="flex items-center justify-center p-4 border-b border-teal-800">
                <img src={logo} alt="Bijli Buddy Logo" className="h-8 w-auto" />
              </div>

              <ul className="flex flex-col gap-6 text-lg p-6">
                {menuItems.map((item) => (
                    <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    >
                    <Link
                        to={item.path}
                        onClick={() => {
                        setActiveTab(item.name);
                        setIsOpen(false);
                        }}
                        className={`flex items-center gap-3 hover:text-cyan-200 transition-all ${
                        activeTab === item.name ? "text-cyan-100 font-semibold" : "text-white"
                        }`}
                    >
                        <IonIcon icon={item.icon} className="text-xl" />
                        {item.name}
                    </Link>
                    </motion.li>
                ))}
                </ul>
                {/* Logout Button */}
            <div className="px-4 py-4 border-t border-gray-200 mt-auto">
         <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 text-red-500 font-semibold hover:bg-red-100 rounded-xl py-3 transition"
        >
          <span>Logout</span>
        </button>
      </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
