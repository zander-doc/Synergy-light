// Toggle Password Visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const eyeIcon = document.querySelector('.eye-icon');
const eyeOffIcon = document.querySelector('.eye-off-icon');

togglePassword.addEventListener('click', function() {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  
  if (type === 'text') {
    eyeIcon.style.display = 'none';
    eyeOffIcon.style.display = 'block';
  } else {
    eyeIcon.style.display = 'block';
    eyeOffIcon.style.display = 'none';
  }
});

// Login Form
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = passwordInput.value;
  const rememberMe = document.getElementById('rememberMe').checked;
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, rememberMe })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Guardar token si es necesario
      if (rememberMe) {
        localStorage.setItem('token', data.token);
      } else {
        sessionStorage.setItem('token', data.token);
      }
      
      // Redirigir al dashboard
      window.location.href = '/admin/dashboard';
    } else {
      loginError.textContent = data.message || 'Email o contraseña incorrectos';
      loginError.style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
    loginError.textContent = 'Error de conexión. Intente nuevamente.';
    loginError.style.display = 'block';
  }
});

// Modal Recuperar Contraseña
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const recoverModal = document.getElementById('recoverModal');
const closeModal = document.getElementById('closeModal');
const recoverForm = document.getElementById('recoverForm');
const recoverMessage = document.getElementById('recoverMessage');

forgotPasswordLink.addEventListener('click', function(e) {
  e.preventDefault();
  recoverModal.style.display = 'flex';
});

closeModal.addEventListener('click', function() {
  recoverModal.style.display = 'none';
  recoverMessage.style.display = 'none';
  recoverForm.style.display = 'block';
  recoverForm.reset();
  recoverMessage.className = 'success-message';
});

// Cerrar modal al hacer click fuera
window.addEventListener('click', function(e) {
  if (e.target === recoverModal) {
    recoverModal.style.display = 'none';
    recoverMessage.style.display = 'none';
    recoverForm.style.display = 'block';
    recoverForm.reset();
    recoverMessage.className = 'success-message';
  }
});

recoverForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const email = document.getElementById('recoverEmail').value;
  
  try {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      recoverMessage.textContent = 'Se han enviado instrucciones a tu email';
      recoverMessage.style.display = 'block';
      recoverMessage.className = 'success-message';
      recoverForm.style.display = 'none';
    } else {
      recoverMessage.textContent = data.message || 'Error al enviar email';
      recoverMessage.style.display = 'block';
      recoverMessage.className = 'error-message';
    }
  } catch (error) {
    console.error('Error:', error);
    recoverMessage.textContent = 'Error de conexión. Intente nuevamente.';
    recoverMessage.style.display = 'block';
    recoverMessage.className = 'error-message';
  }
});

// Cargar dashboard con datos reales del backend
async function loadDashboard() {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (!token) return;

  try {
    const headers = { 'Authorization': `Bearer ${token}` };
    
    // Cargar clientes
    const clientsRes = await fetch('/api/clients', { headers });
    const clients = await clientsRes.json();
    const expiringClients = clients.filter(c => c.status === 'POR VENCER').length;
    
    document.getElementById('totalClients').textContent = clients.length;
    document.getElementById('expiringClients').textContent = expiringClients;

    // Cargar facturas
    const invoicesRes = await fetch('/api/invoices', { headers });
    const invoices = await invoicesRes.json();
    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
    const pendingInvoices = invoices.filter(inv => inv.status === 'PENDIENTE').length;
    
    document.getElementById('totalInvoices').textContent = invoices.length;
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
    document.getElementById('pendingInvoices').textContent = pendingInvoices;

    // Cargar últimos clientes
    const recentClients = clients.slice(0, 5);
    const clientsTableBody = document.getElementById('recentClientsBody');
    clientsTableBody.innerHTML = '';
    
    recentClients.forEach(client => {
      const row = document.createElement('tr');
      const statusClass = getStatusClass(client.status);
      row.innerHTML = `
        <td>${client.clientId}</td>
        <td>${client.name}</td>
        <td>${client.phone}</td>
        <td>${client.contractType}</td>
        <td class="status ${statusClass}">${client.status}</td>
        <td>
          <button onclick="editClient('${client.clientId}')" class="btn-sm">✏️</button>
          <button onclick="sendWhatsApp('${client.phone}', '${client.name}')" class="btn-sm">💬</button>
        </td>
      `;
      clientsTableBody.appendChild(row);
    });

    // Cargar facturas recientes
    const recentInvoices = invoices.slice(0, 5);
    const invoicesTableBody = document.getElementById('recentInvoicesBody');
    invoicesTableBody.innerHTML = '';
    
    recentInvoices.forEach(invoice => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${invoice.invoiceNumber}</td>
        <td>${invoice.clientName}</td>
        <td>${new Date(invoice.issueDate).toLocaleDateString()}</td>
        <td>$${invoice.total.toFixed(2)}</td>
        <td class="status ${invoice.status === 'PAGADA' ? 'success' : 'warning'}">${invoice.status}</td>
      `;
      invoicesTableBody.appendChild(row);
    });

  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}

function getStatusClass(status) {
  switch(status) {
    case 'ACTIVO': return 'success';
    case 'POR VENCER': return 'warning';
    case 'VENCIDO': return 'danger';
    case 'SIN CONEXIÓN': return 'secondary';
    case 'POR DESCONECTAR': return 'warning';
    default: return 'secondary';
  }
}

function sendWhatsApp(phone, clientName) {
  const message = `Hola ${clientName}, le contactamos de Synergy Light`;
  const url = `https://wa.me/1${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function editClient(clientId) {
  window.location.href = `/admin/clients.html?edit=${clientId}`;
}

// Verificar si hay token guardado
window.addEventListener('load', function() {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    // Verificar si el token es válido
    fetch('/api/auth/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        loadDashboard();
      }
    })
    .catch(error => console.error('Error verifying token:', error));
  }
});
