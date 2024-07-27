import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBONWF3jjiXeg9w0MM66N3pfSFK9B72uGg",
  authDomain: "ojichat-46e25.firebaseapp.com",
  projectId: "ojichat-46e25",
  storageBucket: "ojichat-46e25.appspot.com",
  messagingSenderId: "2560028230",
  appId: "1:2560028230:web:e07e1891861c5c36a62447",
  measurementId: "G-QPDHNNH5M0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
