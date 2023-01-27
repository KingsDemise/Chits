// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth,signInWithEmailAndPassword,onAuthStateChanged,signOut} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb7WgMQPFpS_L7O7VPmK7cc6fmzRaenzE",
  authDomain: "remind-you-7f847.firebaseapp.com",
  projectId: "remind-you-7f847",
  storageBucket: "remind-you-7f847.appspot.com",
  messagingSenderId: "340209053585",
  appId: "1:340209053585:web:ae6ae1408fd6fb8bd9f430"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
export const db=getFirestore(app)
export {auth,signInWithEmailAndPassword,onAuthStateChanged,signOut};
