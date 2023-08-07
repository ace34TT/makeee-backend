/* eslint-disable linebreak-style */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDSYGLD3sAR-WQQSlYaZUKeknstjX_6wI",
  authDomain: "makee-36c7f.firebaseapp.com",
  projectId: "makee-36c7f",
  storageBucket: "makee-36c7f.appspot.com",
  messagingSenderId: "417225664277",
  appId: "1:417225664277:web:bee98d296448b182caeb1c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
var firestore = getFirestore(app);
export { app, auth, storage, firestore };
