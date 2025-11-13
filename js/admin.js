
// Leitura de submissões pendentes
const pendingSubmissions = document.getElementById('pendingSubmissions');
const payoutRequests = document.getElementById('payoutRequests');
async function loadAdmin(){
  if (pendingSubmissions){
    const subs = await db.collection('submissions').where('verificationStatus','==','waiting').get();
    pendingSubmissions.innerHTML = '';
    subs.forEach(doc => {
      const d = doc.data();
      const el = document.createElement('div');
      el.innerHTML = `<p><strong>${doc.id}</strong> — ${d.proof.postUrl || ''} <br><img src="${d.proof.screenshotUrl}" style="max-width:200px"></p>
        <button onclick="approve('${doc.id}')">Aprovar</button>
        <button onclick="reject('${doc.id}')">Rejeitar</button>`;
      pendingSubmissions.appendChild(el);
    });
  }

  if (payoutRequests){
    const pays = await db.collection('payouts').where('status','==','pending_admin').get();
    payoutRequests.innerHTML = '';
    pays.forEach(doc => {
      const p = doc.data();
      const el = document.createElement('div');
      el.innerHTML = `<p>${doc.id} — ${p.userId} — ${p.amount} AOA <button onclick="confirmPayout('${doc.id}')">Confirmar</button></p>`;
      payoutRequests.appendChild(el);
    });
  }
}
loadAdmin();

window.approve = async (id) => {
  await db.collection('submissions').doc(id).update({ verificationStatus:'verified' });
  alert('Aprovado'); location.reload();
}
window.reject = async (id) => { await db.collection('submissions').doc(id).update({ verificationStatus:'rejected' }); alert('Rejeitado'); location.reload(); }
window.confirmPayout = async (id) => { await db.collection('payouts').doc(id).update({ status:'completed' }); alert('Pagamento confirmado'); location.reload(); }
