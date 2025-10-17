import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../config/firebase.js"; // ✅ make sure firebase.js exports auth & db
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Create Context
const UserContext = createContext();

// Custom Hook to use UserContext
export const useUser = () => useContext(UserContext);

// Provider Component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Save new user data (after signup)
  const signupUser = async (data) => {
    try {
      if (!data.email) return console.error("Email missing in signupUser");

      const userRef = doc(db, "users", data.email);
      await setDoc(userRef, {
        name: data.name || "",
        email: data.email,
        location: data.location || "",
        appliances: data.appliances || [],
        createdAt: new Date().toISOString(),
      });

      setUserData({
        name: data.name,
        email: data.email,
        location: data.location,
        appliances: data.appliances,
      });
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  // Load user data automatically when Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        const userRef = doc(db, "users", user.email);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData({
            email: user.email,
            name: user.displayName || "",
          });
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const contextValue = {
    userData,
    signupUser,
    loading,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {!loading && children}
    </UserContext.Provider>
  );
};
