import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDAnYQU6w6OUDifXkZThYEetBfnf9pry4U",
  authDomain: "vivaran-creations.firebaseapp.com",
  databaseURL: "https://vivaran-creations-default-rtdb.firebaseio.com",
  projectId: "vivaran-creations",
  storageBucket: "vivaran-creations.firebasestorage.app",
  messagingSenderId: "937324558606",
  appId: "1:937324558606:web:b2c4b2c8d30684391dff5f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});