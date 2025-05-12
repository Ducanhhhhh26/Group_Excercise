document.addEventListener("DOMContentLoaded", () => {
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

  // Initialize song data with continuous IDs
  const topMusicSong = {
    data: [
      {
        top_music: [
          {
            id: 1,
            name: "Ava Cornish",
            name_music: "Until I Met You",
            img: "../assets/1.png",
            mp3: "https://samplesongs.netlify.app/Faded.mp3",
          },
          // ... (các bài hát khác như ban đầu)
          {
            id: 15,
            name: "Ava Cornish",
            name_music: "Endless Things",
            img: "../assets/15.png",
            mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3",
          },
        ],
      },
      {
        top_all_times: [
          {
            id: 16,
            name: "Ava Cornish & Brian Hill",
            name_music: "Bloodlust",
            img: "../assets/album1.jpg.png",
            mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3",
          },
          // ... (các bài hát khác như ban đầu)
          {
            id: 21,
            name: "Ava Cornish & Brian Hill",
            name_music: "Cobweb of lies",
            img: "../assets/album6.jpg.png",
            mp3: "https://samplesongs.netlify.app/Without%20Me.mp3",
          },
        ],
      },
      {
        trending: [
          {
            id: 22,
            name: "Ava Cornish",
            name_music: "Dark Alley Acoustic",
            img: "../assets/1.png",
            mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3",
          },
          // ... (các bài hát khác như ban đầu)
          {
            id: 25,
            name: "Ava Cornish",
            name_music: "Desired Games",
            img: "../assets/4.png",
            mp3: "https://samplesongs.netlify.app/Hate%20Me.mp3",
          },
        ],
      },
    ],
  };

  // Ensure local storage
  if (!localStorage.getItem("songData")) {
    localStorage.setItem("songData", JSON.stringify(topMusicSong));
  }

  // Load songData from localStorage
  let songData = JSON.parse(localStorage.getItem("songData")) || topMusicSong;

  // Kiểm tra tracks và cập nhật UI nếu khác topMusicSong
  const tracks = JSON.parse(localStorage.getItem("tracks"));
  if (tracks && JSON.stringify(tracks) !== JSON.stringify(topMusicSong)) {
    if (tracks.data && Array.isArray(tracks.data)) {
      // Tạo songData mới với cấu trúc đầy đủ
      songData = {
        data: [{ top_music: [] }, { top_all_times: [] }, { trending: [] }],
      };

      // Ánh xạ dữ liệu từ tracks
      tracks.data.forEach((category, index) => {
        if (category.Top_Music) {
          songData.data[0].top_music = category.Top_Music.map((track) => ({
            id: track.id,
            name: track.artist,
            name_music: track.nameMusic,
            img: track.img || "../assets/default.png",
            mp3: track.mp3 || "",
          }));
        }
        if (category.Top_All_Times) {
          songData.data[1].top_all_times = category.Top_All_Times.map(
            (track) => ({
              id: track.id,
              name: track.artist,
              name_music: track.nameMusic,
              img: track.img || "../assets/default.png",
              mp3: track.mp3 || "",
            })
          );
        }
        if (category.Trending) {
          songData.data[2].trending = category.Trending.map((track) => ({
            id: track.id,
            name: track.artist,
            name_music: track.nameMusic,
            img: track.img || "../assets/default.png",
            mp3: track.mp3 || "",
          }));
        }
      });
    }
    updateSongLists(songData);
  }

  // Hàm cập nhật danh sách bài hát
  function updateSongLists(data) {
    // Cập nhật Weekly Top 15
    const top15Container = document.querySelector("#allTop15");
    if (top15Container) {
      top15Container.innerHTML = "";
      const topMusic = data.data[0].top_music || [];
      const rows = [];
      for (let i = 0; i < topMusic.length; i += 5) {
        const row = document.createElement("div");
        row.id = "top15Row";
        topMusic.slice(i, i + 5).forEach((song, index) => {
          const item = document.createElement("div");
          item.style.display = "flex";
          item.setAttribute("onclick", `playSong(${i + index}, 'top_music')`);
          item.innerHTML = `
            <h2 id="top15Small">${(i + index + 1)
              .toString()
              .padStart(2, "0")}</h2>
            <div><img src="${song.img}" alt=""></div>
            <div>
              <div class="songTitle">${song.name_music}</div>
              <div class="artistName">${song.name}</div>
            </div>
            <div class="songDuration">5:10</div>
            <div class="moreOptions">...</div>
          `;
          row.appendChild(item);
        });
        rows.push(row);
      }
      rows.forEach((row) => top15Container.appendChild(row));
    }

    // Cập nhật Top Tracks of All Time
    const topAllTimesRow = document.querySelector("#topAllTimesRow");
    if (topAllTimesRow) {
      topAllTimesRow.innerHTML = "";
      const topAllTimes = data.data[1].top_all_times || [];
      topAllTimes.forEach((song, index) => {
        const item = document.createElement("div");
        item.className = "topAllTimesItem";
        item.setAttribute("onclick", `playSong(${index}, 'top_all_times')`);
        item.innerHTML = `
          <img src="${song.img}" alt="">
          <div class="songTitle">${song.name_music}</div>
          <div class="artistName">${song.name}</div>
        `;
        topAllTimesRow.appendChild(item);
      });
    }

    // Cập nhật Trending Tracks
    const trendingRow = document.querySelector(".trendingRow");
    if (trendingRow) {
      trendingRow.innerHTML = "";
      const trending = data.data[2].trending || [];
      trending.forEach((song, index) => {
        const item = document.createElement("div");
        item.className = "trendingItem";
        item.setAttribute("onclick", `playSong(${index}, 'trending')`);
        item.innerHTML = `
          <img src="${song.img}" alt="">
          <div class="trackInfo">
            <div class="songTitle">${song.name_music}</div>
            <div class="artistName">${song.name}</div>
          </div>
          <div class="songDuration">5:10</div>
        `;
        trendingRow.appendChild(item);
      });
    }
  }

  // Music Player Logic
  const audio = new Audio();
  let currentSongIndex = 0;
  let currentCategory = "top_music";

  // Handle audio errors
  audio.addEventListener("error", () => {
    Swal.fire("Error!", "Failed to load the audio file.", "error");
  });

  window.playSong = function (index, category) {
    const categoryData = songData.data.find((item) => item[category]);
    currentSongIndex = index;
    currentCategory = category;
    const song = categoryData[category][index];
    audio.src = song.mp3;
    audio.play().then(() => {
      document.querySelector(".play-btn i").classList.remove("bi-play-fill");
      document.querySelector(".play-btn i").classList.add("bi-pause-fill");
    });
    updatePlayerUI(song);
  };

  playSong(0, "top_music");

  function updatePlayerUI(song) {
    document.querySelector(".player-album-img img").src = song.img;
    document.querySelector(".player-song-info h6").textContent =
      song.name_music;
    document.querySelector(".player-song-info p").textContent = song.name;
  }

  const playBtn = document.querySelector(".play-btn");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().then(() => {
          playBtn.querySelector("i").classList.remove("bi-play-fill");
          playBtn.querySelector("i").classList.add("bi-pause-fill");
        });
      } else {
        audio.pause();
        playBtn.querySelector("i").classList.remove("bi-pause-fill");
        playBtn.querySelector("i").classList.add("bi-play-fill");
      }
    });
  }

  const prevBtn = document.querySelector(
    ".player-btn i.bi-skip-start-fill"
  )?.parentNode;
  const nextBtn = document.querySelector(
    ".player-btn i.bi-skip-end-fill"
  )?.parentNode;

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSongIndex =
        (currentSongIndex -
          1 +
          songData.data.find((item) => item[currentCategory])[currentCategory]
            .length) %
        songData.data.find((item) => item[currentCategory])[currentCategory]
          .length;
      playSong(currentSongIndex, currentCategory);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSongIndex =
        (currentSongIndex + 1) %
        songData.data.find((item) => item[currentCategory])[currentCategory]
          .length;
      playSong(currentSongIndex, currentCategory);
    });
  }

  audio.addEventListener("timeupdate", () => {
    const currentTime = document.querySelector(".current-time");
    const totalTime = document.querySelector(".total-time");
    const progressBar = document.querySelector(".progress-bar");

    if (audio.duration && !isNaN(audio.duration)) {
      const currentMinutes = Math.floor(audio.currentTime / 60);
      const currentSeconds = Math.floor(audio.currentTime % 60);
      const totalMinutes = Math.floor(audio.duration / 60);
      const totalSeconds = Math.floor(audio.duration % 60);

      currentTime.textContent = `${currentMinutes}:${
        currentSeconds < 10 ? "0" : ""
      }${currentSeconds}`;
      totalTime.textContent = `${totalMinutes}:${
        totalSeconds < 10 ? "0" : ""
      }${totalSeconds}`;
      progressBar.style.width = `${
        (audio.currentTime / audio.duration) * 100
      }%`;
    }
  });

  audio.addEventListener("ended", () => {
    currentSongIndex =
      (currentSongIndex + 1) %
      songData.data.find((item) => item[currentCategory])[currentCategory]
        .length;
    playSong(currentSongIndex, currentCategory);
  });

  // Progress bar seeking
  const progressContainer = document.querySelector(".progress-container");
  if (progressContainer) {
    progressContainer.addEventListener("click", (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const width = rect.width;
      const seekTime = (offsetX / width) * audio.duration;
      audio.currentTime = seekTime;
    });
  }

  // Volume control
  const volumeBtn = document.querySelector(
    ".player-option-btn i.bi-volume-up"
  )?.parentNode;
  if (volumeBtn) {
    volumeBtn.addEventListener("click", () => {
      audio.muted = !audio.muted;
      volumeBtn.querySelector("i").classList.toggle("bi-volume-mute");
      volumeBtn.querySelector("i").classList.toggle("bi-volume-up");
    });
  }

  // Search Functionality
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");

  function searchSongs() {
    const searchTerm = searchInput.value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
    const top15Items = document.querySelectorAll("#top15Row > div");
    const topAllTimesItems = document.querySelectorAll(".topAllTimesItem");
    const trendingItems = document.querySelectorAll(".trendingItem");

    top15Items.forEach((item, index) => {
      const title =
        songData.data[0].top_music[index]?.name_music.toLowerCase() || "";
      const artist =
        songData.data[0].top_music[index]?.name.toLowerCase() || "";
      item.style.display =
        title.includes(searchTerm) || artist.includes(searchTerm)
          ? "flex"
          : "none";
    });

    topAllTimesItems.forEach((item, index) => {
      const title =
        songData.data[1].top_all_times[index]?.name_music.toLowerCase() || "";
      const artist =
        songData.data[1].top_all_times[index]?.name.toLowerCase() || "";
      item.style.display =
        title.includes(searchTerm) || artist.includes(searchTerm)
          ? "block"
          : "none";
    });

    trendingItems.forEach((item, index) => {
      const title =
        songData.data[2].trending[index]?.name_music.toLowerCase() || "";
      const artist = songData.data[2].trending[index]?.name.toLowerCase() || "";
      item.style.display =
        title.includes(searchTerm) || artist.includes(searchTerm)
          ? "flex"
          : "none";
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", searchSongs);
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", searchSongs);
  }

  // Carousel for Top Tracks of All Time
  const leftBtn = document.querySelector(".leftBtn");
  const rightBtn = document.querySelector(".rightBtn");
  const topAllTimesRow = document.querySelector(".topAllTimesRow");

  if (leftBtn && rightBtn && topAllTimesRow) {
    leftBtn.addEventListener("click", () => {
      topAllTimesRow.scrollBy({ left: -300, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
      topAllTimesRow.scrollBy({ left: 300, behavior: "smooth" });
    });
  }

  // Cleanup event listeners on page unload
  window.addEventListener("unload", () => {
    audio.pause();
    audio.src = "";
    if (playBtn) playBtn.removeEventListener("click", () => {});
    if (prevBtn) prevBtn.removeEventListener("click", () => {});
    if (nextBtn) nextBtn.removeEventListener("click", () => {});
  });

  // Initialize auth
  if (typeof initializeAuth === 'function') {
    initializeAuth();
  }
});

// Active link
const links = document.querySelectorAll(".sidebar a");
const currentPage = window.location.pathname.split("/").pop();
links.forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

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
      mainContent?.classList.add("expanded");
      header.classList.add("expanded");
      chevronBtn
        .querySelector("i")
        .classList.replace("fa-chevron-right", "fa-chevron-left");
    } else {
      sidebar.classList.remove("expanded");
      mainContent?.classList.remove("expanded");
      header.classList.remove("expanded");
      chevronBtn
        .querySelector("i")
        .classList.replace("fa-chevron-left", "fa-chevron-right");
    }
  });
}

// Modal Toggling and Music Player Visibility
const modalLogin = document.querySelector(".modalLogin");
const modalRegister = document.querySelector(".modalRegister");
const musicPlayer = document.querySelector(".music-player");

const toggleMusicPlayerVisibility = () => {
  if (
    (modalLogin && modalLogin.classList.contains("show")) ||
    (modalRegister && modalRegister.classList.contains("show"))
  ) {
    musicPlayer?.classList.add("hidden");
  } else {
    musicPlayer?.classList.remove("hidden");
  }
};

// Authentication Functions
function updateAuthButtons() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const authContainer = document.querySelector(
    "header .d-flex.align-items-center > div:last-child"
  );
  let loginBtn = document.querySelector(".login-btn, .logout-btn");
  const registerBtn = document.querySelector(".register-btn");

  // Remove existing welcome message
  const welcomeMessage = authContainer.querySelector("span.me-2");
  if (welcomeMessage) welcomeMessage.remove();

  if (currentUser) {
    if (registerBtn) registerBtn.style.display = "none";
    if (loginBtn) {
      loginBtn.textContent = "Logout";
      loginBtn.classList.remove("login-btn");
      loginBtn.classList.add("logout-btn");
      const newLoginBtn = loginBtn.cloneNode(true);
      loginBtn.parentNode.replaceChild(newLoginBtn, loginBtn);
      newLoginBtn.addEventListener("click", handleLogout);
    }
    const welcomeSpan = document.createElement("span");
    welcomeSpan.className = "me-2";
    welcomeSpan.textContent = `Welcome, ${currentUser.fullName}`;
    authContainer.insertBefore(welcomeSpan, authContainer.firstChild);
  } else {
    if (registerBtn) registerBtn.style.display = "inline-block";
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
        if (modalLogin) {
          modalLogin.classList.add("show");
          modalLogin.style.display = "flex";
          toggleMusicPlayerVisibility();
        } else {
          Swal.fire("Error!", "Login modal not found.", "error");
        }
      });
    }
  }

  const newRegisterBtn = document.querySelector(".register-btn");
  if (newRegisterBtn) {
    newRegisterBtn.addEventListener("click", () => {
      if (modalRegister) {
        modalRegister.classList.add("show");
        modalRegister.style.display = "flex";
        toggleMusicPlayerVisibility();
      } else {
        Swal.fire("Error!", "Register modal not found.", "error");
      }
    });
  }
}

function handleLogout() {
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
      Swal.fire(
        "Logged out!",
        "You have been successfully logged out.",
        "success"
      );
      updateAuthButtons();
      // Reset search
      const searchInput = document.querySelector(".search-input");
      if (searchInput) searchInput.value = "";
      document.querySelectorAll("#top15Row > div").forEach((el) => {
        el.style.display = "flex";
      });
      document.querySelectorAll(".topAllTimesItem").forEach((el) => {
        el.style.display = "block";
      });
      document.querySelectorAll(".trendingItem").forEach((el) => {
        el.style.display = "flex";
      });
    }
  });
}

// Login Modal
const loginForm = document.querySelector(".formLogin");
const forgotPasswordLink = document.querySelector(
  ".modalLogin .checkbox-forgot p"
);
const registerLink = document.querySelector(".formLogin a");

if (modalLogin) {
  modalLogin.addEventListener("click", (e) => {
    if (e.target === modalLogin) {
      modalLogin.classList.remove("show");
      modalLogin.style.display = "none";
      toggleMusicPlayerVisibility();
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
    const user = accounts.find(
      (account) => account.email === email && account.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      Swal.fire("Success!", "Logged in successfully.", "success").then(() => {
        modalLogin.classList.remove("show");
        modalLogin.style.display = "none";
        loginForm.reset();
        toggleMusicPlayerVisibility();
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
    if (modalRegister) {
      modalRegister.classList.add("show");
      modalRegister.style.display = "flex";
      toggleMusicPlayerVisibility();
    }
  });
}

// Register Modal
const registerForm = document.querySelector(".formRegister");
const loginLink = document.querySelector(".formRegister a");

if (modalRegister) {
  modalRegister.addEventListener("click", (e) => {
    if (e.target === modalRegister) {
      modalRegister.classList.remove("show");
      modalRegister.style.display = "none";
      toggleMusicPlayerVisibility();
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
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
      "Success!",
      "Registered successfully. You are now logged in.",
      "success"
    ).then(() => {
      modalRegister.classList.remove("show");
      modalRegister.style.display = "none";
      registerForm.reset();
      toggleMusicPlayerVisibility();
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
      toggleMusicPlayerVisibility();
    }
  });
}

// Initialize header buttons
updateAuthButtons();
