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

// Chave do site reCAPTCHA (que você registrou)
const SITE_KEY = "6LcPIC0tAAAAAA_Io9tZUpdywGONjiZFt2fSz000";

const sendCodeBtn = document.getElementById('sendCode');

if (sendCodeBtn) {
  sendCodeBtn.addEventListener('click', async () => {
    const displayName = document.getElementById('displayName').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!phone || phone.length < 9) {
      alert('Por favor, insira um número de telefone válido.');
      return;
    }

    if (!displayName) {
      alert('Por favor, insira um nome de utilizador.');
      return;
    }

    try {
      // Configura reCAPTCHA invisível
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          console.log('reCAPTCHA resolvido');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expirou');
        }
      });

      // Renderiza o reCAPTCHA
      await window.recaptchaVerifier.render();

      const confirmationResult = await signInWithPhoneNumber(
        auth, 
        '+244' + phone, 
        window.recaptchaVerifier
      );

      const code = prompt('Digite o código SMS recebido:');
      if (!code) return;

      const result = await confirmationResult.confirm(code);
      const user = result.user;

      // Salva dados no Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName,
        phoneNumber: user.phoneNumber,
        role: 'user',
        createdAt: serverTimestamp()
      }, { merge: true });

      alert('✅ Conta criada com sucesso!');
      window.location.href = 'perfil.html';

    } catch (err) {
      console.error(err);
      alert('Erro: ' + err.message);
    }
  });
}
