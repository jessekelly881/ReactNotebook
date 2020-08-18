import * as firebase from "firebase";
import { throttle } from "throttle-debounce";

const firebaseConfig = {
    apiKey: "AIzaSyAyVtLrKl904-wtLhU8bEZ7Lk1LBfomHYg",
    authDomain: "react-notebook-dcdab.firebaseapp.com",
    databaseURL: "https://react-notebook-dcdab.firebaseio.com",
    projectId: "react-notebook-dcdab",
    storageBucket: "react-notebook-dcdab.appspot.com",
    messagingSenderId: "547337048300",
    appId: "1:547337048300:web:7d52ee6eea1854cbe895c9",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const createNotebook = data =>
    db.collection("notebooks").add(data || {});

export const updateNotebook = throttle(2000, (id, data) => {
    return db.collection("notebooks").doc(id).set(data, { merge: true });
});

export const getNotebook = id => db.collection("notebooks").doc(id).get();
