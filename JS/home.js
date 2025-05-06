
const mainContent = document.querySelector(".container");
const header = document.querySelector("header");
let isSidebarExpanded = false;


// Search Functionality with Local Storage
document.addEventListener("DOMContentLoaded", () => {
  // Sample music data
  const musicData = {
    albums: [
      { title: "Endless Summer", artist: "Sarah Johnson", image: "../assets/images/img_2.png" },
      { title: "Midnight Dreams", artist: "Alex Turner", image: "../assets/images/img_3.png" },
      { title: "Neon Lights", artist: "Electro Beats", image: "../assets/images/img_4.png" },
      { title: "Mountain View", artist: "Nature Sounds", image: "../assets/images/img_5.png" },
      { title: "City Lights", artist: "Urban Rhythms", image: "../assets/images/img_6.png" },
      { title: "Ocean Waves", artist: "Coastal Sounds", image: "../assets/images/img_7.png" },
      { title: "Bloodlust", artist: "Ava Cornish & Brian Hill", image: "../assets/images/img_8.jpg.png" },
      { title: "Time flies", artist: "Ava Cornish & Brian Hill", image: "../assets/images/img_9.jpg.png" },
      { title: "Dark matters", artist: "Ava Cornish & Brian Hill", image: "../assets/images/img_10.jpg.png" },
      { title: "Eye to eye", artist: "Ava Cornish & Brian Hill", image: "../assets/images/img_11.jpg.png" },
      { title: "Cloud nine", artist: "Ava Cornish & Brian Hill", image: "../assets/images/img_12.jpg.png" },
      { title: "Cobweb of lies", artist: "Ava Cornish & Brian Hill", image: "../assets/images/img_13.jpg.png" },
    ],
    charts: [
      { title: "Summer Vibes", artist: "Beach Boys", image: "../assets/images/img_10.png" },
      { title: "Moonlit Nights", artist: "Luna Echo", image: "../assets/images/img_11.png" },
      { title: "Electric Pulse", artist: "DJ Spark", image: "../assets/images/img_12.png" },
      { title: "Golden Hour", artist: "Sunny Days", image: "../assets/images/img_13.png" },
      { title: "Echoes of Love", artist: "Heartstrings", image: "../assets/images/img_14.png" },
      { title: "City Dreams", artist: "Urban Echo", image: "../assets/images/img_15.png" },
      { title: "Starry Sky", artist: "Night Glow", image: "../assets/images/img_16.png" },
      { title: "Rhythm Flow", artist: "Beat Master", image: "../assets/images/img_17.png" },
      { title: "Ocean Breeze", artist: "Wave Riders", image: "../assets/images/img_18.png" },
      { title: "Sunset Glow", artist: "Horizon Band", image: "../assets/images/img_14.png" },
      { title: "Neon Dreams", artist: "Light Pulse", image: "../assets/images/img_17.png" },
      { title: "Wild Hearts", artist: "Free Spirits", image: "../assets/images/img_10.png" },
      { title: "Crystal Echo", artist: "Glass Notes", image: "../assets/images/img_16.png" },
      { title: "Frosty Nights", artist: "Winter Chill", image: "../assets/images/img_19.png" },
      { title: "Fire Within", artist: "Blaze Band", image: "../assets/images/img_15.png" },
    ],
    releases: [
      { title: "Dark Alley Acoustic", artist: "Ava Cornish", image: "../assets/images/img_14.png", duration: "5:10" },
      { title: "Dreamy Nights", artist: "Luna Echo", image: "../assets/images/img_16.png", duration: "4:30" },
      { title: "Electric Vibes", artist: "DJ Spark", image: "../assets/images/img_11.png", duration: "3:45" },
      { title: "Golden Sunset", artist: "Sunny Days", image: "../assets/images/img_15.png", duration: "4:15" },
    ],
  };

  // Save music data to localStorage if not present
  if (!localStorage.getItem("musicData")) {
    localStorage.setItem("musicData", JSON.stringify(musicData));
  }

  // Initialize accounts and create default admin if none exists
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  const hasAdmin = accounts.some((account) => account.role === "Admin");
  if (!hasAdmin) {
    const defaultAdmin = {
      accountId: "TK000001",
      fullName: "Admin User",
      email: "admin@example.com",
      password: "Admin@123",
      dob: "01/01/1990",
      phone: "0123456789",
      hometown: "Hà Nội",
      role: "Admin",
    };
    accounts.push(defaultAdmin);
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }

  // Initialize search history
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");
  const clearBtn = document.querySelector(".clear-btn");
  const searchMessage = document.querySelector(".search-message");
  const recentlyPlayedGrid = document.querySelector(".recently-played .album-grid");
  const chartsGrid = document.querySelector(".charts-section .charts-grid");
  const releasesContainer = document.querySelector(".releases");
  const featuredArtistsGrid = document.querySelector(".featured-artists .album-grid");
  const featuredAlbumsGrid = document.querySelector(".featured-albums .album-grid");

  // Show/hide clear button
  searchInput.addEventListener("input", () => {
    clearBtn.style.display = searchInput.value ? "block" : "none";
    filterContent(searchInput.value.toLowerCase().trim());
  });

  // Clear search input
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.style.display = "none";
    filterContent("");
    searchMessage.style.display = "none";
  });

  // Search on button click
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase().trim();
    if (query) {
      searchHistory = [...new Set([query, ...searchHistory.slice(0, 4)])];
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
    filterContent(query);
  });

  // Basic autocomplete for search history
  searchInput.addEventListener("focus", () => {
    console.log("Search history:", searchHistory);
  });

  function filterContent(query) {
    const data = JSON.parse(localStorage.getItem("musicData")) || musicData;
    let hasResults = false;

    // Filter and render albums
    const albumItems = data.albums.filter(
      (item) => query === "" || item.title.toLowerCase().includes(query) || item.artist.toLowerCase().includes(query)
    );
    const renderAlbumGrid = (grid, items, maxItems = items.length) =>
      (grid.innerHTML = items
        .slice(0, maxItems)
        .map(
          (item) => `
          <div class="album-item">
              <img src="${item.image}" alt="Album Cover">
              <div class="album-info">
                  <div class="album-title">${item.title}</div>
                  <div class="album-artist">${item.artist}</div>
              </div>
          </div>
      `
        )
        .join(""));
    renderAlbumGrid(recentlyPlayedGrid, albumItems, 6);
    renderAlbumGrid(featuredArtistsGrid, albumItems, 6);
    renderAlbumGrid(featuredAlbumsGrid, albumItems);
    hasResults |= albumItems.length > 0;

    // Filter and render charts
    const chartItems = data.charts.filter(
      (item) => query === "" || item.title.toLowerCase().includes(query) || item.artist.toLowerCase().includes(query)
    );
    chartsGrid.innerHTML = `
      <div class="chart-column">
          ${chartItems
            .slice(0, 5)
            .map(
              (item, index) => `
              <div class="chart-item">
                  <div class="chart-number">${(index + 1).toString().padStart(2, "0")}</div>
                  <div class="chart-thumbnail">
                      <img src="${item.image}" alt="Song Thumbnail">
                  </div>
                  <div class="chart-info">
                      <div class="chart-title">${item.title}</div>
                      <div class="chart-artist">${item.artist}</div>
                  </div>
                  <div class="chart-buttons">
                      <button><i class="fas fa-play"></i></button>
                  </div>
              </div>
          `
            )
            .join("")}
      </div>
      <div class="chart-column">
          ${chartItems
            .slice(5, 10)
            .map(
              (item, index) => `
              <div class="chart-item">
                  <div class="chart-number">${(index + 6).toString().padStart(2, "0")}</div>
                  <div class="chart-thumbnail">
                      <img src="${item.image}" alt="Song Thumbnail">
                  </div>
                  <div class="chart-info">
                      <div class="chart-title">${item.title}</div>
                      <div class="chart-artist">${item.artist}</div>
                  </div>
                  <div class="chart-buttons">
                      <button><i class="fas fa-play"></i></button>
                  </div>
              </div>
          `
            )
            .join("")}
      </div>
      <div class="chart-column">
          ${chartItems
            .slice(10, 15)
            .map(
              (item, index) => `
              <div class="chart-item">
                  <div class="chart-number">${(index + 11).toString().padStart(2, "0")}</div>
                  <div class="chart-thumbnail">
                      <img src="${item.image}" alt="Song Thumbnail">
                  </div>
                  <div class="chart-info">
                      <div class="chart-title">${item.title}</div>
                      <div class="chart-artist">${item.artist}</div>
                  </div>
                  <div class="chart-buttons">
                      <button><i class="fas fa-play"></i></button>
                  </div>
              </div>
          `
            )
            .join("")}
      </div>
  `;
    hasResults |= chartItems.length > 0;

    // Filter and render releases
    const releaseItems = data.releases.filter(
      (item) => query === "" || item.title.toLowerCase().includes(query) || item.artist.toLowerCase().includes(query)
    );
    releasesContainer.innerHTML = releaseItems
      .map(
        (item) => `
          <div class="release-item">
              <img src="${item.image}" alt="${item.title}">
              <div>
                  <h4>${item.title} ${item.duration}</h4>
                  <p>${item.artist}</p>
                  <div class="chart-buttons">
                      <button><i class="fas fa-play"></i></button>
                  </div>
              </div>
          </div>
      `
      )
      .join("");
    hasResults |= releaseItems.length > 0;

    searchMessage.style.display = hasResults || query === "" ? "none" : "block";
  }

  // Header Authentication Buttons
  function updateAuthButtons() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let loginBtn = document.querySelector(".login-btn");
    const registerBtn = document.querySelector(".register-btn");

    if (currentUser) {
      // Hide register button, convert login button to logout
      if (registerBtn) registerBtn.style.display = "none";
      if (loginBtn) {
        loginBtn.textContent = "Logout";
        loginBtn.classList.remove("login-btn");
        loginBtn.classList.add("logout-btn");
        // Remove old login event listeners
        const newLoginBtn = loginBtn.cloneNode(true);
        loginBtn.parentNode.replaceChild(newLoginBtn, loginBtn);
        // Add logout event listener
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
              filterContent(""); // Reset content
            }
          });
        });
      }
      // Add welcome message
      const welcomeMessage = document.createElement("span");
      welcomeMessage.className = "me-2";
      welcomeMessage.textContent = `Welcome, ${currentUser.fullName}`;
      const authContainer = document.querySelector("header .d-flex.align-items-center > div:last-child");
      if (authContainer && !authContainer.querySelector("span.me-2")) {
        authContainer.insertBefore(welcomeMessage, authContainer.firstChild);
      }
    } else {
      // Show both buttons, ensure login button is correct
      if (registerBtn) registerBtn.style.display = "inline-block";
      loginBtn = document.querySelector(".logout-btn") || document.querySelector(".login-btn");
      if (loginBtn && loginBtn.classList.contains("logout-btn")) {
        loginBtn.textContent = "Login";
        loginBtn.classList.remove("logout-btn");
        loginBtn.classList.add("login-btn");
        // Remove old logout event listeners
        const newLoginBtn = loginBtn.cloneNode(true);
        loginBtn.parentNode.replaceChild(newLoginBtn, loginBtn);
        loginBtn = newLoginBtn;
      }
      // Attach login event listener
      if (loginBtn) {
        loginBtn.addEventListener("click", () => {
          const modalLogin = document.querySelector(".modalLogin");
          if (modalLogin) {
            modalLogin.classList.add("show");
            modalLogin.style.display = "flex";
            console.log("Login modal displayed");
          } else {
            console.error("Modal login not found!");
            Swal.fire("Error!", "Login modal not found. Please check the HTML structure.", "error");
          }
        });
      } else {
        console.error("Login button not found!");
      }
      // Remove welcome message
      const welcomeMessage = document.querySelector("header .d-flex.align-items-center span.me-2");
      if (welcomeMessage) welcomeMessage.remove();
    }

    // Re-attach register button listener
    const newRegisterBtn = document.querySelector(".register-btn");
    if (newRegisterBtn) {
      newRegisterBtn.addEventListener("click", () => {
        const modalRegister = document.querySelector(".modalRegister");
        if (modalRegister) {
          modalRegister.classList.add("show");
          modalRegister.style.display = "flex";
          console.log("Register modal displayed");
        } else {
          console.error("Modal register not found!");
          Swal.fire("Error!", "Register modal not found. Please check the HTML structure.", "error");
        }
      });
    }
  }

  // Login Modal
  const modalLogin = document.querySelector(".modalLogin");
  const loginForm = document.querySelector(".formLogin");
  const forgotPasswordLink = document.querySelector(".forgot-password");
  const registerLink = document.querySelector(".formLogin .register-link");

  if (modalLogin) {
    modalLogin.addEventListener("click", (e) => {
      if (e.target === modalLogin) {
        modalLogin.classList.remove("show");
        modalLogin.style.display = "none";
      }
    });
  } else {
    console.error("Modal login element not found!");
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

  // Register Modal
  const modalRegister = document.querySelector(".modalRegister");
  const registerForm = document.querySelector(".formRegister");
  const loginLink = document.querySelector(".formRegister .login-link");

  if (modalRegister) {
    modalRegister.addEventListener("click", (e) => {
      if (e.target === modalRegister) {
        modalRegister.classList.remove("show");
        modalRegister.style.display = "none";
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email1").value.trim();
      const password1 = document.getElementById("password1").value.trim();
      const password2 = document.getElementById("password2").value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!name || !email || !password1 || !password2) {
        Swal.fire("Error!", "Please fill in all fields.", "error");
        return;
      }
      if (!emailRegex.test(email)) {
        Swal.fire("Error!", "Please enter a valid email address.", "error");
        return;
      }
      if (!passwordRegex.test(password1)) {
        Swal.fire(
          "Error!",
          "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.",
          "error"
        );
        return;
      }
      if (password1 !== password2) {
        Swal.fire("Error!", "Passwords do not match.", "error");
        return;
      }

      const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
      if (accounts.some((account) => account.email === email)) {
        Swal.fire("Error!", "This email is already registered.", "error");
        return;
      }

      const newAccount = {
        accountId: `TK${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`,
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

      Swal.fire("Success!", "Registered successfully. You are now logged in.", "success").then(() => {
        modalRegister.classList.remove("show");
        modalRegister.style.display = "none";
        registerForm.reset();
        updateAuthButtons();
      });
   

 });
  }

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

  // Initialize header buttons
  updateAuthButtons();
  filterContent(""); // Initial content load
});
