// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIeTEgoT48ZjqvtmJD4Ckpw1kig0JnpD0",
  authDomain: "streamzy-ae511.firebaseapp.com",
  projectId: "streamzy-ae511",
  storageBucket: "streamzy-ae511.appspot.com",
  messagingSenderId: "525147906795",
  appId: "1:525147906795:web:f600fb662f0fa577bd54ae",
  measurementId: "G-NMYF2NJQ3E",
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

export { app, db, analytics };
