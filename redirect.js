// redirect.js

window.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const currentUser = localStorage.getItem("currentUser");
  const userData = localStorage.getItem("user_" + currentUser);

  if (isLoggedIn && currentUser && userData) {
    // User is already logged in
    window.location.href = "index.html";
  } else if (!currentUser || !userData) {
    // User not registered
    window.location.href = "register.html";
  } else {
    // User registered but not logged in
    window.location.href = "login.html";
  }
});
