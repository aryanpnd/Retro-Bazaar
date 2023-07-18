import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHcZKWX-RVl4HYSbpkqiC-osPLis-6dd4",
  authDomain: "retro-baazar.firebaseapp.com",
  projectId: "retro-baazar",
  storageBucket: "retro-baazar.appspot.com",
  messagingSenderId: "919609431623",
  appId: "1:919609431623:web:751e1c03854d8d4dc2c362",
  measurementId: "G-M6DNMV79FK",
};

// initialize firebase app
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
