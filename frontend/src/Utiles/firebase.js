import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nexus-ai-f5374.firebaseapp.com",
  projectId: "nexus-ai-f5374",
  storageBucket: "nexus-ai-f5374.firebasestorage.app",
  messagingSenderId: "654103737038",
  appId: "1:654103737038:web:22c6a1d9d6d8648953569f",
  measurementId: "G-9R4FH5SKXE"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();