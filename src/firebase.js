import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcu8s5YV779sq9VMcArvR4GfaFIHJ7ksc",
  authDomain: "linkedin-clone-7099c.firebaseapp.com",
  projectId: "linkedin-clone-7099c",
  storageBucket: "linkedin-clone-7099c.appspot.com",
  messagingSenderId: "401224379839",
  appId: "1:401224379839:web:5752d5796058146535c50a",
  measurementId: "G-KLKJP9S1V8",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
