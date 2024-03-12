import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyASM71rjL_C_LxvB51cHsd2tzy4iThoq-A",
  authDomain: "petpawrents-dec18.firebaseapp.com",
  projectId: "petpawrents-dec18",
  storageBucket: "petpawrents-dec18.appspot.com",
  messagingSenderId: "359001820533",
  appId: "1:359001820533:web:87d51f8ba1a09c5037173c",
  measurementId: "G-KL2SL1XPPS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase storage reference
export const db = getDatabase(app);
export const storage = getStorage();

export default storage;
