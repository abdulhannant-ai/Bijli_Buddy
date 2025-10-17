import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoadingScreen from "./components/LoadingScreen";
import InfoScreen from "./components/InfoScreen";
import Login from "./components/LoginScreen";
import Signup from "./components/SignupScreen";
import Dashboard from "./components/DashboardScreen";
import UsageDetails from "./components/UsageDetails";
import PredictScreen from "./components/PredictScreen";
import WeatherScreen from "./components/WeatherScreen";
import ProfileScreen from "./components/ProfileScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/info" replace />} />
        <Route path="/info" element={<InfoScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usage" element={<UsageDetails />} />
        <Route path="/predict" element={<PredictScreen />} />
        <Route path="/weather" element={<WeatherScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
