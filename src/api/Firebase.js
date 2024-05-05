
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getDatabase} from 'firebase/database'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHDpXnYSPc5VJrRSIN21XK7bZaW-0__IE",
  authDomain: "e-commerce-9e06c.firebaseapp.com",
  databaseURL: "https://e-commerce-9e06c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "e-commerce-9e06c",
  storageBucket: "e-commerce-9e06c.appspot.com",
  messagingSenderId: "970796347720",
  appId: "1:970796347720:web:bee1f0423c2fc6d0e4037d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getDatabase(app);
export const storage = getStorage(app);