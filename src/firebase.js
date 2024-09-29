// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC84yEXTvhQD3Ptrvr4UQiXDr3W3ZXWNzU",
  authDomain: "astraordinaryphotography.firebaseapp.com",
  projectId: "astraordinaryphotography",
  storageBucket: "astraordinaryphotography.appspot.com",
  messagingSenderId: "526758067233",
  appId: "1:526758067233:web:20873f3068586466dd3760",
  measurementId: "G-V26E2S6Q55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
