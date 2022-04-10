import firebase  from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getDatabase } from "firebase/database";
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";




const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: 'https://reports-generator-1b38f-default-rtdb.firebaseio.com/',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

export const auth = app.auth()
// Get a reference to the database service
export const database = getDatabase();
export const storage = getStorage();


export default app

