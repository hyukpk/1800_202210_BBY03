
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiU_BMGINm2Vcwp7Tuuz-zLBG9wriTyrM",
  authDomain: "comp1800-relaxapp.firebaseapp.com",
  projectId: "comp1800-relaxapp",
  storageBucket: "comp1800-relaxapp.appspot.com",
  messagingSenderId: "766877106873",
  appId: "1:766877106873:web:a632edd08e3c13a1b65168"
};
//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------

const app = initializeApp(firebaseConfig);
const db = firebase.firestore();