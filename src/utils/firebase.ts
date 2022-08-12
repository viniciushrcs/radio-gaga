import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCa6-DY-2xUNWIrIOQLSJqlg8Rljn2NHsw",
  authDomain: "radiogaga-1171e.firebaseapp.com",
  projectId: "radiogaga-1171e",
  storageBucket: "radiogaga-1171e.appspot.com",
  appId: "1:1093928167130:web:a14c43184ba43cf6b8a7e3",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersColection = db.collection("users");

export { auth, db, usersColection };
