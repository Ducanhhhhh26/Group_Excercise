document.addEventListener("DOMContentLoaded", function () {
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
      avatar: "",
    };
    accounts.push(defaultAdmin);
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }

  // Existing artist data
  const defaultSongs = [
    { image: "../assets/song1.jpg.png", title: "Best Of Ava Cornish" },
    { image: "../assets/song2.jpg.png", title: "Until I Met You" },
    { image: "../assets/song3.jpg.png", title: "Gimme Some Courage" },
    { image: "../assets/song4.jpg.png", title: "Dark Alley Acoustic" },
    { image: "../assets/song5.jpg.png", title: "Walking Promises" },
    { image: "../assets/song6.jpg.png", title: "Desired Games" },
  ];


  let defaultImages = JSON.parse(localStorage.getItem("defaultImages"));

if (!defaultImages) {
  defaultImages = [
    "/assets/r_music1.jpg.png",
    "/assets/artist1.jpg.png",
    "/assets/artist2.jpg.png",
    "/assets/artist3.jpg.png",
    "/assets/artist4.jpg.png",
    "/assets/artist5.jpg.png",
    "/assets/artist6.jpg.png",
    "/assets/artist7.jpg.png",
    "/assets/artist8.jpg.png",
    "/assets/song6.jpg (1).png",
    "/assets/album4.jpg.png",
    "/assets/song4.jpg (1).png",
    "/assets/artist9.jpg.png",
    "/assets/artist10.jpg.png",
    "/assets/artist11.jpg.png",
    "/assets/artist12.jpg.png",
    "/assets/artist13.jpg.png",
    "/assets/song3.jpg.png",
    "/assets/album2.jpg.png",
  
  ];
  localStorage.setItem("defaultImages", JSON.stringify(defaultImages));
}
  // Initialize artists data in localStorage if none exists
  let artists = JSON.parse(localStorage.getItem("artists")) || [];
  if (artists.length === 0) {
    const defaultArtists = [
      { artistId: "NG000001", fullName: "Claire Hudson", email: "claire.hudson@example.com", password: "Artist@123", role: "Artists", songCount: 7 },
      { artistId: "NG000002", fullName: "Carl Brown", email: "carl.brown@example.com", password: "Artist@123", role: "Artists", songCount: 5 },
      { artistId: "NG000003", fullName: "Virginia Harris", email: "virginia.harris@example.com", password: "Artist@123", role: "Artists", songCount: 8 },
      { artistId: "NG000004", fullName: "Max Glover", email: "max.glover@example.com", password: "Artist@123", role: "Artists", songCount: 4 },
      { artistId: "NG000005", fullName: "Jennifer Kelly", email: "jennifer.kelly@example.com", password: "Artist@123", role: "Artists", songCount: 6 },
      { artistId: "NG000006", fullName: "Harry Jackson", email: "harry.jackson@example.com", password: "Artist@123", role: "Artists", songCount: 3 },
      { artistId: "NG000007", fullName: "Kevin Buckland", email: "kevin.buckland@example.com", password: "Artist@123", role: "Artists", songCount: 9 },
      { artistId: "NG000008", fullName: "Anna Ellison", email: "anna.ellison@example.com", password: "Artist@123", role: "Artists", songCount: 2 },
      { artistId: "NG000009", fullName: "Kylie Greene", email: "kylie.greene@example.com", password: "Artist@123", role: "Artists", songCount: 5 },
      { artistId: "NG000010", fullName: "Sean Wilson", email: "sean.wilson@example.com", password: "Artist@123", role: "Artists", songCount: 7 },
      { artistId: "NG000011", fullName: "Steven Walker", email: "steven.walker@example.com", password: "Artist@123", role: "Artists", songCount: 4 },
      { artistId: "NG000012", fullName: "Olivia Paige", email: "olivia.paige@example.com", password: "Artist@123", role: "Artists", songCount: 6 },
      { artistId: "NG000013", fullName: "Nicole Miller", email: "nicole.miller@example.com", password: "Artist@123", role: "Artists", songCount: 3 },
      { artistId: "NG000014", fullName: "Edward Clark", email: "edward.clark@example.com", password: "Artist@123", role: "Artists", songCount: 8 },
      { artistId: "NG000015", fullName: "Adam Glover", email: "adam.glover@example.com", password: "Artist@123", role: "Artists", songCount: 5 },
      { artistId: "NG000016", fullName: "Leah Knox", email: "leah.knox@example.com", password: "Artist@123", role: "Artists", songCount: 4 },
      { artistId: "NG000017", fullName: "Charles Davidson", email: "charles.davidson@example.com", password: "Artist@123", role: "Artists", songCount: 6 },
      { artistId: "NG000018", fullName: "Vanessa Hunter", email: "vanessa.hunter@example.com", password: "Artist@123", role: "Artists", songCount: 7 },
      { artistId: "NG000019", fullName: "Sophie Hudson", email: "sophie.hudson@example.com", password: "Artist@123", role: "Artists", songCount: 5 },
    ].map((artist, index) => ({
      ...artist,
      image: defaultImages[index % defaultImages.length], 
    }));
    artists = defaultArtists;
    localStorage.setItem("artists", JSON.stringify(artists));
  }

  // Render artists for .artists-grid
  const renderArtistsSections = () => {
    const artistSections = document.querySelectorAll(".artists-grid");
    artistSections.forEach((grid) => {
      grid.innerHTML = "";
      defaultSongs.forEach((song) => {
        const artistCard = document.createElement("div");
        artistCard.classList.add("artist-card");
        const img = document.createElement("img");
        img.src = song.image;
        img.alt = song.title;
        const title = document.createElement("p");
        title.textContent = song.title;
        artistCard.appendChild(img);
        artistCard.appendChild(title);
        grid.appendChild(artistCard);
      });
    });
  };

  // Render artists for .artists-grid2
  const renderArtistsSections2 = () => {
    const artistSections2 = document.querySelectorAll(".artists-grid2");
    artistSections2.forEach((grid) => {
      grid.innerHTML = "";
      artists.forEach((artist,index) => {
        const artistCard2 = document.createElement("div");
        artistCard2.classList.add("artist-card2");
        const img = document.createElement("img");
        img.src = defaultImages[index];
        console.log(defaultImages[index]);
        img.alt = artist.fullName;
        const title2 = document.createElement("p");
        title2.textContent = artist.fullName;
        artistCard2.appendChild(img);
        artistCard2.appendChild(title2);
        grid.appendChild(artistCard2);
      });
    });
  };

  // Render all artists initially
  const renderArtistsSections1 = () => {
    const artistSections = document.querySelectorAll(".artists-grid2");
    artistSections.forEach((grid) => {
      grid.innerHTML = "";
      artists.forEach((artist,index) => {
        const artistCard = document.createElement("div");
        artistCard.classList.add("artist-card2");
        const img = document.createElement("img");
        img.src = defaultImages[index];
        img.alt = artist.fullName;
        const title = document.createElement("p");
        title.textContent = artist.fullName;
        artistCard.appendChild(img);
        artistCard.appendChild(title);
        grid.appendChild(artistCard);
      });
    });
  };

  // Search artists
  const searchArtists = (searchTerm) => {
    const artistSections = document.querySelectorAll(".artists-grid2");
    const filteredArtists = artists.filter((artist) =>
      artist.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    artistSections.forEach((grid) => {
      grid.innerHTML = "";
      filteredArtists.forEach((artist) => {
        const artistCard = document.createElement("div");
        artistCard.classList.add("artist-card2");
        const img = document.createElement("img");
        img.src = artist.image;
        img.alt = artist.fullName;
        const title = document.createElement("p");
        title.textContent = artist.fullName;
        artistCard.appendChild(img);
        artistCard.appendChild(title);
        grid.appendChild(artistCard);
      });
    });
  };

  // Search input event listener
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.trim();
      if (searchTerm === "") {
        renderArtistsSections1();
      } else {
        searchArtists(searchTerm);
      }
    });
  }
  renderArtistsSections();
  renderArtistsSections2();
  renderArtistsSections1();
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

  // Register Modal
  const modalRegister = document.querySelector(".modalRegister");
  const registerForm = document.querySelector(".formRegister");
  const loginLink = document.querySelector(".formRegister a");

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

  // Initialize rendering and header buttons
  renderArtistsSections();
  renderArtistsSections2();
  renderArtistsSections1();
  updateAuthButtons();
});