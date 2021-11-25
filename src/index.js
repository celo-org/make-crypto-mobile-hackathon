import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBks_18ayUtgY2nAOLi3DYe8ARGG4KCShY",
  authDomain: "tumicro-1203.firebaseapp.com",
  databaseURL: "https://tumicro-1203.firebaseio.com",
  projectId: "tumicro-1203",
  storageBucket: "tumicro-1203.appspot.com",
  messagingSenderId: "341269335857",
  appId: "1:341269335857:web:9f49478d06096617d22a10",
  measurementId: "G-FW65VSM068"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
