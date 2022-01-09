
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChzsr4CxE-fndtoFsAT7I9V56EpE_qC9E",
  authDomain: "blogproject-5fe6a.firebaseapp.com",
  projectId: "blogproject-5fe6a",
  storageBucket: "blogproject-5fe6a.appspot.com",
  messagingSenderId: "871453164589",
  appId: "1:871453164589:web:325a55903fe8547fc124a4",
  measurementId: "G-LLG72ET06R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()