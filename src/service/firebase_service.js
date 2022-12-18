require('dotenv').config();
import { initializeApp } from "firebase/app";


const {VUE_APP_FIREBASE_API_KEY,
  VUE_APP_FIREBASE_AUTH_DOMAIN,
  VUE_APP_FIREBASE_PREJECT_ID,
  VUE_APP_FIREBASE_STORAGE_BUCKET,
  VUE_APP_FIREBASE_MESSAGING_SENDER_ID, VUE_APP_FIREBASE_APP_ID,VUE_APP_FIREBASE_MEASUREMENT_ID} = process.env;

const firebaseConfig = {
  apiKey: VUE_APP_FIREBASE_API_KEY,
  authDomain: VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: VUE_APP_FIREBASE_PREJECT_ID,
  storageBucket: VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: VUE_APP_FIREBASE_APP_ID,
  measurementId: VUE_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;