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
      loginBtn.textContent = "Đăng nhập";
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
  const loginLink = document.querySelector(".formRegister .login-link");

  if (!modalRegister || !registerForm) {
    console.error("Thiếu modal hoặc form đăng ký!");
    return;
  }

  modalRegister.addEventListener("click", (e) => {
    if (e.target === modalRegister) {
      modalRegister.classList.remove("show");
      modalRegister.style.display = "none";
    }
  });

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email1").value.trim();
    const password1 = document.getElementById("password1").value.trim();
    const password2 = document.getElementById("password2").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!name || !email || !password1 || !password2) {
      Swal.fire("Lỗi!", "Vui lòng điền đầy đủ các trường.", "error");
      return;
    }
    if (!emailRegex.test(email)) {
      Swal.fire("Lỗi!", "Vui lòng nhập địa chỉ email hợp lệ.", "error");
      return;
    }
    if (!passwordRegex.test(password1)) {
      Swal.fire(
        "Lỗi!",
        "Mật khẩu phải dài ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
        "error"
      );
      return;
    }
    if (password1 !== password2) {
      Swal.fire("Lỗi!", "Mật khẩu không khớp.", "error");
      return;
    }

    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    if (accounts.some((account) => account.email === email)) {
      Swal.fire("Lỗi!", "Email này đã được đăng ký.", "error");
      return;
    }

    const newAccount = {
      accountId: `TK${Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")}`,
      fullName: name,
      email,
      password: password1,
      dob: "",
      phone: "",
      hometown: "",
      role: "Users",
    };

    accounts.push(newAccount);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    localStorage.setItem("currentUser", JSON.stringify(newAccount));

    Swal.fire(
      "Thành công!",
      "Đăng ký thành công. Bạn đã được đăng nhập.",
      "success"
    ).then(() => {
      modalRegister.classList.remove("show");
      modalRegister.style.display = "none";
      registerForm.reset();
      updateAuthButtons();
    });
  });

  if (loginLink) {
    loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      modalRegister.classList.remove("show");
      modalRegister.style.display = "none";
      const modalLogin = document.querySelector(".modalLogin");
      if (modalLogin) {
        modalLogin.classList.add("show");
        modalLogin.style.display = "flex";
      }
    });
  }
}
