window.onload = () => {
  // Enable dark mode by default
  const body = document.body;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');

  body.classList.add('dark');
  themeToggleBtn.textContent = '🌞'; // Emoji reflects dark mode state

  // Handle splash fade-out
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    splash.style.opacity = '0';
    setTimeout(() => {
      splash.style.display = 'none';
      document.getElementById('app').classList.remove('hidden');
    }, 600);
  }, 1800);
};



// Rewarded Popup

show_9443322('pop').then(() => {
    // user watch ad till the end or close it in interstitial format
    // your code to reward user for rewarded format
}).catch(e => {
    // user get error during playing ad
    // do nothing or whatever you want
})

        


// Dark Mode Toggle via Button
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;
let isDarkMode = false;

themeToggleBtn.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  body.classList.toggle('dark', isDarkMode);
  themeToggleBtn.textContent = isDarkMode ? '🌞' : '🌙';
});

// Add Task Functionality
function addTask() {
  const taskInput = document.getElementById('new-task');
  const taskList = document.getElementById('task-list');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.innerHTML = `
      ${taskText}
      <button class="delete-btn" onclick="this.parentElement.remove()">❌</button>
    `;
    taskList.appendChild(li);
    taskInput.value = '';
  }
}

// Generate Invoice PDF
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Get inputs or defaults
  const businessName = document.getElementById('business-name').value || 'XProductivity Inc.';
  const clientName = document.getElementById('client-name').value || 'John Doe';
  const invoiceDate = document.getElementById('invoice-date').value || new Date().toISOString().split('T')[0];
  const description = document.getElementById('description').value || 'Freelance development & design services';
  const amount = document.getElementById('amount').value || '500';
  const currency = document.getElementById('currency').value || 'USD ($)';
  const paymentMethods = document.getElementById('payment-methods').value || 'UPI, PayPal, Bank Transfer';
  const contactInfo = document.getElementById('contact-info').value || 'email@example.com';

  // Header
  doc.setFontSize(22);
  doc.setTextColor(0, 178, 127);
  doc.text(`${businessName}`, 10, 20);

  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`Date: ${invoiceDate}`, 150, 20, { align: 'right' });

  doc.setDrawColor(0, 178, 127);
  doc.line(10, 25, 200, 25); // horizontal line

  // Client Details
  doc.setTextColor(0);
  doc.setFontSize(14);
  doc.text(`Billed To:`, 10, 35);
  doc.setFontSize(12);
  doc.text(`${clientName}`, 10, 42);

  // Invoice Details
  doc.setFontSize(14);
  doc.text(`Description`, 10, 55);
  doc.setFontSize(12);
  doc.text(description, 10, 62, { maxWidth: 180 });

  doc.setFontSize(14);
  doc.text(`Amount`, 10, 80);
  doc.setFontSize(12);
  doc.text(`${currency} ${amount}`, 10, 87);

  // Payment
  doc.setFontSize(14);
  doc.text(`Payment Methods`, 10, 100);
  doc.setFontSize(12);
  doc.text(paymentMethods, 10, 107);

  doc.setFontSize(14);
  doc.text(`Contact Info`, 10, 120);
  doc.setFontSize(12);
  doc.text(contactInfo, 10, 127);

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text("Generated with XProductivity | @XProductivityBot", 10, 285);

  // Save
  doc.save(`Invoice_${clientName.replaceAll(' ', '_')}.pdf`);
}
