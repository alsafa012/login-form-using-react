// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw1A5I19uqTxnh4AhMXxZH5RTmiiu6WRw",
  authDomain: "login-form-using-react-15ee5.firebaseapp.com",
  projectId: "login-form-using-react-15ee5",
  storageBucket: "login-form-using-react-15ee5.appspot.com",
  messagingSenderId: "861029448179",
  appId: "1:861029448179:web:fe37487e12695a01d67a86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;