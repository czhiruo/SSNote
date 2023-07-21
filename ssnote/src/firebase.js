import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyCBFudqAjf1J3Tfa0XYcsk2_Ivw_7v93gQ",
  authDomain: "ssnote-65915.firebaseapp.com",
  projectId: "ssnote-65915",
  storageBucket: "ssnote-65915.appspot.com",
  messagingSenderId: "439678787251",
  appId: "1:439678787251:web:3335b328703ffa97fc9ac6",
  measurementId: "G-D9G6YBY863"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, auth };