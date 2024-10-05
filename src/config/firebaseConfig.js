import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
    apiKey: "AIzaSyAODlzHsDVb9sHID6OrvX_6jNQo0JqMtxo",
    authDomain: "doshabcetringweb.firebaseapp.com",
    databaseURL: "https://doshabcetringweb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "doshabcetringweb",
    storageBucket: "doshabcetringweb.appspot.com",
    messagingSenderId: "122494717287",
    appId: "1:122494717287:web:ce8517889cef1bdb41f3c2"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });


export const db = getFirestore(app)

export default app;