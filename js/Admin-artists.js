document.addEventListener("DOMContentLoaded", () => {
  // Dữ liệu mặc định
  const defaultArtistsData = {
      data: [
          {
              Artists: [
                  { artistId: "NG000001", fullName: "Claire Hudson", email: "claire.hudson@example.com", songCount: 45, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000002", fullName: "Carl Brown", email: "carl.brown@example.com", songCount: 32, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000003", fullName: "Virginia Harris", email: "virginia.harris@example.com", songCount: 28, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000004", fullName: "Max Glover", email: "max.glover@example.com", songCount: 19, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000005", fullName: "Jennifer Kelly", email: "jennifer.kelly@example.com", songCount: 50, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000006", fullName: "Harry Jackson", email: "harry.jackson@example.com", songCount: 15, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000007", fullName: "Kevin Buckland", email: "kevin.buckland@example.com", songCount: 42, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000008", fullName: "Anna Ellison", email: "anna.ellison@example.com", songCount: 37, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000009", fullName: "Kylie Greene", email: "kylie.greene@example.com", songCount: 23, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000010", fullName: "Sean Wilson", email: "sean.wilson@example.com", songCount: 30, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000011", fullName: "Jennifer Kelly", email: "jennifer.kelly2@example.com", songCount: 25, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000012", fullName: "Steven Walker", email: "steven.walker@example.com", songCount: 18, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000013", fullName: "Olivia Paige", email: "olivia.paige@example.com", songCount: 40, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000014", fullName: "Nicole Miller", email: "nicole.miller@example.com", songCount: 12, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000015", fullName: "Edward Clark", email: "edward.clark@example.com", songCount: 35, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000016", fullName: "Adam Glover", email: "adam.glover@example.com", songCount: 27, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000017", fullName: "Leah Knox", email: "leah.knox@example.com", songCount: 22, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000018", fullName: "Charles Davidson", email: "charles.davidson@example.com", songCount: 48, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000019", fullName: "Vanessa Hunter", email: "vanessa.hunter@example.com", songCount: 31, role: "Artists", password: "Artist@123" },
                  { artistId: "NG000020", fullName: "Sophie Hudson", email: "sophie.hudson@example.com", songCount: 29, role: "Artists", password: "Artist@123" }
              ]
          }
      ]
  };

  // Khởi tạo dữ liệu từ localStorage hoặc dùng mặc định
  let artistsData = (() => {
      try {
          const stored = localStorage.getItem("artists");
          if (stored) {
              const parsed = JSON.parse(stored);
              if (parsed && Array.isArray(parsed.data)) {
                  return parsed;
              }
              console.warn("Dữ liệu trong localStorage không đúng định dạng, sử dụng dữ liệu mặc định.");
          }
          localStorage.setItem("artists", JSON.stringify(defaultArtistsData));
          return defaultArtistsData;
      } catch (e) {
          console.error("Lỗi khi parse localStorage 'artists':", e);
          localStorage.setItem("artists", JSON.stringify(defaultArtistsData));
          return defaultArtistsData;
      }
  })();

  // Lưu dữ liệu vào localStorage
  function saveArtists() {
      try {
          localStorage.setItem("artists", JSON.stringify(artistsData));
      } catch (e) {
          console.error("Lỗi khi lưu vào localStorage:", e);
      }
  }

  // Làm phẳng dữ liệu để hiển thị
  function flattenArtists() {
      if (!artistsData || !Array.isArray(artistsData.data)) {
          console.error("Dữ liệu artistsData.data không hợp lệ:", artistsData);
          return [];
      }
      return artistsData.data.flatMap((category) => {
          const type = Object.keys(category)[0];
          return category[type].map((artist, index) => ({
              ...artist,
              type,
              originalCategory: type,
              originalIndex: index
          }));
      });
  }

  let currentFilter = "all";
  let currentPage = 1;
  const itemsPerPage = 10;
  let searchQuery = "";

  // Cập nhật số lượng bộ lọc
  function updateFilterCounts(flatArtists) {
      const filterPills = document.querySelectorAll(".filter-pill");
      if (!filterPills.length) {
          console.error("Không tìm thấy bộ lọc (.filter-pill)!");
          return;
      }
      const counts = {
          all: flatArtists.length,
          Artists: flatArtists.filter((a) => a.type === "Artists").length
      };
      filterPills.forEach((pill) => {
          const filter = pill.getAttribute("data-filter");
          const countSpan = pill.querySelector(".filter-count");
          if (countSpan) {
              countSpan.textContent = counts[filter] || 0;
          } else {
              console.warn(`Không tìm thấy span .filter-count cho bộ lọc: ${filter}`);
          }
      });
  }

  // Tải và hiển thị nghệ sĩ
  function loadArtists(filter = currentFilter, page = currentPage, query = searchQuery) {
      let flatArtists = flattenArtists();
      let filteredArtists = filter === "all" ? flatArtists : flatArtists.filter((a) => a.type === filter);

      if (query) {
          filteredArtists = filteredArtists.filter(
              (a) =>
                  (a.fullName && a.fullName.toLowerCase().includes(query.toLowerCase())) ||
                  (a.email && a.email.toLowerCase().includes(query.toLowerCase())) ||
                  (a.artistId && a.artistId.toLowerCase().includes(query.toLowerCase()))
          );
      }

      updateFilterCounts(flatArtists);
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
                    (artist) => `
                    <tr>
                        <td><div class="form-check"><input class="form-check-input" type="checkbox" value=""></div></td>
                        <td>${artist.artistId}</td>
                        <td>${artist.fullName}</td>
                        <td>${artist.email}</td>
                        <td>${artist.songCount}</td>
                        <td>
                            <div class="d-flex">
                                <button class="btn btn-sm btn-link text-danger p-0 me-2 delete-btn" data-category="${artist.originalCategory}" data-index="${artist.originalIndex}"><i class="bi bi-trash"></i></button>
                                <button class="btn btn-sm btn-link text-primary p-0 edit-btn" data-category="${artist.originalCategory}" data-index="${artist.originalIndex}"><i class="bi bi-pencil"></i></button>
                            </div>
                        </td>
                    </tr>
                `
                )
                .join("")
          : '<tr><td colspan="6" class="text-center">Không tìm thấy nghệ sĩ.</td></tr>';

      updatePagination(totalPages, page);
      attachButtonListeners();
  }

  // Cập nhật phân trang
  function updatePagination(totalPages, currentPage) {
      const paginationContainer = document.querySelector(".pagination");
      if (!paginationContainer) {
          console.error("Không tìm thấy container phân trang (.pagination)!");
          return;
      }
      paginationContainer.innerHTML = "";

      const prevItem = document.createElement("li");
      prevItem.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
      prevItem.innerHTML = `<a class="page-link" href="#" aria-label="Previous">Trước</a>`;
      prevItem.addEventListener("click", (e) => {
          e.preventDefault();
          if (currentPage > 1) {
              currentPage--;
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
              currentPage = i;
              loadArtists();
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
              loadArtists();
          }
      });
      paginationContainer.appendChild(nextItem);
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
                                  <span style="color: #666; font-size: 12px; text-align: center;">Nhấn để tải lên</span>
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
                  if (uploadArea) {
                      const fileInput = document.getElementById("profile-pic");
                      uploadArea.addEventListener("click", () => fileInput.click());
                  } else {
                      console.warn("Không tìm thấy khu vực tải lên trong modal!");
                  }
              },
              preConfirm: () => {
                  const fullName = document.getElementById("full-name").value.trim();
                  const email = document.getElementById("email").value.trim();
                  const songCount = parseInt(document.getElementById("song-count").value) || 0;
                  const password = document.getElementById("password").value.trim();
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
                  if (flattenArtists().some((art) => art.email === email)) {
                      Swal.showValidationMessage("Email này đã được đăng ký.");
                      return false;
                  }

                  return { fullName, email, songCount, password };
              }
          }).then((result) => {
              if (result.isConfirmed) {
                  const newArtist = {
                      artistId: `NG${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`,
                      fullName: result.value.fullName,
                      email: result.value.email,
                      songCount: result.value.songCount,
                      role: "Artists",
                      password: result.value.password
                  };
                  const category = artistsData.data.find((cat) => cat.Artists);
                  if (category) {
                      category.Artists.push(newArtist);
                  } else {
                      artistsData.data.push({ Artists: [newArtist] });
                  }
                  saveArtists();
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
      const category = event.currentTarget.getAttribute("data-category");
      const index = parseInt(event.currentTarget.getAttribute("data-index"));
      const artist = artistsData.data.find((cat) => cat[category])[category][index];

      Swal.fire({
          title: "<strong>Xác nhận Xóa</strong>",
          html: `<p style="color: #333; font-size: 14px;">Bạn có chắc muốn xóa nghệ sĩ <strong>${artist.fullName}</strong>?</p>`,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: "Xóa",
          cancelButtonText: "Hủy",
          customClass: { popup: "custom-modal", confirmButton: "btn btn-danger", cancelButton: "btn btn-gray me-2" }
      }).then((result) => {
          if (result.isConfirmed) {
              artistsData.data.find((cat) => cat[category])[category].splice(index, 1);
              saveArtists();
              currentPage = 1;
              loadArtists();
              Swal.fire("Thành công!", "Đã xóa nghệ sĩ thành công.", "success");
          }
      });
  }

  // Sửa nghệ sĩ
  function handleEdit(event) {
      const category = event.currentTarget.getAttribute("data-category");
      const index = parseInt(event.currentTarget.getAttribute("data-index"));
      const artist = artistsData.data.find((cat) => cat[category])[category][index];

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
                              <span style="color: #666; font-size: 12px; text-align: center;">Nhấn để tải lên</span>
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
                      <div class="col-6">
                          <label class="form-label" style="color: #333; font-size: 12px;">Mật khẩu</label>
                          <div class="input-group">
                              <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                  <i class="bi bi-lock-fill" style="color: #666;"></i>
                              </span>
                              <input type="password" class="form-control" id="password" value="${artist.password}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
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
              if (uploadArea) {
                  const fileInput = document.getElementById("profile-pic");
                  uploadArea.addEventListener("click", () => fileInput.click());
              } else {
                  console.warn("Không tìm thấy khu vực tải lên trong modal!");
              }
          },
          preConfirm: () => {
              const fullName = document.getElementById("full-name").value.trim();
              const email = document.getElementById("email").value.trim();
              const songCount = parseInt(document.getElementById("song-count").value) || 0;
              const password = document.getElementById("password").value.trim();
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
              if (flattenArtists().some((art, i) => art.email === email && !(art.originalCategory === category && art.originalIndex === index))) {
                  Swal.showValidationMessage("Email này đã được đăng ký.");
                  return false;
              }

              return { fullName, email, songCount, password };
          }
      }).then((result) => {
          if (result.isConfirmed) {
              const updatedArtist = {
                  artistId: artist.artistId,
                  fullName: result.value.fullName,
                  email: result.value.email,
                  songCount: result.value.songCount,
                  role: artist.role,
                  password: result.value.password
              };
              artistsData.data.find((cat) => cat[category])[category][index] = updatedArtist;
              saveArtists();
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
          loadArtists();
      });
  } else {
      console.error("Không tìm thấy ô tìm kiếm (.form-control[placeholder='Tìm kiếm'])!");
  }

  // Đăng xuất
  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("currentUser");
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
              customClass: { popup: "custom-modal", confirmButton: "btn btn-danger", cancelButton: "btn btn-gray me-2" }
          }).then((result) => {
              if (result.isConfirmed) {
                  const deletions = Array.from(checkboxes)
                      .map((cb) => {
                          const deleteBtn = cb.closest("tr").querySelector(".delete-btn");
                          return deleteBtn
                              ? {
                                    category: deleteBtn.getAttribute("data-category"),
                                    index: parseInt(deleteBtn.getAttribute("data-index"))
                                }
                              : null;
                      })
                      .filter((del) => del !== null);

                  deletions.sort((a, b) => b.index - a.index);
                  deletions.forEach(({ category, index }) => {
                      artistsData.data.find((cat) => cat[category])[category].splice(index, 1);
                  });

                  saveArtists();
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
  saveArtists();
});