import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "vertualui.firebaseapp.com",
  projectId: "vertualui",
  storageBucket: "vertualui.firebasestorage.app",
  messagingSenderId: "241184896934",
  appId: "1:241184896934:web:a241a1ea09c8ebb7d44167"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}