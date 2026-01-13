import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDX2QSPJaSrdRE3Q-pQG6PzFBgC_d4CZu8",
    authDomain: "transport-management-sys-35720.firebaseapp.com",
    projectId: "transport-management-sys-35720",
    storageBucket: "transport-management-sys-35720.firebasestorage.app",
    messagingSenderId: "215206475609",
    appId: "1:215206475609:web:0aad5cb023571bb2fa3e48",
    measurementId: "G-MGK4DY7CRY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
