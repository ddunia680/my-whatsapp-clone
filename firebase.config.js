// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');
require('dotenv').config();


const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: "upload-files-4592a.firebaseapp.com",
    projectId: "upload-files-4592a",
    storageBucket: "upload-files-4592a.appspot.com",
    messagingSenderId: "900269620749",
    appId: "1:900269620749:web:af3a2b23b8b2dcc1905f44"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
module.exports = getStorage(app);