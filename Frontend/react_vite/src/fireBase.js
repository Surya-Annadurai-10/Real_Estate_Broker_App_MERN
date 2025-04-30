// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjh0jCkTY7-wKKUdywBZBFWI8zjGyi1iU",
  authDomain: "mern-estate-bee48.firebaseapp.com",
  projectId: "mern-estate-bee48",
  storageBucket: "mern-estate-bee48.firebasestorage.app",
  messagingSenderId: "150740330336",
  appId: "1:150740330336:web:d6db7ae7db8da582d16005"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);