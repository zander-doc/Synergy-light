// ===============================
// CARGA GLOBAL DE COMPONENTES
// ===============================
async function loadGlobalComponents() {
  const sidebar = await fetch("components/sidebar.html").then(r => r.text());
  document.getElementById("sidebar").innerHTML = sidebar;

  const header = await fetch("components/header.html").then(r => r.text());
  document.getElementById("header").innerHTML = header;

  // Activar botón logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);
}

// ===============================
// PROTECCIÓN DE RUTAS
// ===============================
function checkAuth() {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) window.location.href = "login.html";
}

// ===============================
// LOGOUT
// ===============================
function logout() {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  window.location.href = "login.html";
}