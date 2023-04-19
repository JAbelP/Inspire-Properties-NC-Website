// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLbNiJlfIryXqmqTJx7L_2nJwNQMOs8oQ",
  authDomain: "inspire-properties-nc.firebaseapp.com",
  databaseURL: "https://inspire-properties-nc-default-rtdb.firebaseio.com",
  projectId: "inspire-properties-nc",
  storageBucket: "inspire-properties-nc.appspot.com",
  messagingSenderId: "735841424992",
  appId: "1:735841424992:web:383ed5ef6ad4e456895505",
  measurementId: "G-R79GWWQHMM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
