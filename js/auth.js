// Registro via telefone (exemplo simples)
const sendCodeBtn = document.getElementById('sendCode');
if (sendCodeBtn) sendCodeBtn.addEventListener('click', async () => {
  const displayName = document.getElementById('displayName').value || '';
  const phone = document.getElementById('phone').value;
  if (!phone) return alert('Introduce o teu telefone');

  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {size:'invisible'});
  const appVerifier = window.recaptchaVerifier;
  try {
    const confirmationResult = await auth.signInWithPhoneNumber('+244' + phone, appVerifier);
    const code = prompt('Código SMS:');
    const result = await confirmationResult.confirm(code);
    // cria o perfil no Firestore se não existir
    const user = result.user;
    await db.collection('users').doc(user.uid).set({
      displayName,
      phoneNumber: user.phoneNumber,
      role: 'user',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge:true});
    alert('Conta criada com sucesso!');
    window.location.href = 'perfil.html';
  } catch (err) { alert('Erro: ' + err.message); }
});
