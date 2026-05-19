// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Kita masukin langsung nilainya di sini buat ngetes (tanpa process.env)
const firebaseConfig = {
  apiKey: "AIzaSyBm11lWGZXYiP3CJ-VuaoAU1XZfKQRGbxg",
  authDomain: "chat-apps-4e323.firebaseapp.com",
  projectId: "chat-apps-4e323",
  storageBucket: "chat-apps-4e323.firebasestorage.app",
  messagingSenderId: "620299224627",
  appId: "1:620299224627:web:4b40cfee9d2372f0d04546",
  measurementId: "G-2ZY4FMZ80T"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;