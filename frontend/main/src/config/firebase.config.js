import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmKBqI2PcIAJz5IErqylWqx_1J_3VvqQk",
  authDomain: "retro-bazaar.firebaseapp.com",
  projectId: "retro-bazaar",
  storageBucket: "retro-bazaar.appspot.com",
  messagingSenderId: "1056087745103",
  appId: "1:1056087745103:web:ab621c9cb4a75396c0803a",
  measurementId: "G-C60WT9ZMXT"
};

// initialize firebase app
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
