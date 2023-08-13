import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDD9YoHYY6EAUYaN5idkbR85k4UTDwYnHs",
  authDomain: "retro-bazaar-5f9c0.firebaseapp.com",
  projectId: "retro-bazaar-5f9c0",
  storageBucket: "retro-bazaar-5f9c0.appspot.com",
  messagingSenderId: "697561791270",
  appId: "1:697561791270:web:26e3a0aeed78bb664b5fe7",
  measurementId: "G-FS3HPL0LCL"
};

// initialize firebase app
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
