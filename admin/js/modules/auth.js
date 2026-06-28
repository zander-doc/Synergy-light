function isAuthenticated() {
  var ses = JSON.parse(localStorage.getItem("synergy_session") || "null");
  return ses && new Date(ses.expiresAt) > new Date();
}

function requireAuth() {
  if (!isAuthenticated()) {
    localStorage.removeItem("synergy_session");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
  } else {
    var ses = JSON.parse(localStorage.getItem("synergy_session"));
    var el = document.getElementById("currentUser");
    if (el) el.textContent = ses.name;
  }
}