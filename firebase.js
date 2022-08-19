// import { getDatabase } from "firebase/database"
// import {initializeApp} from "firebase/app";
// import {getAnalytics} from "firebase/analytics"
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/auth";
// import "firebase/compat/firestore";
// import { getAuth, GoogleAuthProvider } from "firebase/auth"


// export const firebaseConfig = firebase.initializeApp({
//     apiKey: "AIzaSyCzP8E8lRX-UA-4LyeEythK3_Yd_qbmGq8",
//     authDomain: "registration-form-b4c0b.firebaseapp.com",
//     databaseURL: "https://registration-form-b4c0b-default-rtdb.firebaseio.com",
//     projectId: "registration-form-b4c0b",
//     storageBucket: "registration-form-b4c0b.appspot.com",
//     messagingSenderId: "810015494442",
//     appId: "1:810015494442:web:10b875ccb9222f10720e53",
//     measurementId: "G-NELGS9PGSK"
//   });

//   // Initialize Firebase

//   /////Auth Api
//   export const auth = getAuth(firebaseConfig);
//   doCreateUserWithEmailAndPassword = (email, password) =>
//     this.auth.doCreateUserWithEmailAndPassword(email, password);
//     doSignInWithEmailAndPassword = (email, password) =>
//     this.auth.signInWithEmailAndPassword(email, password);

// let rootRef = firebase.database().ref();

// rootRef
//   .child('email')
//   .orderByChild('email')
//   .equalTo(email)
//   .once('value')
//   .then(snapshot => {
//     if (snapshot.exists()) {
//       let userData = snapshot.val();
//       console.log(userData);
//       Alert.alert('email is already taken');
//       return userData;
//     } else {
//       console.log('not found');
//       firebase
//         .auth()
//         .createUserWithEmailAndPassword(email, password)
//         .then(async user => {
//           console.log('Data created', user);
//         });
//     }
// });
  
// export const database = getDatabase(firebaseConfig);
