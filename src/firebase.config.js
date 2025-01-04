// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARyia1yOVSPCK9C3bdWJec0Zw2cJ3cawk",
  authDomain: "user-edustar.firebaseapp.com",
  projectId: "user-edustar",
  storageBucket: "user-edustar.appspot.com",
  messagingSenderId: "402384671910",
  appId: "1:402384671910:web:c23ef3635e66b121641067",
  measurementId: "G-5WTNVT4291"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);