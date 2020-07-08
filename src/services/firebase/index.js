import * as firebase from "firebase";

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

export const createNotebook = _ => db.collection("notebooks").add({});
