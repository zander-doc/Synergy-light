function isAuthenticated() {
  return !!(localStorage.getItem("token") || sessionStorage.getItem("token"));
}

function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = "login.html";
  }
}