// js/auth.js
import { auth, db } from "./firebase-config.js";
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { 
  doc, 
  setDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Registro via telefone (versão Firebase modular)
const sendCodeBtn = document.getElementById('sendCode');

if (sendCodeBtn) {
  sendCodeBtn.addEventListener('click', async () => {
    const displayName = document.getElementById('displayName').value || '';
    const phone = document.getElementById('phone').value;

    if (!phone) {
      alert('Introduce o teu telefone');
      return;
    }

    // Criar o reCAPTCHA invisível
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible'
    });

    try {
      // Enviar SMS
      const confirmationResult = await signInWithPhoneNumber(auth, '+244' + phone, window.recaptchaVerifier);

      // Pedir código ao utilizador
      const code = prompt('Código SMS:');
      const result = await confirmationResult.confirm(code);
      const user = result.user;

      // Criar o perfil no Firestore se não existir
      await setDoc(doc(db, "users", user.uid), {
        displayName,
        phoneNumber: user.phoneNumber,
        role: 'user',
        createdAt: serverTimestamp()
      }, { merge: true });

      alert('Conta criada com sucesso!');
      window.location.href = 'perfil.html';

    } catch (err) {
      alert('Erro: ' + err.message);
    }
  });
}
