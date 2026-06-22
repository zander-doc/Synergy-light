// ===============================
// TOGGLE PASSWORD
// ===============================
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const eyeIcon = document.querySelector('.eye-icon');
const eyeOffIcon = document.querySelector('.eye-off-icon');

togglePassword.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;

  eyeIcon.style.display = type === 'text' ? 'none' : 'block';
  eyeOffIcon.style.display = type === 'text' ? 'block' : 'none';
});

// ===============================
// LOGIN
// ===============================
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = passwordInput.value.trim();
  const rememberMe = document.getElementById('rememberMe').checked;

  // LOGIN TEMPORAL (hasta conectar backend)
  if (email === "admin@synergylight.com" && password === "SynergyLight2026!Admin") {
    const token = "TOKEN_FAKE_2026";

    if (rememberMe) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }

    window.location.href = "dashboard.html";
  } else {
    loginError.textContent = "Credenciales incorrectas";
    loginError.style.display = "block";
  }
});

// ===============================
// CARGAR MODAL RECUPERAR CONTRASEÑA
// ===============================
fetch("components/modals/recover-password.html")
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);
    initRecoverModal();
  });

function initRecoverModal() {
  const recoverModal = document.getElementById("recoverModal");
  const forgotLink = document.getElementById("forgotPasswordLink");
  const closeModal = document.getElementById("closeModal");
  const recoverForm = document.getElementById("recoverForm");
  const recoverMessage = document.getElementById("recoverMessage");

  forgotLink.addEventListener("click", (e) => {
    e.preventDefault();
    recoverModal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    recoverModal.style.display = "none";
    recoverMessage.style.display = "none";
    recoverForm.style.display = "block";
    recoverForm.reset();
  });

  window.addEventListener("click", (e) => {
    if (e.target === recoverModal) {
      recoverModal.style.display = "none";
      recoverMessage.style.display = "none";
      recoverForm.style.display = "block";
      recoverForm.reset();
    }
  });

  recoverForm.addEventListener("submit", (e) => {
    e.preventDefault();
    recoverMessage.textContent = "Se han enviado instrucciones a tu correo.";
    recoverMessage.style.display = "block";
    recoverForm.style.display = "none";
  });
}