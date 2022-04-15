// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhqO2V3Ey8m78mfY0TpS_BBpUxKNqCjaw",
  authDomain: "allert-46d4e.firebaseapp.com",
  projectId: "allert-46d4e",
  storageBucket: "allert-46d4e.appspot.com",
  messagingSenderId: "1044235995442",
  appId: "1:1044235995442:web:bf54910cd7578d2f602f2b"
};

// Initialize firebase
const app = initializeApp(firebaseConfig);
// initialize auth
const auth = getAuth();
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut };