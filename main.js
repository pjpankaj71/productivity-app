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
  const doc = new jsPDF();

  const businessName = document.getElementById('business-name').value.trim();
  const clientName = document.getElementById('client-name').value.trim();
  const invoiceDate = document.getElementById('invoice-date').value;
  const description = document.getElementById('description').value.trim();
  const amount = document.getElementById('amount').value.trim();
  const currency = document.getElementById('currency').value;
  const paymentMethods = document.getElementById('payment-methods').value.trim();
  const contactInfo = document.getElementById('contact-info').value.trim();

  // Currency symbols mapping
  const currencySymbols = {
    USD: "$",
    INR: "₹",
    RUB: "₽",
    IDR: "Rp",
    BRL: "R$"
  };

  const symbol = currencySymbols[currency] || currency;

  if (!clientName || !amount || !businessName) {
    alert('Please fill in at least: Your Name, Client Name, and Amount.');
    return;
  }

  let y = 20;

  // Title
  doc.setFontSize(18);
  doc.text("INVOICE", 10, y);
  y += 10;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(10, y, 200, y);
  y += 10;

  // Business & Client Info
  doc.setFontSize(12);
  doc.text(`From: ${businessName}`, 10, y); y += 7;
  doc.text(`To: ${clientName}`, 10, y); y += 10;

  // Dates
  if (invoiceDate) {
    doc.text(`Invoice Date: ${invoiceDate}`, 10, y); y += 7;
  }

  // Description
  if (description) {
    y += 7;
    doc.text(`Description: ${description}`, 10, y); y += 7;
  }

  // Amount
  doc.text(`Amount Due: ${symbol}${amount}`, 10, y); y += 10;

  // Payment Methods
  if (paymentMethods) {
    doc.text(`Payment Methods: ${paymentMethods}`, 10, y); y += 7;
  }

  // Contact Info
  if (contactInfo) {
    y += 10;
    doc.text(`Contact Info:`, 10, y); y += 7;
    doc.text(`${contactInfo}`, 10, y); y += 10;
  }

  // Footer
  y += 10;
  doc.setFillColor(240, 240, 240);
  doc.rect(0, y, 210, 30, 'F');
  doc.setTextColor(100, 100, 100);
  doc.text("Thank you for your business!", 10, y + 10);

  // Save PDF
  doc.save('invoice.pdf');
}
