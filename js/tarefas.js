// Lista simples de tasks
const tasksList = document.getElementById('tasksList');
async function loadTasks(){
  const snap = await db.collection('tasks').where('status','==','open').get();
  if (!tasksList) return;
  tasksList.innerHTML = '';
  snap.forEach(doc => {
    const t = doc.data();
    const el = document.createElement('div');
    el.className = 'task';
    el.innerHTML = `<h4>${t.platform} — ${t.taskType}</h4><p>Valor: ${t.reward} AOA</p><a class="btn" href="submissao.html?taskId=${doc.id}">Executar</a>`;
    tasksList.appendChild(el);
  });
}
if (tasksList) loadTasks();
