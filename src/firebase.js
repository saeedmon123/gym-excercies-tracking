// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBifA9up2D3pPdOPXC7Ys-DbKqIBgmSoOg",
    authDomain: "labsession7-2a036.firebaseapp.com",
    projectId: "labsession7-2a036",
    storageBucket: "labsession7-2a036.firebasestorage.app",
    messagingSenderId: "1009585775177",
    appId: "1:1009585775177:web:895ee557bd3ce876075598",
    measurementId: "G-4WH9LKEHFM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
