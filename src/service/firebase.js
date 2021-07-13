import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDdEwHfjLCPaGBq8M_MfjYSYpwl_NkTGSg",
    authDomain: "tts-chat-app-39d7a.firebaseapp.com",
    databaseURL: "https://tts-chat-app-39d7a-default-rtdb.firebaseio.com",
    projectId: "tts-chat-app-39d7a",
    storageBucket: "tts-chat-app-39d7a.appspot.com",
    messagingSenderId: "386373851201",
    appId: "1:386373851201:web:dce701bba2a7f880934ec0",
    measurementId: "G-H4Q1DX6PJE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

  // exports
   export const auth = firebase.auth;
   export const db = firebase.database();
