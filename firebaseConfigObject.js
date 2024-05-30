// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCdVNrmJIJ1__FZA9-1H50ZmXiwqD7whH4",

  authDomain: "field-form-generator.firebaseapp.com",

  projectId: "field-form-generator",

  storageBucket: "field-form-generator.appspot.com",

  messagingSenderId: "480037229115",

  appId: "1:480037229115:web:ce161b15b19a309018021e",

  measurementId: "G-SRDXVVY0P8"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);