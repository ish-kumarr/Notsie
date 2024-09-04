import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAk9hexzP_vNki5D9QPUakxumX1PlldPOc",
  authDomain: "notion-8ddaf.firebaseapp.com",
  projectId: "notion-8ddaf",
  storageBucket: "notion-8ddaf.appspot.com",
  messagingSenderId: "846598404288",
  appId: "1:846598404288:web:87331515c528e2bfbb5525"
};
  
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export {db};