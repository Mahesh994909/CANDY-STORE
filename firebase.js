
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyAyVI_40j76Qmf9W6-kDw64HXbe7_rHBAw",
  authDomain: "candy-store-183df.firebaseapp.com",
  projectId: "candy-store-183df",
  storageBucket: "candy-store-183df.appspot.com",
  messagingSenderId: "845271294072",
  appId: "1:845271294072:web:6d3436bbf9b70cbd43cd8d",
  measurementId: "G-L50J3NTE1Q",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
