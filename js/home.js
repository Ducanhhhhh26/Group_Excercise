// Khởi tạo dữ liệu và localStorage
let musicData = {
  albums: [
    { title: "Endless Summer", artist: "Sarah Johnson", image: "../assets/images/img_2.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Midnight Dreams", artist: "Alex Turner", image: "../assets/images/img_3.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Neon Lights", artist: "Electro Beats", image: "../assets/images/img_4.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { title: "Mountain View", artist: "Nature Sounds", image: "../assets/images/img_5.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { title: "City Lights", artist: "Urban Rhythms", image: "../assets/images/img_6.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
    { title: "Ocean Waves", artist: "Coastal Sounds", image: "../assets/images/img_7.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    { title: "Bloodlust", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song1.jpg.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
    { title: "Time flies", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song5.jpg.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
    { title: "Dark matters", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song6.jpg.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
    { title: "Eye to eye", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song1.jpg.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
    { title: "Cloud nine", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song3.jpg.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
    { title: "Cobweb of lies", artist: "Ava Cornish & Brian Hill", image: "../assets/images/song5.jpg.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" }
  ],
  charts: [
    { title: "Summer Vibes", artist: "Beach Boys", image: "../assets/images/img_10.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
    { title: "Moonlit Nights", artist: "Luna Echo", image: "../assets/images/img_11.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" },
    { title: "Electric Pulse", artist: "DJ Spark", image: "../assets/images/img_12.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" },
    { title: "Golden Hour", artist: "Sunny Days", image: "../assets/images/img_13.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" },
    { title: "Echoes of Love", artist: "Heartstrings", image: "../assets/images/img_14.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "City Dreams", artist: "Urban Echo", image: "../assets/images/img_15.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Starry Sky", artist: "Night Glow", image: "../assets/images/img_16.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { title: "Rhythm Flow", artist: "Beat Master", image: "../assets/images/img_17.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { title: "Ocean Breeze", artist: "Wave Riders", image: "../assets/images/img_18.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
    { title: "Sunset Glow", artist: "Horizon Band", image: "../assets/images/img_14.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    { title: "Neon Dreams", artist: "Light Pulse", image: "../assets/images/img_17.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
    { title: "Wild Hearts", artist: "Free Spirits", image: "../assets/images/img_10.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
    { title: "Crystal Echo", artist: "Glass Notes", image: "../assets/images/img_16.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
    { title: "Frosty Nights", artist: "Winter Chill", image: "../assets/images/img_19.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
    { title: "Fire Within", artist: "Blaze Band", image: "../assets/images/img_15.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" }
  ],
  releases: [
    { title: "Dark Alley Acoustic", artist: "Ava Cornish", image: "../assets/images/img_14.png", duration: "5:10", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
    { title: "Dreamy Nights", artist: "Luna Echo", image: "../assets/images/img_16.png", duration: "4:30", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
    { title: "Electric Vibes", artist: "DJ Spark", image: "../assets/images/img_11.png", duration: "3:45", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" },
    { title: "Golden Sunset", artist: "Sunny Days", image: "../assets/images/img_15.png", duration: "4:15", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" }
  ]
};

// Lưu musicData vào localStorage nếu chưa tồn tại
if (!localStorage.getItem("musicData")) {
  localStorage.setItem("musicData", JSON.stringify(musicData));
}

// Tải musicData từ localStorage nếu có
if (localStorage.getItem('musicData')) {
  musicData = JSON.parse(localStorage.getItem('musicData'));
}

// Khởi tạo tài khoản và tạo admin mặc định nếu chưa có
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

// Chọn các phần tử DOM
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const clearBtn = document.querySelector(".clear-btn");
const searchMessage = document.querySelector(".search-message");
const recentlyPlayedGrid = document.querySelector(".recently-played .album-grid");
const chartsGrid = document.querySelector(".charts-section .charts-grid");
const releasesContainer = document.querySelector(".releases");
const featuredArtistsGrid = document.querySelector(".featured-artists .album-grid");
const featuredAlbumsGrid = document.querySelector(".featured-albums .album-grid");
const sidebar = document.querySelector('.sidebar');
const chevronBtn = document.querySelector('.sidebar-chevorn a');
const mainContent = document.querySelector('.container');
const header = document.querySelector('header');
const modalLogin = document.querySelector(".modalLogin");
const loginForm = document.querySelector(".formLogin");
const forgotPasswordLink = document.querySelector(".forgot-password");
const registerLink = document.querySelector(".formLogin .register-link");
const modalRegister = document.querySelector(".modalRegister");
const registerForm = document.querySelector(".formRegister");
const loginLink = document.querySelector(".formRegister .login-link");

// Chức năng tìm kiếm đơn giản
// Hiển thị hoặc ẩn nút xóa khi nhập nội dung tìm kiếm
searchInput.addEventListener("input", () => {
  clearBtn.style.display = searchInput.value ? "block" : "none";
});

// Xử lý tìm kiếm khi nhấn nút tìm kiếm
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase().trim();
  filterContent(query);
});

// Xóa nội dung ô tìm kiếm và đặt lại nội dung
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  clearBtn.style.display = "none";
  searchMessage.style.display = "none";
  filterContent("");
});

// Hàm lọc và hiển thị nội dung theo truy vấn
function filterContent(query) {
  const data = JSON.parse(localStorage.getItem("musicData")) || musicData;

  // Lọc album
  const albumItems = data.albums.filter(
    (item) => query === "" || item.title.toLowerCase().includes(query) || item.artist.toLowerCase().includes(query)
  );
  const renderAlbumGrid = (grid, items, maxItems = items.length) =>
    (grid.innerHTML = items
      .slice(0, maxItems)
      .map(
        (item, index) => `
          <div class="album-item" data-index="${index}">
            <img src="${item.image}" alt="Album Cover">
            <div class="album-info">
              <div class="album-title">${item.title}</div>
              <div class="album-artist">${item.artist}</div>
            </div>
          </div>
        `
      )
      .join(""));
  renderAlbumGrid(recentlyPlayedGrid, albumItems, 11); // HTML có 11 mục
  renderAlbumGrid(featuredArtistsGrid, albumItems, 6); // HTML có 6 mục
  renderAlbumGrid(featuredAlbumsGrid, albumItems, 7); // HTML có 7 mục

  // Lọc bảng xếp hạng
  const chartItems = data.charts.filter(
    (item) => query === "" || item.title.toLowerCase().includes(query) || item.artist.toLowerCase().includes(query)
  );
  chartsGrid.innerHTML = `
    <div class="chart-column">
      ${chartItems
        .slice(0, 5)
        .map(
          (item, index) => `
            <div class="chart-item" data-index="${index}">
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
            <div class="chart-item" data-index="${index + 5}">
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
            <div class="chart-item" data-index="${index + 10}">
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

  // Hiển thị thông báo nếu không có kết quả
  searchMessage.style.display = (albumItems.length === 0 && chartItems.length === 0 && query !== "") ? "block" : "none";
  searchMessage.textContent = query !== "" && (albumItems.length === 0 && chartItems.length === 0) ? "Không tìm thấy kết quả." : "";
}

// Chức năng xác thực người dùng
// Cập nhật trạng thái nút đăng nhập/đăng xuất
function updateAuthButtons() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let loginBtn = document.querySelector(".login-btn");
  const registerBtn = document.querySelector(".register-btn");

  if (currentUser) {
    if (registerBtn) registerBtn.style.display = "none";
    if (loginBtn) {
      loginBtn.textContent = "Đăng xuất";
      loginBtn.classList.remove("login-btn");
      loginBtn.classList.add("logout-btn");
      const newLoginBtn = loginBtn.cloneNode(true);
      loginBtn.parentNode.replaceChild(newLoginBtn, loginBtn);
      newLoginBtn.addEventListener("click", () => {
        Swal.fire({
          title: "Bạn có chắc chắn?",
          text: "Bạn sẽ được đăng xuất khỏi tài khoản.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Có, đăng xuất",
          cancelButtonText: "Hủy",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("currentUser");
            Swal.fire("Đã đăng xuất!", "Bạn đã đăng xuất thành công.", "success");
            updateAuthButtons();
            filterContent("");
          }
        });
      });
    }
    const welcomeMessage = document.createElement("span");
    welcomeMessage.className = "me-2";
    welcomeMessage.textContent = `Chào, ${currentUser.fullName}`;
    const authContainer = document.querySelector("header .d-flex.align-items-center > div:last-child");
    if (authContainer && !authContainer.querySelector("span.me-2")) {
      authContainer.insertBefore(welcomeMessage, authContainer.firstChild);
    }
  } else {
    if (registerBtn) registerBtn.style.display = "inline-block";
    loginBtn = document.querySelector(".logout-btn") || document.querySelector(".login-btn");
    if (loginBtn && loginBtn.classList.contains("logout-btn")) {
      loginBtn.textContent = "Đăng nhập";
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
          console.log("Modal đăng nhập được hiển thị");
        } else {
          console.error("Không tìm thấy modal đăng nhập!");
          Swal.fire("Lỗi!", "Không tìm thấy modal đăng nhập. Vui lòng kiểm tra cấu trúc HTML.", "error");
        }
      });
    } else {
      console.error("Không tìm thấy nút đăng nhập!");
    }
    const welcomeMessage = document.querySelector("header .d-flex.align-items-center span.me-2");
    if (welcomeMessage) welcomeMessage.remove();
  }

  const newRegisterBtn = document.querySelector(".register-btn");
  if (newRegisterBtn) {
    newRegisterBtn.addEventListener("click", () => {
      if (modalRegister) {
        modalRegister.classList.add("show");
        modalRegister.style.display = "flex";
        console.log("Modal đăng ký được hiển thị");
      } else {
        console.error("Không tìm thấy modal đăng ký!");
        Swal.fire("Lỗi!", "Không tìm thấy modal đăng ký. Vui lòng kiểm tra cấu trúc HTML.", "error");
      }
    });
  }
}

// Xử lý modal đăng nhập
if (modalLogin) {
  modalLogin.addEventListener("click", (e) => {
    if (e.target === modalLogin) {
      modalLogin.classList.remove("show");
      modalLogin.style.display = "none";
    }
  });
} else {
  console.error("Không tìm thấy phần tử modal đăng nhập!");
}

// Xử lý gửi form đăng nhập
if (loginForm) {
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
    const user = accounts.find((account) => account.email === email && account.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      Swal.fire("Thành công!", "Đăng nhập thành công.", "success").then(() => {
        modalLogin.classList.remove("show");
        modalLogin.style.display = "none";
        loginForm.reset();
        updateAuthButtons();
        if (user.role === "Admin") {
          window.location.href = "Admin-page.html";
        }
      });
    } else {
      Swal.fire("Lỗi!", "Email hoặc mật khẩu không đúng.", "error");
    }
  });
}

// Xử lý liên kết quên mật khẩu
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

// Chuyển sang modal đăng ký từ modal đăng nhập
if (registerLink) {
  registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    modalLogin.classList.remove("show");
    modalLogin.style.display = "none";
    if (modalRegister) {
      modalRegister.classList.add("show");
      modalRegister.style.display = "flex";
    }
  });
}

// Xử lý modal đăng ký
if (modalRegister) {
  modalRegister.addEventListener("click", (e) => {
    if (e.target === modalRegister) {
      modalRegister.classList.remove("show");
      modalRegister.style.display = "none";
    }
  });
}

// Xử lý gửi form đăng ký
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
      Swal.fire("Lỗi!", "Vui lòng điền đầy đủ tất cả các trường.", "error");
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

    Swal.fire("Thành công!", "Đăng ký thành công. Bạn đã được đăng nhập.", "success").then(() => {
      modalRegister.classList.remove("show");
      modalRegister.style.display = "none";
      registerForm.reset();
      updateAuthButtons();
    });
  });
}

// Chuyển sang modal đăng nhập từ modal đăng ký
if (loginLink) {
  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    modalRegister.classList.remove("show");
    modalRegister.style.display = "none";
    if (modalLogin) {
      modalLogin.classList.add("show");
      modalLogin.style.display = "flex";
    }
  });
}

// Chức năng thanh bên
// Chuyển đổi trạng thái mở rộng/thu gọn của thanh bên
let isSidebarExpanded = false;
chevronBtn.addEventListener('click', () => {
  isSidebarExpanded = !isSidebarExpanded;
  if (isSidebarExpanded) {
    sidebar.classList.add('expanded');
    mainContent.classList.add('expanded');
    header.classList.add('expanded');
    chevronBtn.querySelector('i').classList.replace('fa-chevron-right', 'fa-chevron-left');
  } else {
    sidebar.classList.remove('expanded');
    mainContent.classList.remove('expanded');
    header.classList.remove('expanded');
    chevronBtn.querySelector('i').classList.replace('fa-chevron-left', 'fa-chevron-right');
  }
});

// Chức năng trình phát âm thanh
document.addEventListener('DOMContentLoaded', () => {
  // Kiểm tra sự tồn tại của các phần tử trình phát
  const audioPlayer = document.getElementById('audio-player');
  const playBtn = document.querySelector('.play-btn');
  const playerAlbumImg = document.querySelector('.player-album-img img');
  const playerSongTitle = document.querySelector('.player-song-info h6');
  const playerSongArtist = document.querySelector('.player-song-info p');

  if (!audioPlayer || !playBtn || !playerAlbumImg || !playerSongTitle || !playerSongArtist) {
    console.error('Thiếu các phần tử cần thiết cho trình phát âm thanh. Vui lòng kiểm tra HTML.');
    Swal.fire('Lỗi!', 'Thiếu các phần tử HTML cho trình phát âm thanh.', 'error');
    return;
  }

  let isPlaying = false;

  // Hàm kiểm tra tính hợp lệ của URL MP3
  async function checkMp3Url(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok && response.headers.get('content-type').includes('audio');
    } catch (error) {
      console.error('Lỗi khi kiểm tra URL MP3:', error);
      return false;
    }
  }

  // Hàm phát bài hát
  async function playSong(song) {
    if (!song || !song.mp3 || !song.image || !song.title || !song.artist) {
      console.error('Dữ liệu bài hát không hợp lệ:', song);
      Swal.fire('Lỗi!', 'Dữ liệu bài hát không hợp lệ.', 'error');
      return;
    }

    // Kiểm tra URL MP3 trước khi phát
    const isValidMp3 = await checkMp3Url(song.mp3);
    if (!isValidMp3) {
      console.error('URL MP3 không hợp lệ:', song.mp3);
      Swal.fire('Lỗi!', 'Không thể tải file MP3. Vui lòng kiểm tra đường dẫn.', 'error');
      return;
    }

    playerAlbumImg.src = song.image;
    playerSongTitle.textContent = song.title;
    playerSongArtist.textContent = song.artist;
    audioPlayer.src = song.mp3;

    audioPlayer.play().then(() => {
      isPlaying = true;
      playBtn.querySelector('i').classList.replace('bi-play-fill', 'bi-pause-fill');
    }).catch((error) => {
      console.error('Lỗi khi phát bài hát:', error);
      Swal.fire('Lỗi!', 'Không thể phát bài hát. Có thể do chính sách trình duyệt hoặc lỗi mạng.', 'error');
    });
  }

  // Xử lý nút phát/tạm dừng
  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      audioPlayer.pause();
      isPlaying = false;
      playBtn.querySelector('i').classList.replace('bi-pause-fill', 'bi-play-fill');
    } else {
      audioPlayer.play().then(() => {
        isPlaying = true;
        playBtn.querySelector('i').classList.replace('bi-play-fill', 'bi-pause-fill');
      }).catch((error) => {
        console.error('Lỗi khi phát bài hát:', error);
        Swal.fire('Lỗi!', 'Không thể phát bài hát. Có thể do chính sách trình duyệt hoặc lỗi mạng.', 'error');
      });
    }
  });

  // Xử lý nhấp vào mục bảng xếp hạng
  document.querySelector('.charts-section').addEventListener('click', async (e) => {
    const chartItem = e.target.closest('.chart-item');
    if (chartItem) {
      const index = parseInt(chartItem.dataset.index);
      const song = musicData.charts[index];
      if (song) {
        console.log('Nhấp vào mục bảng xếp hạng:', index, song);
        await playSong(song);
      } else {
        console.error('Không tìm thấy bài hát tại chỉ số bảng xếp hạng:', index);
        Swal.fire('Lỗi!', 'Không tìm thấy bài hát trong bảng xếp hạng.', 'error');
      }
    }
  });

  // Xử lý nhấp vào mục album
  document.addEventListener('click', async (e) => {
    const albumItem = e.target.closest('.album-item');
    if (albumItem) {
      const index = parseInt(albumItem.dataset.index);
      const song = musicData.albums[index];
      if (song) {
        console.log('Nhấp vào mục album:', index, song);
        await playSong(song);
      } else {
        console.error('Không tìm thấy bài hát tại chỉ số album:', index);
        Swal.fire('Lỗi!', 'Không tìm thấy bài hát trong album.', 'error');
      }
    }
  });
});

// Chức năng carousel
document.addEventListener('DOMContentLoaded', () => {
  // Điều hướng carousel cho danh sách vừa phát
  const recentlyPlayedGrid = document.querySelector('.recently-played .album-grid');
  const recentlyPlayedPrev = document.querySelector('.recently-played .carousel-controls button:first-child');
  const recentlyPlayedNext = document.querySelector('.recently-played .carousel-controls button:last-child');
  let recentlyPlayedIndex = 0;
  const totalRecentlyPlayedItems = recentlyPlayedGrid.children.length;

  recentlyPlayedNext.addEventListener('click', () => {
    if (recentlyPlayedIndex < totalRecentlyPlayedItems - 6) {
      recentlyPlayedIndex++;
      recentlyPlayedGrid.style.transform = `translateX(-${recentlyPlayedIndex * (100 / 6)}%)`;
    }
  });

  recentlyPlayedPrev.addEventListener('click', () => {
    if (recentlyPlayedIndex > 0) {
      recentlyPlayedIndex--;
      recentlyPlayedGrid.style.transform = `translateX(-${recentlyPlayedIndex * (100 / 6)}%)`;
    }
  });

  // Điều hướng carousel cho nghệ sĩ nổi bật
  const featuredArtistsGrid = document.querySelector('.featured-artists .album-grid');
  const featuredArtistsPrev = document.querySelector('.featured-artists .carousel-controls button:first-child');
  const featuredArtistsNext = document.querySelector('.featured-artists .carousel-controls button:last-child');
  let featuredArtistsIndex = 0;
  const totalFeaturedArtistsItems = featuredArtistsGrid.children.length;

  featuredArtistsNext.addEventListener('click', () => {
    if (featuredArtistsIndex < totalFeaturedArtistsItems - 6) {
      featuredArtistsIndex++;
      featuredArtistsGrid.style.transform = `translateX(-${featuredArtistsIndex * (100 / 6)}%)`;
    }
  });

  featuredArtistsPrev.addEventListener('click', () => {
    if (featuredArtistsIndex > 0) {
      featuredArtistsIndex--;
      featuredArtistsGrid.style.transform = `translateX(-${featuredArtistsIndex * (100 / 6)}%)`;
    }
  });

  // Điều hướng carousel cho album nổi bật
  const featuredAlbumsGrid = document.querySelector('.featured-albums .album-grid');
  const featuredAlbumsPrev = document.querySelector('.featured-albums .carousel-controls button:first-child');
  const featuredAlbumsNext = document.querySelector('.featured-albums .carousel-controls button:last-child');
  let featuredAlbumsIndex = 0;
  const totalFeaturedAlbumsItems = featuredAlbumsGrid.children.length;

  featuredAlbumsNext.addEventListener('click', () => {
    if (featuredAlbumsIndex < totalFeaturedAlbumsItems - 6) {
      featuredAlbumsIndex++;
      featuredAlbumsGrid.style.transform = `translateX(-${featuredAlbumsIndex * (100 / 6)}%)`;
    }
  });

  featuredAlbumsPrev.addEventListener('click', () => {
    if (featuredAlbumsIndex > 0) {
      featuredAlbumsIndex--;
      featuredAlbumsGrid.style.transform = `translateX(-${featuredAlbumsIndex * (100 / 6)}%)`;
    }
  });
});

// Khởi tạo giao diện
updateAuthButtons();
filterContent(""); // Tải nội dung ban đầu