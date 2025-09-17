import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// IMPORTANT: Replace this with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyApNNptaoIvl0Lsc8pUQWuyethucsjFedw",
  authDomain: "studio-5259536795-ff10d.firebaseapp.com",
  projectId: "studio-5259536795-ff10d",
  storageBucket: "studio-5259536795-ff10d.firebasestorage.app",
  messagingSenderId: "1037773551011",
  appId: "1:1037773551011:web:2cd7176e2773254d0cd616"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
