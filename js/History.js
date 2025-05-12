document.addEventListener("DOMContentLoaded", function () {
    // Sidebar toggle
    const sidebar = document.querySelector(".sidebar");
    const chevronBtn = document.querySelector(".sidebar-chevorn a");
    const mainContent = document.querySelector(".container");
    const header = document.querySelector("header");
    let isSidebarExpanded = false;
  
    if (chevronBtn) {
      chevronBtn.addEventListener("click", () => {
        isSidebarExpanded = !isSidebarExpanded;
        if (isSidebarExpanded) {
          sidebar.classList.add("expanded");
          mainContent.classList.add("expanded");
          header.classList.add("expanded");
          chevronBtn
            .querySelector("i")
            .classList.replace("fa-chevron-right", "fa-chevron-left");
        } else {
          sidebar.classList.remove("expanded");
          mainContent.classList.remove("expanded");
          header.classList.remove("expanded");
          chevronBtn
            .querySelector("i")
            .classList.replace("fa-chevron-left", "fa-chevron-right");
        }
      });
    }
  
    const links = document.querySelectorAll(".sidebar a");
    const currentPage = window.location.pathname.split("/").pop();
    links.forEach((link) => {
      const linkPage = link.getAttribute("href");
      if (linkPage === currentPage) {
        link.classList.add("active");
      }
    });
  
    // Authentication Functions
    function updateAuthButtons() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let loginBtn = document.querySelector(".login-btn");
      const registerBtn = document.querySelector(".register-btn");
  
      if (currentUser) {
        if (registerBtn) registerBtn.style.display = "none";
        if (loginBtn) {
          loginBtn.textContent = "Logout";
          loginBtn.classList.remove("login-btn");
          loginBtn.classList.add("logout-btn");
          const newLoginBtn = loginBtn.cloneNode(true);
          loginBtn.parentNode.replaceChild(newLoginBtn, loginBtn);
          newLoginBtn.addEventListener("click", () => {
            Swal.fire({
              title: "Are you sure?",
              text: "You will be logged out of your account.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, log out",
              cancelButtonText: "Cancel",
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.removeItem("currentUser");
                Swal.fire("Logged out!", "You have been successfully logged out.", "success");
                updateAuthButtons();
                renderArtistsSections1(); // Reset content
              }
            });
          });
        }
        const welcomeMessage = document.createElement("span");
        welcomeMessage.className = "me-2";
        welcomeMessage.textContent = `Welcome, ${currentUser.fullName}`;
        const authContainer = document.querySelector("header .d-flex.align-items-center > div:last-child");
        if (authContainer && !authContainer.querySelector("span.me-2")) {
          authContainer.insertBefore(welcomeMessage, authContainer.firstChild);
        }
      } else {
        if (registerBtn) registerBtn.style.display = "inline-block";
        loginBtn = document.querySelector(".logout-btn") || document.querySelector(".login-btn");
        if (loginBtn && loginBtn.classList.contains("logout-btn")) {
          loginBtn.textContent = "Login";
          loginBtn.classList.remove("logout-btn");
          loginBtn.classList.add("login-btn");
          const newLoginBtn = loginBtn.cloneNode(true);
          loginBtn.parentNode.replaceChild(newLoginBtn, loginBtn);
          loginBtn = newLoginBtn;
        }
        if (loginBtn) {
          loginBtn.addEventListener("click", () => {
            const modalLogin = document.querySelector(".modalLogin");
            if (modalLogin) {
              modalLogin.classList.add("show");
              modalLogin.style.display = "flex";
            } else {
              Swal.fire("Error!", "Login modal not found.", "error");
            }
          });
        }
        const welcomeMessage = document.querySelector("header .d-flex.align-items-center span.me-2");
        if (welcomeMessage) welcomeMessage.remove();
      }
  
      const newRegisterBtn = document.querySelector(".register-btn");
      if (newRegisterBtn) {
        newRegisterBtn.addEventListener("click", () => {
          const modalRegister = document.querySelector(".modalRegister");
          if (modalRegister) {
            modalRegister.classList.add("show");
            modalRegister.style.display = "flex";
          } else {
            Swal.fire("Error!", "Register modal not found.", "error");
          }
        });
      }
    }
  
    // Login Modal
    const modalLogin = document.querySelector(".modalLogin");
    const loginForm = document.querySelector(".formLogin");
    const forgotPasswordLink = document.querySelector(".modalLogin .checkbox-forgot p");
    const registerLink = document.querySelector(".formLogin a");
  
    if (modalLogin) {
      modalLogin.addEventListener("click", (e) => {
        if (e.target === modalLogin) {
          modalLogin.classList.remove("show");
          modalLogin.style.display = "none";
        }
      });
    }
  
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if (!emailRegex.test(email)) {
          Swal.fire("Error!", "Please enter a valid email address.", "error");
          return;
        }
        if (!password) {
          Swal.fire("Error!", "Please enter a password.", "error");
          return;
        }
  
        const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        const user = accounts.find((account) => account.email === email && account.password === password);
  
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          Swal.fire("Success!", "Logged in successfully.", "success").then(() => {
            modalLogin.classList.remove("show");
            modalLogin.style.display = "none";
            loginForm.reset();
            updateAuthButtons();
            if (user.role === "Admin") {
              window.location.href = "Admin-page.html";
            }
          });
        } else {
          Swal.fire("Error!", "Invalid email or password.", "error");
        }
      });
    }
  
    if (forgotPasswordLink) {
      forgotPasswordLink.addEventListener("click", (e) => {
        e.preventDefault();
        Swal.fire({
          title: "Forgot Password",
          text: "Please contact support at shadowsgamer371@gmail.com to reset your password.",
          icon: "info",
        });
      });
    }
  
    if (registerLink) {
      registerLink.addEventListener("click", (e) => {
        e.preventDefault();
        modalLogin.classList.remove("show");
        modalLogin.style.display = "none";
        const modalRegister = document.querySelector(".modalRegister");
        if (modalRegister) {
          modalRegister.classList.add("show");
          modalRegister.style.display = "flex";
        }
      });
    }
  
    // Initialize auth
    if (typeof initializeAuth === 'function') {
      initializeAuth();
    }
  
    // Initialize rendering and header buttons
    renderArtistsSections();
    renderArtistsSections2();
    renderArtistsSections1();
    updateAuthButtons();
  });
  