import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
	apiKey: "AIzaSyBXRpB-vMPj_exyMY345XTafOsCfaKlDc8",
	authDomain: "next-auth-crud-333f2.firebaseapp.com",
	projectId: "next-auth-crud-333f2",
	storageBucket: "next-auth-crud-333f2.appspot.com",
	messagingSenderId: "1033716186127",
	appId: "1:1033716186127:web:4a89adc057acdba1ee777a"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);