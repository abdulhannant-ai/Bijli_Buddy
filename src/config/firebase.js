// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcwaZXlBI9BRXSPRJ0qTEbQedjv504lEg",
  authDomain: "bijli-buddy-3fa88.firebaseapp.com",
  projectId: "bijli-buddy-3fa88",
  storageBucket: "bijli-buddy-3fa88.firebasestorage.app",
  messagingSenderId: "216891947075",
  appId: "1:216891947075:web:f39b03185148520a63bcf6",
  measurementId: "G-JYKWVSG1XW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// ✅ Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export for use in other files
export { auth, db };