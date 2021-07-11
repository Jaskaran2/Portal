import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBWwrT9mVoKW7vxj13GPGf3gvN0-LkUfAw",
    authDomain: "portal-6329e.firebaseapp.com",
    projectId: "portal-6329e",
    storageBucket: "portal-6329e.appspot.com",
    messagingSenderId: "79808512531",
    appId: "1:79808512531:web:a4dc73dd1111fadaefb5e6",
    measurementId: "G-0ZENWY6001"
  };

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();

const storage=firebase.storage();

export {auth,provider,storage};
export default db;
