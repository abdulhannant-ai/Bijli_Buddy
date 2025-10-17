import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { IonIcon } from "@ionic/react";
import {
  sunnyOutline,
  flashOutline,
  trendingUp,
  sparklesOutline,
} from "ionicons/icons";
import { auth, db } from "../config/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import quicktip from "../assets/quick-tip.png";

export default function Dashboard() {
  const [aiResponse, setAiResponse] = useState("");
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingAI, setLoadingAI] = useState(false);
  const [displayedAdvice, setDisplayedAdvice] = useState([]);

  const [monthlyUnits] = useState(320);
  const [nextSlabUnits] = useState(12.4);
  const [aiTemperature] = useState("28°C");

  // 🔹 All possible fallback energy-saving advice sets
  const adviceList = [
  [
    "Avoid using heavy appliances like water motors, irons, or washing machines during peak hours (6 PM–10 PM).",
    "Run high-load devices early morning or after 10 PM to reduce stress on your connection.",
    "Use inverter-based appliances — they adjust power usage automatically and save up to 40%.",
    "Install a digital energy meter to track daily electricity consumption.",
  ],
  [
    "Buy ceiling fans that consume 120 watts or less — or switch to AC/DC or brushless (BLDC) fans using only 35–50 watts.",
    "Replace old, noisy fans — older ones often waste 30% more electricity.",
    "Lubricate fan bearings every 6 months for smoother operation and better efficiency.",
    "Clean fan blades monthly — dust buildup increases power draw.",
  ],
  [
    "Keep AC temperature at 26°C — it’s the most efficient cooling level for Pakistan’s climate.",
    "Prefer inverter ACs — they consume 40–50% less power than normal ACs.",
    "Regularly clean AC filters to maintain cooling efficiency.",
    "Use ceiling fans along with AC to circulate air evenly and reduce cooling time.",
  ],
  [
    "Don’t overload the refrigerator — proper air circulation improves cooling efficiency.",
    "Buy energy-efficient fridges rated below 250 watts or with inverter compressors.",
    "Avoid keeping the fridge near sunlight or walls — it forces the compressor to run longer.",
    "Defrost regularly — ice buildup increases power usage.",
  ],
  [
    "Switch to LED bulbs and tube lights — they consume 80% less power and last 10x longer.",
    "Use daylight sensors or timers for outdoor lights.",
    "Install dimmer switches to control brightness in living rooms.",
    "Replace 100W bulbs with 12W LEDs to save around 300 units annually per bulb.",
  ],
  [
    "Use washing machines rated under 500 watts with inverter motors.",
    "Run full loads only — small loads waste water and power.",
    "Air dry clothes instead of using electric dryers.",
    "Iron clothes in batches and during off-peak hours (before 6 PM or after 10 PM).",
  ],
  [
    "Seal all windows and doors properly to reduce cooling/heating loss.",
    "Use insulation sheets on rooftops to lower summer heat inside rooms.",
    "Install reflective window films to reduce sunlight and AC usage.",
    "Use draft stoppers or rubber seals to block air leaks.",
  ],
  [
    "Use smart plugs or timer sockets to auto-off devices like geysers or motors.",
    "Install surge protectors to prevent damage and wasted energy during voltage spikes.",
    "Keep wiring updated — loose connections increase resistance and waste electricity.",
    "Monitor monthly bill trends and track appliance usage using smart meters.",
  ],
  [
    "Avoid using geysers for long — heat only what’s needed, or switch to instant geysers (1.5–2 kW).",
    "Install solar panels for lights, fans, and small appliances to reduce daytime load.",
    "Use solar hybrid inverters to automatically shift between grid and solar.",
    "Keep batteries in good condition — weak batteries force inverters to draw extra current.",
  ],
  [
    "Service your AC, fans, and refrigerator before summer season starts.",
    "Clean or replace air filters and coils to maintain performance.",
    "Replace old induction motors with energy-efficient (IE3 or inverter) models.",
    "Check and balance load across phases to avoid overconsumption and tripping.",
  ],
];


  // 🔹 Fetch AI advice from backend (with 3 sec delay + fallback random)
  const getAdvice = async () => {
    if (!userData) return;

    setLoadingAI(true);
    setAiResponse("");
    setDisplayedAdvice([]);

    // Artificial 3-second loading
    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      const response = await fetch("http://localhost:5000/get-ai-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: userData.location,
          appliances: userData.appliances,
        }),
      });

      const data = await response.json();

      if (data.advice && data.advice.trim() !== "No response from AI") {
        setAiResponse(data.advice);
      } else {
        // Show random fallback advice set
        const randomSet =
          adviceList[Math.floor(Math.random() * adviceList.length)];
        setDisplayedAdvice(randomSet);
      }
    } catch (err) {
      console.error(err);
      // On API failure, show random fallback
      const randomSet =
        adviceList[Math.floor(Math.random() * adviceList.length)];
      setDisplayedAdvice(randomSet);
    } finally {
      setLoadingAI(false);
    }
  };

  // 🔹 Fetch user data from Firestore
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
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, []);

  const calculateBill = (units) => {
    if (units <= 199) return 400;
    if (units <= 399) return 800;
    if (units <= 599) return 1200;
    if (units <= 799) return 1600;
    if (units <= 999) return 2000;
    return 2000 + Math.ceil((units - 999) / 200) * 400;
  };

  const monthlyBill = calculateBill(monthlyUnits);
  const predictedBill = monthlyBill + 200;

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium text-gray-700">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-[#E0F2F1] via-[#B2DFDB] to-[#80CBC4] overflow-hidden">
      {/* Background Circles */}
      <div className="absolute top-1/4 right-1/4 w-24 h-24 sm:w-36 sm:h-36 bg-[#0F766E] rounded-full opacity-70 blur-xl"></div>
      <div className="absolute top-1/3 left-[30%] w-16 h-16 sm:w-28 sm:h-28 bg-[#14B8A6] rounded-full opacity-60 blur-xl"></div>
      <div className="absolute bottom-1/4 right-[10%] w-28 h-28 sm:w-40 sm:h-40 bg-[#06B6D4] rounded-full opacity-80 blur-xl"></div>
      <div className="absolute bottom-0 left-1/2 w-24 h-24 sm:w-32 sm:h-32 bg-[#0D9488] rounded-full opacity-90 blur-xl"></div>

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-grow p-4 pt-20 md:pt-8 bg-emerald-50/50 overflow-y-auto z-10">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F766E] mb-2 sm:mb-0">
              Welcome, {userData?.username || userData?.name || "User"}
            </h1>
            <div className="flex items-center text-gray-700">
              <IonIcon
                icon={sunnyOutline}
                className="text-xl mr-2 text-yellow-500"
              />
              <span className="font-semibold text-base sm:text-lg">
                {aiTemperature}
              </span>
            </div>
          </header>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              { title: "Next Slab In", value: `${nextSlabUnits} units`, icon: flashOutline },
              { title: "This Month", value: `${monthlyUnits} units`, icon: flashOutline },
              { title: "Predicted Bill", value: `Rs. ${predictedBill}`, icon: trendingUp },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 shadow-lg border-t-4 border-teal-500"
              >
                <IonIcon icon={card.icon} className="text-teal-500 text-2xl" />
                <p className="text-base sm:text-lg font-medium text-gray-700 mt-2">
                  {card.title}
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-600 mt-1">
                  {card.value}
                </h2>
              </div>
            ))}
          </div>

          {/* Quick Tip / AI Advice */}
          <div className="bg-[#0F766E] border border-[#0F766E]/50 rounded-2xl p-5 sm:p-6 shadow-xl text-white flex flex-col sm:flex-row items-start sm:items-stretch gap-4">
            <div className="w-full sm:w-[70%]">
              <div className="flex items-center mb-3">
                <IonIcon
                  icon={sparklesOutline}
                  className="text-white text-2xl"
                />
                <h2 className="ml-2 text-lg sm:text-xl font-bold">AI Advice</h2>
              </div>

              <button
                onClick={getAdvice}
                className="bg-teal-500 text-white px-4 py-2 rounded font-bold hover:bg-teal-600 transition mb-4"
              >
                Get AI Energy Advice
              </button>

              {loadingAI && <p className="text-gray-200/80">Loading...</p>}

              {/* Show AI or fallback advice */}
              {!loadingAI && aiResponse && (
                <div className="mt-4 p-4 bg-gray-50/20 rounded border border-gray-200/30 text-gray-100">
                  {aiResponse.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              )}

              {!loadingAI && displayedAdvice.length > 0 && (
                <ul className="list-disc pl-5 space-y-2 text-gray-200/90 text-base sm:text-lg">
                  {displayedAdvice.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="w-full sm:w-[30%] flex justify-center sm:justify-end mt-3 sm:mt-0">
              <img
                src={quicktip}
                alt="Quick Tip Illustration"
                className="rounded-xl object-contain max-h-40 sm:max-h-56 w-auto sm:w-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
