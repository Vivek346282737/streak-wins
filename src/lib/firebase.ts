import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, browserLocalPersistence, setPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHi4jOFkKhEdgB-ELI_7dc5bbkAaX6xgU",
  authDomain: "pactforlife.firebaseapp.com",
  projectId: "pactforlife",
  storageBucket: "pactforlife.firebasestorage.app",
  messagingSenderId: "890939534341",
  appId: "1:890939534341:web:88e15fe4ac2231c388006c",
  measurementId: "G-3DN4L4M51D",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Persist auth across reloads
setPersistence(auth, browserLocalPersistence).catch(() => {});
