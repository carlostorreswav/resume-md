
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhVNVGkPJztQoRhAn1vWWRVbYom2gVXBo",
  authDomain: "resumemd-2c280.firebaseapp.com",
  projectId: "resumemd-2c280",
  storageBucket: "resumemd-2c280.appspot.com",
  messagingSenderId: "337532672383",
  appId: "1:337532672383:web:718886edf77c8a1691224a"
};

// Initialize Firebase
export const firebaseHandler = initializeApp(firebaseConfig);