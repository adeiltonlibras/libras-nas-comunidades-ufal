import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD487bJnmedqO1vbeB2hNDFT5ulUXzjUhg",
  authDomain: "libras-nas-comunidades.firebaseapp.com",
  projectId: "libras-nas-comunidades",
  storageBucket: "libras-nas-comunidades.firebasestorage.app",
  messagingSenderId: "1061563009636",
  appId: "1:1061563009636:web:930447f92cdf6617adad71",
  measurementId: "G-XG5LJVS1B3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
