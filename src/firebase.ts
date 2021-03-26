import 'firebase/firestore';
import 'firebase/auth';
import firebase from 'firebase/app';

const firebaseConfig = JSON.parse(__app.env.firebaseConfig);

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
