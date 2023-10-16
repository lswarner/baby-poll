import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "prenatal-pool",
  storageBucket: "prenatal-pool.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDING_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-HQ8274DB3F"
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {
  firestore
}