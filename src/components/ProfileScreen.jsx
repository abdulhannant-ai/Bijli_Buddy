import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { useUser } from "../context/UserContext";
import { auth, db } from "../config/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import profileImage from "../assets/profile.png";

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState("Profile");
  const { userData: contextUserData } = useUser();
  const [userData, setUserData] = useState(contextUserData || null);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.warn("⚠️ No user document found in Firestore");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const formatKey = (key) =>
    key
      ? key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
      : "";

  const appliancesArray = userData?.appliances
    ? Object.entries(userData.appliances).filter(([, count]) => count > 0)
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium text-gray-700">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen bg-gradient-to-b from-[#E0F2F1] via-[#B2DFDB] to-[#80CBC4] overflow-x-hidden">
      {/* Background Circles */}
      <div className="absolute z-0 top-1/4 right-1/4 w-36 h-36 bg-[#0F766E] rounded-full opacity-70 blur-xl"></div>
      <div className="absolute z-0 top-1/2 left-[300px] w-28 h-28 bg-[#14B8A6] rounded-full opacity-60 blur-xl"></div>
      <div className="absolute z-0 bottom-1/4 right-[200px] w-40 h-40 bg-[#06B6D4] rounded-full opacity-80 blur-xl"></div>
      <div className="absolute z-0 bottom-1/4 left-1/2 w-32 h-32 bg-[#0D9488] rounded-full opacity-70 blur-xl"></div>

      {/* Sidebar / Navbar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col justify-center items-center px-4 py-8 mt-16 w-full max-w-4xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center justify-center">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#0F766E] border border-[#0F766E]/50 rounded-2xl px-5 py-12 shadow-xl text-white w-full text-center justify-center items-center h-auto"
          >
            <div className="flex justify-center mb-4">
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-[#00E0B8]"
              />
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-[#00E0B8] text-xl md:text-2xl font-bold">
                {userData?.username || userData?.name || "N/A"}
              </span>
              <span className="text-[#e2e8f0] text-base md:text-lg">
                {auth.currentUser?.email || userData?.email || "N/A"}
              </span>
            </div>
            <div className="w-full mt-4 space-y-2">
              <div className="flex items-center space-x-3 justify-center">
                <span className="text-[#00E0B8] text-lg">📍</span>
                <span className="text-white text-base md:text-lg">
                  {userData?.location || "Location Unknown"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Appliance Usage Card */}
          {appliancesArray.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[#0F766E] border border-[#0F766E]/50 rounded-2xl px-5 py-12 shadow-xl text-white h-full text-center justify-center items-center w-full"
            >
              <h2 className="text-[#00E0B8] text-xl font-bold mb-4 text-center">
                Appliance Usage 💡
              </h2>
              <div className="grid grid-cols-2 gap-4 text-white">
                {appliancesArray.map(([key, count]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center bg-[#334155] p-3 rounded-lg shadow-inner"
                  >
                    <span className="text-sm md:text-base font-medium">
                      {formatKey(key)}
                    </span>
                    <span className="text-lg font-bold text-[#A7F3D0]">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
