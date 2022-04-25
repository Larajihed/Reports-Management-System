import firebase  from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getDatabase } from "firebase/database";
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'



const app = firebase.initializeApp({
   apiKey: "AIzaSyAqRXaqi1HpwFY8D1Adp0Kn3XS9SI4Hcy4",
  authDomain: "wonder-rms.firebaseapp.com",
  projectId: "wonder-rms",
  storageBucket: "wonder-rms.appspot.com",
  messagingSenderId: "427603407231",
  appId: "1:427603407231:web:3c78075bcec121e7986a4a",
  measurementId: "G-R7XWYQ1XZ4"
})

export const auth = app.auth()
// Get a reference to the database service
export const database = getDatabase();
export const storage = getStorage();
export const db = getFirestore()

export default app

