// Guarda e edita perfil
const saveBtn = document.getElementById('saveProfile');
if (saveBtn) saveBtn.addEventListener('click', async () => {
  const user = firebase.auth().currentUser;
  if (!user) return alert('Não autenticado');
  const data = {
    displayName: document.getElementById('displayName').value,
    platformUsernames: {
      tiktok: document.getElementById('tiktokUser').value,
      instagram: document.getElementById('instaUser').value,
      facebook: document.getElementById('fbUser').value
    },
    iban: document.getElementById('iban').value || null,
    phoneNumber: user.phoneNumber
  };
  await db.collection('users').doc(user.uid).set(data, {merge:true});
  alert('Perfil salvo!');
});

// Request payout (simples)
const payoutBtn = document.getElementById('requestPayout');
if (payoutBtn) payoutBtn.addEventListener('click', async ()=>{
  const user = firebase.auth().currentUser; if(!user) return alert('Não autenticado');
  const userDoc = await db.collection('users').doc(user.uid).get();
  const data = userDoc.data();
  const balance = data.balance || 0;
  const minPayout = 1000; // AOA mínimo - alterar depois para settings
  if (balance < minPayout) return alert('Saldo insuficiente para saque');
  const amount = balance; // ou pedir valor ao utilizador
  await db.collection('payouts').add({ userId: user.uid, amount, phoneTarget: data.phoneNumber, ibanTarget: data.iban || null, status:'pending_admin', createdAt: firebase.firestore.FieldValue.serverTimestamp() });
  alert('Pedido de saque enviado!');
});

// Preenche campos do perfil ao carregar
firebase.auth().onAuthStateChanged(async user => {
  if (!user) return;
  const phoneEl = document.getElementById('phone');
  if (phoneEl) phoneEl.value = user.phoneNumber;
  const doc = await db.collection('users').doc(user.uid).get();
  if (doc.exists){
    const d = doc.data();
    const dn = document.getElementById('displayName');
    if (dn) dn.value = d.displayName || '';
    if (d.platformUsernames){
      const t = document.getElementById('tiktokUser');
      const i = document.getElementById('instaUser');
      const f = document.getElementById('fbUser');
      if (t) t.value = d.platformUsernames.tiktok || '';
      if (i) i.value = d.platformUsernames.instagram || '';
      if (f) f.value = d.platformUsernames.facebook || '';
    }
    const ibanEl = document.getElementById('iban');
    if (ibanEl) ibanEl.value = d.iban || '';
  }
});
