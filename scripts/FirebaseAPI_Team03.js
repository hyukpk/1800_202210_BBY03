//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyBBVp3B6F5xE2jWvqbrpPxKE7NFsygH8ew",
  authDomain: "comp1800-202230-a8792.firebaseapp.com",
  projectId: "comp1800-202230-a8792",
  storageBucket: "comp1800-202230-a8792.appspot.com",
  messagingSenderId: "998802945751",
  appId: "1:998802945751:web:ceb286f46cb60954632292"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();