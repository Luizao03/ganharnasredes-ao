// Substitui pelos teus dados do Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJECT.firebaseapp.com",
  projectId: "SEU_PROJECT",
  storageBucket: "SEU_PROJECT.appspot.com",
  messagingSenderId: "0000000000",
  appId: "1:0000000000:web:xxxxxxxx"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
