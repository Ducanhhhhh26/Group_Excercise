document.addEventListener("DOMContentLoaded", () => {
  // Khởi tạo xác thực
  initializeAuth();
});

// Hàm khởi tạo xác thực
function initializeAuth() {
  // Khởi tạo tài khoản admin mặc định nếu chưa có
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  if (!accounts.some((acc) => acc.email === "admin@example.com")) {
    accounts.push({
      accountId: "TK000001",
      fullName: "Admin User",
      email: "admin@example.com",
      password: "Admin@123",
      role: "Admin",
      dob: "01/01/1990",
      phone: "0123456789",
      hometown: "Hà Nội",
    });
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }
  updateAuthButtons();
  setupLoginModal();
  setupRegisterModal();
}

// Cập nhật các nút xác thực dựa trên trạng thái đăng nhập của người dùng
function updateAuthButtons() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let loginBtn = document.querySelector(".login-btn");
  const registerBtn = document.querySelector(".register-btn");
  const authContainer =
    document.querySelector(".auth-container") ||
    document.querySelector(
      "header .d-flex.align-items-center > div:last-child"
    ) ||
    document.body;

  if (currentUser) {
    // Ẩn nút đăng ký, chuyển nút đăng nhập thành đăng xuất
    if (registerBtn) registerBtn.style.display = "none";
    if (loginBtn) {
      loginBtn.textContent = "Logout";
      loginBtn.classList.remove("login-btn");
      loginBtn.classList.add("logout-btn");
      // Xóa các sự kiện đăng nhập cũ
      const newLoginBtn = loginBtn.cloneNode(true);
      loginBtn.parentNode.replaceChild(newLoginBtn, loginBtn);
      // Thêm sự kiện đăng xuất
      newLoginBtn.addEventListener("click", handleLogout);
    }
    // Thêm thông báo chào mừng
    const welcomeMessage = document.createElement("span");
    welcomeMessage.className = "welcome-message";
    welcomeMessage.textContent = `Chào, ${currentUser.fullName}`;
    if (authContainer && !authContainer.querySelector(".welcome-message")) {
      authContainer.insertBefore(welcomeMessage, authContainer.firstChild);
    }
  } else {
    // Hiển thị cả hai nút, đảm bảo nút đăng nhập đúng
    if (registerBtn) registerBtn.style.display = "inline-block";
    loginBtn =
      document.querySelector(".logout-btn") ||
      document.querySelector(".login-btn");
    if (loginBtn && loginBtn.classList.contains("logout-btn")) {
      loginBtn.textContent = "Login";
      loginBtn.classList.remove("logout-btn");
      loginBtn.classList.add("login-btn");
      // Xóa các sự kiện đăng xuất cũ
      const newLoginBtn = loginBtn.cloneNode(true);
      loginBtn.parentNode.replaceChild(newLoginBtn, loginBtn);
      loginBtn = newLoginBtn;
    }
    // Gắn sự kiện đăng nhập
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        const modalLogin = document.querySelector(".modalLogin");
        if (modalLogin) {
          modalLogin.classList.add("show");
          modalLogin.style.display = "flex";
        } else {
          console.error("Không tìm thấy modal đăng nhập!");
          Swal.fire(
            "Lỗi!",
            "Không tìm thấy modal đăng nhập. Vui lòng kiểm tra cấu trúc HTML.",
            "error"
          );
        }
      });
    }
    // Xóa thông báo chào mừng
    const welcomeMessage = document.querySelector(".welcome-message");
    if (welcomeMessage) welcomeMessage.remove();
  }

  // Gắn lại sự kiện cho nút đăng ký
  const newRegisterBtn = document.querySelector(".register-btn");
  if (newRegisterBtn) {
    newRegisterBtn.addEventListener("click", () => {
      const modalRegister = document.querySelector(".modalRegister");
      if (modalRegister) {
        modalRegister.classList.add("show");
        modalRegister.style.display = "flex";
      } else {
        console.error("Không tìm thấy modal đăng ký!");
        Swal.fire(
          "Lỗi!",
          "Không tìm thấy modal đăng ký. Vui lòng kiểm tra cấu trúc HTML.",
          "error"
        );
      }
    });
  }
}

// Xử lý đăng xuất
function handleLogout() {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out of your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, logout",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("currentUser");
      Swal.fire(
        "Logged out!",
        "You have been successfully logged out.",
        "success"
      ).then(() => {
        updateAuthButtons();
      });
    }
  });
}

// Thiết lập modal đăng nhập
function setupLoginModal() {
  const modalLogin = document.querySelector(".modalLogin");
  const loginForm = document.querySelector(".formLogin");
  const forgotPasswordLink = document.querySelector(".forgot-password");
  const registerLink = document.querySelector(".formLogin .register-link");

  if (!modalLogin || !loginForm) {
    console.error("Thiếu modal hoặc form đăng nhập!");
    return;
  }

  modalLogin.addEventListener("click", (e) => {
    if (e.target === modalLogin) {
      modalLogin.classList.remove("show");
      modalLogin.style.display = "none";
    }
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Swal.fire("Lỗi!", "Vui lòng nhập địa chỉ email hợp lệ.", "error");
      return;
    }
    if (!password) {
      Swal.fire("Lỗi!", "Vui lòng nhập mật khẩu.", "error");
      return;
    }

    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const user = accounts.find(
      (account) => account.email === email && account.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      Swal.fire("Thành công!", "Đăng nhập thành công.", "success").then(() => {
        modalLogin.classList.remove("show");
        modalLogin.style.display = "none";
        loginForm.reset();
        updateAuthButtons();
      });
    } else {
      Swal.fire("Lỗi!", "Email hoặc mật khẩu không đúng.", "error");
    }
  });

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault();
      Swal.fire({
        title: "Quên mật khẩu",
        text: "Vui lòng liên hệ hỗ trợ tại shadowsgamer371@gmail.com để đặt lại mật khẩu.",
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
}

// Thiết lập modal đăng ký
function setupRegisterModal() {
  const modalRegister = document.querySelector(".modalRegister");
  const registerForm = document.querySelector(".formRegister");
  const loginLink = document.querySelector(".formRegister a");

  // Add click outside handler for the modal
  if (modalRegister) {
    modalRegister.addEventListener("click", (e) => {
      if (e.target === modalRegister) {
        modalRegister.classList.remove("show");
        modalRegister.style.display = "none";
      }
    });
  }

  if (registerForm) {
    console.log("Register form found:", registerForm);
    
    // Remove any existing event listeners
    const newForm = registerForm.cloneNode(true);
    registerForm.parentNode.replaceChild(newForm, registerForm);
    
    newForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("Form submitted - Starting validation");
      
      // Disable form submission while processing
      const submitButton = newForm.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;
      
      try {
        // Get form values and log them for debugging
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email1");
        const password1Input = document.getElementById("password1");
        const password2Input = document.getElementById("password2");

        // Log input elements
        console.log("Input elements found:", {
          nameInput: nameInput ? "Found" : "Not found",
          emailInput: emailInput ? "Found" : "Not found",
          password1Input: password1Input ? "Found" : "Not found",
          password2Input: password2Input ? "Found" : "Not found"
        });

        // Get raw values first
        const rawName = nameInput ? nameInput.value : "";
        const rawEmail = emailInput ? emailInput.value : "";
        const rawPassword1 = password1Input ? password1Input.value : "";
        const rawPassword2 = password2Input ? password2Input.value : "";

        // Log raw values
        console.log("Raw form values before trim:", {
          name: rawName,
          email: rawEmail,
          password1: rawPassword1 ? "filled" : "empty",
          password2: rawPassword2 ? "filled" : "empty"
        });

        // Trim values after logging raw values
        const name = rawName.trim();
        const email = rawEmail.trim().toLowerCase();
        const password1 = rawPassword1.trim();
        const password2 = rawPassword2.trim();

        // Log trimmed values
        console.log("Trimmed form values:", {
          name: name,
          email: email,
          password1: password1 ? "filled" : "empty",
          password2: password2 ? "filled" : "empty"
        });

        // Validate all fields are filled
        const missingFields = [];
        if (!name) missingFields.push("Name");
        if (!email) missingFields.push("Email");
        if (!password1) missingFields.push("Password");
        if (!password2) missingFields.push("Confirm Password");

        console.log("Validation results:", {
          missingFields: missingFields,
          hasMissingFields: missingFields.length > 0
        });

        if (missingFields.length > 0) {
          console.log("Validation failed - showing missing fields message");
          await Swal.fire({
            icon: "error",
            title: "Missing Information",
            text: `Please fill in the following fields: ${missingFields.join(", ")}`,
            confirmButtonText: "OK"
          });
          return;
        }

        console.log("All fields filled - proceeding with other validations");

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          console.log("Email validation failed");
          await Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email address.",
            confirmButtonText: "OK"
          });
          return;
        }

        // Validate password format
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password1)) {
          console.log("Password validation failed");
          await Swal.fire({
            icon: "error",
            title: "Invalid Password",
            text: "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.",
            confirmButtonText: "OK"
          });
          return;
        }

        // Check passwords match
        if (password1 !== password2) {
          console.log("Password mismatch");
          await Swal.fire({
            icon: "error",
            title: "Password Mismatch",
            text: "Passwords do not match.",
            confirmButtonText: "OK"
          });
          return;
        }

        // Get accounts from localStorage
        const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        
        // Check if email exists
        if (accounts.some(account => account.email === email)) {
          console.log("Email already exists");
          await Swal.fire({
            icon: "error",
            title: "Email Already Exists",
            text: "This email is already registered.",
            confirmButtonText: "OK"
          });
          return;
        }

        console.log("All validations passed - creating new account");

        // Create new account
        const newAccount = {
          accountId: `TK${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`,
          fullName: name,
          email: email,
          password: password1,
          dob: "",
          phone: "",
          hometown: "",
          role: "Users",
          favorite: []
        };

        // Add account and update localStorage
        accounts.push(newAccount);
        localStorage.setItem("accounts", JSON.stringify(accounts));
        localStorage.setItem("currentUser", JSON.stringify(newAccount));

        console.log("Account created successfully - showing success message");

        // Reset form and close modal BEFORE showing success message
        newForm.reset();
        modalRegister.classList.remove("show");
        modalRegister.style.display = "none";

        // Show success message
        await Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Your account has been created successfully.",
        });

        // Update UI
        updateAuthButtons();
        console.log("Registration process completed");
      } catch (error) {
        console.error("Error during registration:", error);
        await Swal.fire({
          icon: "error",
          title: "Registration Error",
          text: "An error occurred during registration. Please try again.",
          confirmButtonText: "OK"
        });
      } finally {
        // Re-enable form submission
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  if (loginLink) {
    loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (modalRegister) {
        modalRegister.style.display = "none";
        modalRegister.classList.remove("show");
      }
      const modalLogin = document.querySelector(".modalLogin");
      if (modalLogin) {
        modalLogin.style.display = "flex";
        modalLogin.classList.add("show");
      }
    });
  }
}
