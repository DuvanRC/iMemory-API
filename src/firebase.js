import "dotenv/config";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import errorhandler from "errorhandler";

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

let db;

const initializeFirebaseApp = () => {
  try {
    initializeApp({
      credential: cert("./firebase.json"),
      ...firebaseConfig,
    });
    db = getFirestore();
    return appFireBase;
  } catch (error) {
    errorhandler(error, "firebase-initializeFirebaseApp");
  }
};

export { db, initializeFirebaseApp, Timestamp };
