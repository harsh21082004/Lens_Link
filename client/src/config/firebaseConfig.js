import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDq5awREMlXsu-GFl25FLVRBx4S0qQW7Eo",
  authDomain: "clear-backup-437402-a5.firebaseapp.com",
  projectId: "clear-backup-437402-a5",
  storageBucket: "clear-backup-437402-a5.firebasestorage.app",
  messagingSenderId: "163532904964",
  appId: "1:163532904964:web:2002025432c18d73b4b351",
  measurementId: "G-7SBH6G1PQY"
};

const app = initializeApp(firebaseConfig);

// ✅ Persistent auth using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };