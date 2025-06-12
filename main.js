// Telegram WebApp SDK
window.Telegram.WebApp.ready();
const user = Telegram.WebApp.initDataUnsafe?.user;

// Remove loading message after 1.5 seconds
setTimeout(() => {
  document.querySelector('.loading').style.display = 'none';
}, 1500);

// Task Manager
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const list = document.getElementById('task-list');
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      ${task}
      <button onclick="deleteTask(${index})" class="delete-btn">✕</button>
    `;
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('new-task');
  const task = input.value.trim();
  if (!task) return;
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  input.value = '';
  loadTasks();
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

loadTasks();

// PDF Generator
async function generateInvoice() {
  const { jsPDF } = window.jspdf;
  const clientName = document.getElementById('client-name').value;
  const amount = document.getElementById('amount').value;

  if (!clientName || !amount) {
    alert('Please fill in both fields');
    return;
  }

  const doc = new jsPDF();
  doc.text(`Invoice to: ${clientName}`, 10, 10);
  doc.text(`Amount: $${amount}`, 10, 20);
  doc.save('invoice.pdf');
}
