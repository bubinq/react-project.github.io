import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDoTLF5EzNENengiizDITA6LuBHnTqGCQk",
    authDomain: "react-project-api-3bb8a.firebaseapp.com",
    projectId: "react-project-api-3bb8a",
    storageBucket: "react-project-api-3bb8a.appspot.com",
    messagingSenderId: "1026849663137",
    appId: "1:1026849663137:web:b249c8fa1b69e4250168e0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);