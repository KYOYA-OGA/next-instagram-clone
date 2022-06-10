import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBkm-hh90Xq-LYWezP3oMsdttUc2D4Pg6Q',
  authDomain: 'next-instagram-clone-c97ac.firebaseapp.com',
  projectId: 'next-instagram-clone-c97ac',
  storageBucket: 'next-instagram-clone-c97ac.appspot.com',
  messagingSenderId: '1077592763595',
  appId: '1:1077592763595:web:4b2dcfff6be72b6239ff4e',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
