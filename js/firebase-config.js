// js/firebase-config.js

// Importar SDKs do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-storage.js";

// Configuração do teu Firebase (dados originais)
const firebaseConfig = {
  apiKey: "AIzaSyA4zPrPZXT9UFWvrtUkZrnMfHxab9PwcKE",
  authDomain: "kwanzaredes.firebaseapp.com",
  projectId: "kwanzaredes",
  storageBucket: "kwanzaredes.firebasestorage.app",
  messagingSenderId: "1056060587689",
  appId: "1:1056060587689:web:64b29b3913d91d53e2b3b8",
  measurementId: "G-K0GZDDQ1F0"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Exportar para uso em outros scripts
export { app, analytics, auth, db, storage };
