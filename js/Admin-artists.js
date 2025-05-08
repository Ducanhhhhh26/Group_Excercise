document.addEventListener("DOMContentLoaded", () => {
  let artists = JSON.parse(localStorage.getItem("artists")) || [];
  let defaultImages = JSON.parse(localStorage.getItem("defaultImages")) || [
    "/assets/r_music1.jpg",
    "/assets/artist1.jpg",
    "/assets/artist2.jpg",
    "/assets/artist3.jpg",
    "/assets/artist4.jpg",
    "/assets/artist5.jpg",
    "/assets/artist6.jpg",
    "/assets/artist7.jpg",
    "/assets/artist8.jpg",
    "/assets/song6_1.jpg",
    "/assets/album4.jpg",
    "/assets/song2_1.jpg",
    "/assets/artist9.jpg",
    "/assets/artist10.jpg",
    "/assets/artist11.jpg",
    "/assets/artist12.jpg",
    "/assets/artist13.jpg",
    "/assets/song4_1.jpg",
    "/assets/album2.jpg",
    "/assets/album3.jpg",
  ];
  const placeholderImage = "/assets/placeholder.jpg";
  let currentFilter = "all";
  let currentPage = 1;
  const itemsPerPage = 10;
  let searchQuery = "";

  // Dữ liệu nghệ sĩ mặc định
  const defaultArtists = [
    { title: "Claire Hudson" },
    { title: "Carl Brown" },
    { title: "Virginia Harris" },
    { title: "Max Glover" },
    { title: "Jennifer Kelly" },
    { title: "Harry Jackson" },
    { title: "Kevin Buckland" },
    { title: "Anna Ellison" },
    { title: "Kylie Greene" },
    { title: "Sean Wilson" },
    { title: "Jennifer Kelly" },
    { title: "Steven Walker" },
    { title: "Olivia Paige" },
    { title: "Nicole Miller" },
    { title: "Edward Clark" },
    { title: "Adam Glover" },
    { title: "Leah Knox" },
    { title: "Charles Davidson" },
    { title: "Vanessa Hunter" },
    { title: "Sophie Hudson" },
  ];

  // Khởi tạo dữ liệu nếu trống
  if (artists.length === 0) {
    artists = defaultArtists.map((artist, index) => ({
      artistId: `NG${(index + 1).toString().padStart(6, "0")}`,
      fullName: artist.title,
      email: `${artist.title.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      songCount: Math.floor(Math.random() * 50) + 1,
      role: "Artists",
      password: "Artist@123",
      image: defaultImages[index % defaultImages.length] || placeholderImage,
    }));
    localStorage.setItem("artists", JSON.stringify(artists));
  }

  // Chuẩn hóa dữ liệu
  function normalizeArtists() {
    const normalized = artists.map((artist) => ({
      artistId: artist.artistId || `NG${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`,
      fullName: artist.fullName || "",
      email: artist.email || "",
      songCount: artist.songCount || 0,
      role: artist.role || "Artists",
      password: artist.password || "",
      image: artist.image || defaultImages[Math.floor(Math.random() * defaultImages.length)] || placeholderImage,
    }));
    localStorage.setItem("artists", JSON.stringify(normalized));
    return normalized;
  }

  // Cập nhật số lượng bộ lọc
  function updateFilterCounts(artists) {
    const counts = {
      all: artists.length,
      Artists: artists.filter((art) => art.role === "Artists").length,
    };
    const filterPills = document.querySelectorAll('[data-filter] .filter-count');
    if (!filterPills.length) {
      console.error("Không tìm thấy bộ lọc (.filter-count)!");
      return;
    }
    filterPills.forEach((span) => {
      const filter = span.parentElement.getAttribute("data-filter");
      span.textContent = counts[filter] || 0;
    });
  }

  // Tải và hiển thị nghệ sĩ trong bảng
  function loadArtists(filter = currentFilter, page = currentPage, query = searchQuery) {
    console.log("Đang tải nghệ sĩ với bộ lọc:", filter, "trang:", page, "tìm kiếm:", query);
    artists = normalizeArtists();
    let filteredArtists = filter === "all" ? artists : artists.filter((art) => art.role === filter);

    if (query) {
      filteredArtists = filteredArtists.filter(
        (art) =>
          art.fullName.toLowerCase().includes(query.toLowerCase()) ||
          art.email.toLowerCase().includes(query.toLowerCase()) ||
          art.artistId.toLowerCase().includes(query.toLowerCase())
      );
    }

    console.log("Số nghệ sĩ được lọc:", filteredArtists.length);
    updateFilterCounts(artists);
    const totalItems = filteredArtists.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    page = Math.max(1, Math.min(page, totalPages));
    currentPage = page;
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedArtists = filteredArtists.slice(startIndex, startIndex + itemsPerPage);

    const tbody = document.querySelector("table tbody");
    if (!tbody) {
      console.error("Không tìm thấy phần thân bảng (table tbody)!");
      return;
    }
    tbody.innerHTML = paginatedArtists.length
      ? paginatedArtists
          .map(
            (artist, index) => `
            <tr>
                <td><div class="form-check"><input class="form-check-input" type="checkbox" value=""></div></td>
                <td>${artist.artistId}</td>
                <td>${artist.fullName}</td>
                <td>${artist.email}</td>
                <td>${artist.songCount}</td>
                <td>
                    <div class="d-flex">
                        <button class="btn btn-sm btn-link text-danger p-0 me-2 delete-btn" data-index="${artists.indexOf(artist)}"><i class="bi bi-trash"></i></button>
                        <button class="btn btn-sm btn-link text-primary p-0 edit-btn" data-index="${artists.indexOf(artist)}"><i class="bi bi-pencil"></i></button>
                    </div>
                </td>
            </tr>
        `
          )
          .join("")
      : '<tr><td colspan="6" class="text-center">Không tìm thấy nghệ sĩ.</td></tr>';

    console.log("Đang hiển thị trang:", page, "của", totalPages, "với", paginatedArtists.length, "nghệ sĩ");
    updatePagination(totalPages, page);
    attachButtonListeners();
    renderArtistsSections2(); // Gọi hàm render để hiển thị trong .artists-grid2
  }

  // Hiển thị nghệ sĩ trong .artists-grid2
  function renderArtistsSections2() {
    console.log("Rendering artists for .artists-grid2", artists);
    const artistSections2 = document.querySelectorAll(".artists-grid2");
    artistSections2.forEach((grid) => {
      grid.innerHTML = "";
      artists.forEach((artist) => {
        const artistCard2 = document.createElement("div");
        artistCard2.classList.add("artist-card2");
        const img = document.createElement("img");
        img.src = artist.image || placeholderImage;
        img.alt = artist.fullName;
        img.onerror = () => { img.src = placeholderImage; };
        const title2 = document.createElement("p");
        title2.textContent = artist.fullName;
        artistCard2.appendChild(img);
        artistCard2.appendChild(title2);
        grid.appendChild(artistCard2);
      });
    });
  }

  // Cập nhật phân trang
  function updatePagination(totalPages, currentPage) {
    const paginationContainer = document.querySelector(".pagination");
    if (!paginationContainer) {
      console.error("Không tìm thấy container phân trang (.pagination)!");
      return;
    }
    paginationContainer.innerHTML = "";
    console.log("Cập nhật phân trang: tổng số trang =", totalPages, "trang hiện tại =", currentPage);

    const prevItem = document.createElement("li");
    prevItem.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
    prevItem.innerHTML = `<a class="page-link" href="#" aria-label="Previous">Trước</a>`;
    prevItem.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        console.log("Chuyển đến trang trước:", currentPage);
        loadArtists();
      }
    });
    paginationContainer.appendChild(prevItem);

    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement("li");
      pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;
      pageItem.innerHTML = `<a class="page-link" href="#" aria-label="Page ${i}">${i}</a>`;
      pageItem.addEventListener("click", (e) => {
        e.preventDefault();
        if (i !== currentPage) {
          currentPage = i;
          console.log("Chuyển đến trang:", currentPage);
          loadArtists();
        }
      });
      paginationContainer.appendChild(pageItem);
    }

    const nextItem = document.createElement("li");
    nextItem.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
    nextItem.innerHTML = `<a class="page-link" href="#" aria-label="Next">Tiếp</a>`;
    nextItem.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        console.log("Chuyển đến trang tiếp theo:", currentPage);
        loadArtists();
      }
    });
    paginationContainer.appendChild(nextItem);

    console.log("Đã tạo phân trang với", totalPages, "trang");
  }

  // Gắn sự kiện cho nút
  function attachButtonListeners() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    const editButtons = document.querySelectorAll(".edit-btn");
    deleteButtons.forEach((btn) => {
      btn.removeEventListener("click", handleDelete);
      btn.addEventListener("click", handleDelete);
    });
    editButtons.forEach((btn) => {
      btn.removeEventListener("click", handleEdit);
      btn.addEventListener("click", handleEdit);
    });
  }

  // Xử lý ảnh thành Base64
  async function processImage(file) {
    if (!file) return null;
    if (file.size > 1 * 1024 * 1024) {
      Swal.fire("Lỗi", "Kích thước ảnh không được vượt quá 1MB.", "error");
      return null;
    }
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); 
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }

  // Thêm nghệ sĩ
  const addButton = document.querySelector(".btn-primary");
  if (addButton) {
    addButton.addEventListener("click", () => {
      Swal.fire({
        title: "<strong>Thêm Nghệ sĩ</strong>",
        html: `
          <div class="container" style="text-align: left; font-family: Arial, sans-serif;">
            <div class="row mb-2">
              <div class="col-12">
                <h6 style="color: #333; font-size: 14px; font-weight: bold;">Thông tin chung</h6>
                <p style="color: #666; font-size: 12px;">Cập nhật thông tin nghệ sĩ</p>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12 text-center">
                <div class="d-flex justify-content-center align-items-center" style="height: 80px; width: 80px; border-radius: 50%; background-color: #e0e0e0; margin: 0 auto;">
                  <img id="preview-img" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: none;" />
                  <span id="upload-text" style="color: #666; font-size: 12px; text-align: center;">Nhấn để tải lên</span>
                </div>
                <p style="color: #666; font-size: 10px; margin-top: 5px;">SVG, PNG, JPG hoặc GIF (tối đa 400x400px)</p>
                <input type="file" id="profile-pic" accept="image/*" style="display: none;" />
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-6">
                <label class="form-label" style="color: #333; font-size: 12px;">Tên nghệ sĩ</label>
                <div class="input-group">
                  <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                    <i class="bi bi-person-fill" style="color: #666;"></i>
                  </span>
                  <input type="text" class="form-control" id="full-name" placeholder="Tên nghệ sĩ" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                </div>
              </div>
              <div class="col-6">
                <label class="form-label" style="color: #333; font-size: 12px;">Số bài hát</label>
                <div class="input-group">
                  <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                    <i class="bi bi-music-note" style="color: #666;"></i>
                  </span>
                  <input type="number" class="form-control" id="song-count" placeholder="Số bài hát" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-6">
                <label class="form-label" style="color: #333; font-size: 12px;">Email</label>
                <div class="input-group">
                  <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                    <i class="bi bi-envelope-fill" style="color: #666;"></i>
                  </span>
                  <input type="email" class="form-control" id="email" placeholder="Địa chỉ Email" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                </div>
              </div>
              <div class="col-6">
                <label class="form-label" style="color: #333; font-size: 12px;">Mật khẩu</label>
                <div class="input-group">
                  <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                    <i class="bi bi-lock-fill" style="color: #666;"></i>
                  </span>
                  <input type="password" class="form-control" id="password" placeholder="Mật khẩu" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                </div>
              </div>
            </div>
          </div>
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Thêm Nghệ sĩ",
        cancelButtonText: "Hủy",
        customClass: { popup: "custom-modal", confirmButton: "btn btn-primary", cancelButton: "btn btn-gray me-2" },
        didOpen: () => {
          const uploadArea = document.querySelector(".d-flex.justify-content-center.align-items-center");
          const fileInput = document.getElementById("profile-pic");
          const previewImg = document.getElementById("preview-img");
          const uploadText = document.getElementById("upload-text");
          if (uploadArea && fileInput) {
            uploadArea.addEventListener("click", () => fileInput.click());
            fileInput.addEventListener("change", async () => {
              if (fileInput.files[0]) {
                const base64 = await processImage(fileInput.files[0]);
                if (base64) {
                  previewImg.src = base64;
                  previewImg.style.display = "block";
                  uploadText.style.display = "none";
                }
              }
            });
          } else {
            console.warn("Không tìm thấy khu vực tải lên trong modal!");
          }
        },
        preConfirm: async () => {
          const fullName = document.getElementById("full-name").value.trim();
          const email = document.getElementById("email").value.trim();
          const songCount = parseInt(document.getElementById("song-count").value) || 0;
          const password = document.getElementById("password").value.trim();
          const fileInput = document.getElementById("profile-pic");
          const image = fileInput.files[0] ? await processImage(fileInput.files[0]) : null;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

          if (!fullName || !email || !password) {
            Swal.showValidationMessage("Tên, Email và Mật khẩu là bắt buộc.");
            return false;
          }
          if (!emailRegex.test(email)) {
            Swal.showValidationMessage("Vui lòng nhập địa chỉ email hợp lệ.");
            return false;
          }
          if (!passwordRegex.test(password)) {
            Swal.showValidationMessage(
              "Mật khẩu phải dài ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
            );
            return false;
          }
          if (artists.some((art) => art.email === email)) {
            Swal.showValidationMessage("Email này đã được đăng ký.");
            return false;
          }

          return { fullName, email, songCount, password, image };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          let image = result.value.image || defaultImages[Math.floor(Math.random() * defaultImages.length)] || placeholderImage;
          if (result.value.image) {
            defaultImages.push(image);
            localStorage.setItem("defaultImages", JSON.stringify(defaultImages));
          }
          artists.push({
            artistId: `NG${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`,
            fullName: result.value.fullName,
            email: result.value.email,
            songCount: result.value.songCount,
            role: "Artists",
            password: result.value.password,
            image,
          });
          localStorage.setItem("artists", JSON.stringify(artists));
          currentPage = 1;
          loadArtists();
          Swal.fire("Thành công!", "Đã thêm nghệ sĩ thành công.", "success");
        }
      });
    });
  } else {
    console.error("Không tìm thấy nút Thêm Nghệ sĩ (.btn-primary)!");
  }

  // Xóa nghệ sĩ
  function handleDelete(event) {
    const index = event.currentTarget.getAttribute("data-index");
    const artist = artists[index];

    Swal.fire({
      title: "<strong>Xác nhận Xóa</strong>",
      html: `<p style="color: #333; font-size: 14px;">Bạn có chắc muốn xóa nghệ sĩ <strong>${artist.fullName}</strong>?</p>`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      customClass: { popup: "custom-modal", confirmButton: "btn btn-danger", cancelButton: "btn btn-gray me-2" },
    }).then((result) => {
      if (result.isConfirmed) {
        artists.splice(index, 1);
        localStorage.setItem("artists", JSON.stringify(artists));
        currentPage = 1;
        loadArtists();
        Swal.fire("Thành công!", "Đã xóa nghệ sĩ thành công.", "success");
      }
    });
  }

  // Sửa nghệ sĩ
  function handleEdit(event) {
    const index = event.currentTarget.getAttribute("data-index");
    const artist = artists[index];

    Swal.fire({
      title: "<strong>Chỉnh sửa Nghệ sĩ</strong>",
      html: `
        <div class="container" style="text-align: left; font-family: Arial, sans-serif;">
          <div class="row mb-2">
            <div class="col-12">
              <h6 style="color: #333; font-size: 14px; font-weight: bold;">Thông tin chung</h6>
              <p style="color: #666; font-size: 12px;">Cập nhật thông tin nghệ sĩ</p>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 text-center">
              <div class="d-flex justify-content-center align-items-center" style="height: 80px; width: 80px; border-radius: 50%; background-color: #e0e0e0; margin: 0 auto;">
                <img id="preview-img" src="${artist.image || placeholderImage}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" />
                <span id="upload-text" style="color: #666; font-size: 12px; text-align: center; display: none;">Nhấn để tải lên</span>
              </div>
              <p style="color: #666; font-size: 10px; margin-top: 5px;">SVG, PNG, JPG hoặc GIF (tối đa 400x400px)</p>
              <input type="file" id="profile-pic" accept="image/*" style="display: none;" />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <label class="form-label" style="color: #333; font-size: 12px;">Tên nghệ sĩ</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                  <i class="bi bi-person-fill" style="color: #666;"></i>
                </span>
                <input type="text" class="form-control" id="full-name" value="${artist.fullName}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
              </div>
            </div>
            <div class="col-6">
              <label class="form-label" style="color: #333; font-size: 12px;">Số bài hát</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                  <i class="bi bi-music-note" style="color: #666;"></i>
                </span>
                <input type="number" class="form-control" id="song-count" value="${artist.songCount}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <label class="form-label" style="color: #333; font-size: 12px;">Email</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                  <i class="bi bi-envelope-fill" style="color: #666;"></i>
                </span>
                <input type="email" class="form-control" id="email" value="${artist.email}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
              </div>
            </div>
          </div>
        </div>
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
      customClass: { popup: "custom-modal", confirmButton: "btn btn-primary", cancelButton: "btn btn-gray me-2" },
      didOpen: () => {
        const uploadArea = document.querySelector(".d-flex.justify-content-center.align-items-center");
        const fileInput = document.getElementById("profile-pic");
        const previewImg = document.getElementById("preview-img");
        const uploadText = document.getElementById("upload-text");
        if (uploadArea && fileInput) {
          uploadArea.addEventListener("click", () => fileInput.click());
          fileInput.addEventListener("change", async () => {
            if (fileInput.files[0]) {
              const base64 = await processImage(fileInput.files[0]);
              if (base64) {
                previewImg.src = base64;
                previewImg.style.display = "block";
                uploadText.style.display = "none";
              }
            }
          });
        } else {
          console.warn("Không tìm thấy khu vực tải lên trong modal!");
        }
      },
      preConfirm: async () => {
        const fullName = document.getElementById("full-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const songCount = parseInt(document.getElementById("song-count").value) || 0;
        const fileInput = document.getElementById("profile-pic");
        const image = fileInput.files[0] ? await processImage(fileInput.files[0]) : artist.image;

        if (!fullName || !email) {
          Swal.showValidationMessage("Tên và Email là bắt buộc.");
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          Swal.showValidationMessage("Vui lòng nhập địa chỉ email hợp lệ.");
          return false;
        }
        if (artists.some((art, i) => art.email === email && i !== parseInt(index))) {
          Swal.showValidationMessage("Email này đã được đăng ký.");
          return false;
        }

        return { fullName, email, songCount, image };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        let image = result.value.image || defaultImages[Math.floor(Math.random() * defaultImages.length)] || placeholderImage;
        if (result.value.image && result.value.image !== artist.image) {
          defaultImages.push(image);
          localStorage.setItem("defaultImages", JSON.stringify(defaultImages));
        }
        artists[index] = {
          artistId: artist.artistId,
          fullName: result.value.fullName,
          email: result.value.email,
          songCount: result.value.songCount,
          role: artist.role,
          password: artist.password,
          image,
        };
        localStorage.setItem("artists", JSON.stringify(artists));
        loadArtists();
        Swal.fire("Thành công!", "Đã cập nhật nghệ sĩ thành công.", "success");
      }
    });
  }

  // Lọc và tìm kiếm
  const filterPills = document.querySelectorAll(".filter-pill");
  if (filterPills.length) {
    filterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        filterPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        currentFilter = pill.getAttribute("data-filter");
        currentPage = 1;
        console.log("Áp dụng bộ lọc:", currentFilter);
        loadArtists();
      });
    });
  } else {
    console.error("Không tìm thấy bộ lọc (.filter-pill)!");
  }

  const searchInput = document.querySelector(".form-control[placeholder='Tìm kiếm']");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      currentPage = 1;
      console.log("Tìm kiếm:", searchQuery);
      loadArtists();
    });
  } else {
    console.error("Không tìm thấy ô tìm kiếm (.form-control[placeholder='Tìm kiếm'])!");
  }

  // Đăng xuất
  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      console.log("Trước khi đăng xuất, currentUser:", localStorage.getItem("currentUser"));
      localStorage.removeItem("currentUser");
      console.log("Sau khi đăng xuất, currentUser:", localStorage.getItem("currentUser"));
      Swal.fire("Thành công", "Đã đăng xuất thành công.", "success").then(() => {
        window.location.href = "index.html";
      });
    });
  } else {
    console.error("Không tìm thấy nút Đăng xuất (.logout-btn)!");
  }

  // Xóa nhiều nghệ sĩ
  const deleteSelectedBtn = document.querySelector(".delete-selected-btn");
  if (deleteSelectedBtn) {
    deleteSelectedBtn.addEventListener("click", () => {
      const checkboxes = document.querySelectorAll("tbody .form-check-input:checked");
      if (checkboxes.length === 0) {
        Swal.fire("Cảnh báo", "Vui lòng chọn ít nhất một nghệ sĩ.", "warning");
        return;
      }

      Swal.fire({
        title: "Xác nhận Xóa",
        text: `Bạn có chắc muốn xóa ${checkboxes.length} nghệ sĩ đã chọn?`,
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
        customClass: { popup: "custom-modal", confirmButton: "btn btn-danger", cancelButton: "btn btn-gray me-2" },
      }).then((result) => {
        if (result.isConfirmed) {
          const indices = Array.from(checkboxes)
            .map((cb) => {
              const deleteBtn = cb.closest("tr").querySelector(".delete-btn");
              return deleteBtn ? parseInt(deleteBtn.getAttribute("data-index")) : null;
            })
            .filter((index) => index !== null);

          if (indices.length === 0) {
            Swal.fire("Lỗi", "Không có nghệ sĩ hợp lệ được chọn để xóa.", "error");
            return;
          }

          artists = artists.filter((_, i) => !indices.includes(i));
          localStorage.setItem("artists", JSON.stringify(artists));
          currentPage = 1;
          loadArtists();
          Swal.fire("Thành công", "Đã xóa các nghệ sĩ được chọn.", "success");
        }
      });
    });
  } else {
    console.error("Không tìm thấy nút Xóa đã chọn (.delete-selected-btn)!");
  }

  // Checkbox chọn tất cả
  const selectAllCheckbox = document.getElementById("selectAll");
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", (e) => {
      const checkboxes = document.querySelectorAll("tbody .form-check-input");
      checkboxes.forEach((cb) => (cb.checked = e.target.checked));
    });
  } else {
    console.error("Không tìm thấy checkbox Chọn tất cả (#selectAll)!");
  }

  // Tải ban đầu
  loadArtists();
});