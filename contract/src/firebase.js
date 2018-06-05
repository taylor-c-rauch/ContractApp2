import firebase from "firebase";

const API_KEY = process.env.REACT_APP_API_KEY;
const SENDER_ID = process.env.REACT_APP_SENDER_ID;

let config = {
  apiKey: API_KEY,
  authDomain: "contractapp-f10e0.firebaseapp.com",
  databaseURL: "https://contractapp-f10e0.firebaseio.com",
  projectId: "contractapp-f10e0",
  storageBucket: "contractapp-f10e0.appspot.com",
  messagingSenderId: SENDER_ID
};
firebase.initializeApp(config);
export default firebase;
