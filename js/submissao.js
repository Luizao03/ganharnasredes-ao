
const submitBtn = document.getElementById('submitProof');
if (submitBtn) submitBtn.addEventListener('click', async () => {
  const postUrl = document.getElementById('postUrl').value;
  const commentText = document.getElementById('commentText').value;
  const file = document.getElementById('screenshot').files[0];
  const params = new URLSearchParams(window.location.search);
  const taskId = params.get('taskId');
  const user = firebase.auth().currentUser; if(!user) return alert('Login requerido');
  if (!file) return alert('Escolhe uma imagem de prova');

  const ref = storage.ref().child(`proofs/${user.uid}/${Date.now()}_${file.name}`);
  await ref.put(file);
  const url = await ref.getDownloadURL();

  await db.collection('submissions').add({
    taskId, userId: user.uid, platformUsername: null, proof:{ screenshotUrl: url, postUrl, commentText }, verificationStatus:'waiting', createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  alert('Prova enviada — pendente de verificação');
  window.location.href = 'tarefas.html';
});
