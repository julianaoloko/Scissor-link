import {getApps, getApp, initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCi2v7XdUXYxRzGsQ9BGyQXUx_fgxSKc6g",
  authDomain: "scissor-8bee6.firebaseapp.com",
  projectId: "scissor-8bee6",
  storageBucket: "scissor-8bee6.appspot.com",
  messagingSenderId: "969365629441",
  appId: "1:969365629441:web:c2342fdd02c1acc122ee00"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

export {auth, app, firestore};