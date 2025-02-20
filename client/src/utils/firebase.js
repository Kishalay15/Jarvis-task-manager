// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "jarvistm-c60cf.firebaseapp.com",
  projectId: "jarvistm-c60cf",
  storageBucket: "jarvistm-c60cf.firebasestorage.app",
  messagingSenderId: "889916482212",
  appId: "1:889916482212:web:4ba5bdcc07337c23a13c31",
  measurementId: "G-0F67RF3Q6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
