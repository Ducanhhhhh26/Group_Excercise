document.addEventListener("DOMContentLoaded", () => {
  // Kiểm tra xác thực người dùng
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || currentUser.role !== "Admin") {
    Swal.fire({
      title: "Access Denied",
      text: "You do not have permission to access this page.",
      icon: "error",
      confirmButtonText: "OK"
    }).then(() => {
      window.location.href = "index.html";
    });
    return;
  }

  // Dữ liệu mặc định
  const defaultTracksData = {
      data: [
          {
              Top_Music: [
                  { trackId: "TRK000001", id: 1, nameMusic: "Until I Met You", artist: "Ava Cornish", img: "../assets/1.png", mp3: "https://samplesongs.netlify.app/Faded.mp3" },
                  { trackId: "TRK000002", id: 2, nameMusic: "Walking Promises", artist: "Ava Cornish", img: "../assets/2.png", mp3: "https://samplesongs.netlify.app/Solo.mp3" },
                  { trackId: "TRK000003", id: 3, nameMusic: "Gimme Some Courage", artist: "Ava Cornish", img: "../assets/3.png", mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3" },
                  { trackId: "TRK000004", id: 4, nameMusic: "Desired Games", artist: "Ava Cornish", img: "../assets/4.png", mp3: "https://samplesongs.netlify.app/Bad%20Liar.mp3" },
                  { trackId: "TRK000005", id: 5, nameMusic: "Dark Alley Acoustic", artist: "Ava Cornish", img: "../assets/5.png", mp3: "https://samplesongs.netlify.app/Hate%20Me.mp3" },
                  { trackId: "TRK000006", id: 6, nameMusic: "Walking Promises", artist: "Ava Cornish", img: "../assets/6.png", mp3: "https://samplesongs.netlify.app/Without%20Me.mp3" },
                  { trackId: "TRK000007", id: 7, nameMusic: "Endless Things", artist: "Ava Cornish", img: "../assets/7.png", mp3: "https://samplesongs.netlify.app/Faded.mp3" },
                  { trackId: "TRK000008", id: 8, nameMusic: "Dream Your Moments", artist: "Ava Cornish", img: "../assets/8.png", mp3: "https://samplesongs.netlify.app/Solo.mp3" },
                  { trackId: "TRK000009", id: 9, nameMusic: "Until I Met You", artist: "Ava Cornish", img: "../assets/9.png", mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3" },
                  { trackId: "TRK000010", id: 10, nameMusic: "Gimme Some Courage", artist: "Ava Cornish", img: "../assets/10.png", mp3: "https://samplesongs.netlify.app/Bad%20Liar.mp3" },
                  { trackId: "TRK000011", id: 11, nameMusic: "Dark Alley Acoustic", artist: "Ava Cornish", img: "../assets/11.png", mp3: "https://samplesongs.netlify.app/Hate%20Me.mp3" },
                  { trackId: "TRK000012", id: 12, nameMusic: "The Heartbeat Stops", artist: "Ava Cornish", img: "../assets/12.png", mp3: "https://samplesongs.netlify.app/Without%20Me.mp3" },
                  { trackId: "TRK000013", id: 13, nameMusic: "One More Stranger", artist: "Ava Cornish", img: "../assets/13.png", mp3: "https://samplesongs.netlify.app/Faded.mp3" },
                  { trackId: "TRK000014", id: 14, nameMusic: "Walking Promises", artist: "Ava Cornish", img: "../assets/14.png", mp3: "https://samplesongs.netlify.app/Solo.mp3" },
                  { trackId: "TRK000015", id: 15, nameMusic: "Endless Things", artist: "Ava Cornish", img: "../assets/15.png", mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3" }
              ]
          },
          {
              Top_All_Times: [
                  { trackId: "TRK000016", id: 16, nameMusic: "Bloodlust", artist: "Ava Cornish & Brian Hill", img: "../assets/album1.jpg.png", mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3" },
                  { trackId: "TRK000017", id: 17, nameMusic: "Time flies", artist: "Ava Cornish & Brian Hill", img: "../assets/album2.jpg.png", mp3: "https://samplesongs.netlify.app/Bad%20Liar.mp3" },
                  { trackId: "TRK000018", id: 18, nameMusic: "Dark matters", artist: "Ava Cornish & Brian Hill", img: "../assets/album3.jpg.png", mp3: "https://samplesongs.netlify.app/Faded.mp3" },
                  { trackId: "TRK000019", id: 19, nameMusic: "Eye to eye", artist: "Ava Cornish & Brian Hill", img: "../assets/album4.jpg.png", mp3: "https://samplesongs.netlify.app/Hate%20Me.mp3" },
                  { trackId: "TRK000020", id: 20, nameMusic: "Cloud nine", artist: "Ava Cornish & Brian Hill", img: "../assets/album5.jpg.png", mp3: "https://samplesongs.netlify.app/Solo.mp3" },
                  { trackId: "TRK000021", id: 21, nameMusic: "Cobweb of lies", artist: "Ava Cornish & Brian Hill", img: "../assets/album6.jpg.png", mp3: "https://samplesongs.netlify.app/Without%20Me.mp3" }
              ]
          },
          {
              Trending: [
                  { trackId: "TRK000022", id: 22, nameMusic: "Dark Alley Acoustic", artist: "Ava Cornish", img: "../assets/1.png", mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3" },
                  { trackId: "TRK000023", id: 23, nameMusic: "Dark Alley Acoustic", artist: "Ava Cornish", img: "../assets/2.png", mp3: "https://samplesongs.netlify.app/Solo.mp3" },
                  { trackId: "TRK000024", id: 24, nameMusic: "Dark Alley Acoustic", artist: "Ava Cornish", img: "../assets/3.png", mp3: "https://samplesongs.netlify.app/Faded.mp3" },
                  { trackId: "TRK000025", id: 25, nameMusic: "Dark Alley Acoustic", artist: "Ava Cornish", img: "../assets/4.png", mp3: "https://samplesongs.netlify.app/Hate%20Me.mp3" }
              ]
          }
      ]
  };

  // Khởi tạo dữ liệu từ localStorage hoặc dùng mặc định
  let tracksData = (() => {
      try {
          const stored = localStorage.getItem("tracks");
          if (stored) {
              const parsed = JSON.parse(stored);
              if (parsed && Array.isArray(parsed.data)) {
                  return parsed;
              }
              console.warn("Dữ liệu trong localStorage không đúng định dạng, sử dụng dữ liệu mặc định.");
          }
          localStorage.setItem("tracks", JSON.stringify(defaultTracksData));
          return defaultTracksData;
      } catch (e) {
          console.error("Lỗi khi parse localStorage 'tracks':", e);
          localStorage.setItem("tracks", JSON.stringify(defaultTracksData));
          return defaultTracksData;
      }
  })();

  // Lưu dữ liệu vào localStorage
  function saveTracks() {
      try {
          localStorage.setItem("tracks", JSON.stringify(tracksData));
      } catch (e) {
          console.error("Lỗi khi lưu vào localStorage:", e);
      }
  }

  // Làm phẳng dữ liệu để hiển thị
  function flattenTracks() {
      if (!tracksData || !Array.isArray(tracksData.data)) {
          console.error("Dữ liệu tracksData.data không hợp lệ:", tracksData);
          return [];
      }
      return tracksData.data.flatMap((category) => {
          const type = Object.keys(category)[0];
          return category[type].map((track, index) => ({
              ...track,
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
  function updateFilterCounts(flatTracks) {
      const filterPills = document.querySelectorAll(".filter-pill");
      if (!filterPills.length) {
          console.warn("Không tìm thấy bộ lọc (.filter-pill), hiển thị tất cả bài hát.");
          return;
      }
      const counts = {
          all: flatTracks.length,
          top_music: flatTracks.filter((t) => t.type.toLowerCase() === "top_music").length,
          top_all_times: flatTracks.filter((t) => t.type.toLowerCase() === "top_all_times").length,
          trending: flatTracks.filter((t) => t.type.toLowerCase() === "trending").length
      };
      filterPills.forEach((pill) => {
          const filter = pill.getAttribute("data-filter")?.replace(/\s+/g, "_").toLowerCase();
          const countSpan = pill.querySelector(".filter-count");
          if (countSpan && filter) {
              countSpan.textContent = counts[filter] || 0;
          } else {
              console.warn(`Không tìm thấy span .filter-count hoặc data-filter cho bộ lọc:`, pill);
          }
      });
  }

  // Tải và hiển thị bài hát
  function loadTracks(filter = currentFilter, page = currentPage, query = searchQuery) {
      let flatTracks = flattenTracks();
      console.log("Current filter:", filter);
      console.log("Available types in flatTracks:", [...new Set(flatTracks.map(t => t.type))]);
      const normalizedFilter = filter.replace(/\s+/g, "_").toLowerCase();
      let filteredTracks = normalizedFilter === "all" ? flatTracks : flatTracks.filter((t) => t.type.toLowerCase() === normalizedFilter);
      console.log("Filtered tracks:", filteredTracks);

      if (query) {
          filteredTracks = filteredTracks.filter(
              (t) =>
                  (t.nameMusic && t.nameMusic.toLowerCase().includes(query.toLowerCase())) ||
                  (t.artist && t.artist.toLowerCase().includes(query.toLowerCase())) ||
                  (t.trackId && t.trackId.toLowerCase().includes(query.toLowerCase()))
          );
      }

      updateFilterCounts(flatTracks);
      const totalItems = filteredTracks.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
      
      // Reset to page 1 if current page is greater than total pages
      if (page > totalPages) {
          page = 1;
          currentPage = 1;
      }
      
      const startIndex = (page - 1) * itemsPerPage;
      const paginatedTracks = filteredTracks.slice(startIndex, startIndex + itemsPerPage);

      const tbody = document.querySelector("table tbody");
      if (!tbody) {
          console.error("Không tìm thấy phần thân bảng (table tbody)!");
          return;
      }
      tbody.innerHTML = paginatedTracks.length
          ? paginatedTracks
                .map(
                    (track) => `
                    <tr>
                        <td><div class="form-check"><input class="form-check-input" type="checkbox" value=""></div></td>
                        <td>${track.trackId}</td>
                        <td>${track.nameMusic}</td>
                        <td>${track.artist}</td>
                        <td>${track.type}</td>
                        <td>
                            <div class="d-flex">
                                <button class="btn btn-sm btn-link text-danger p-0 me-2 delete-btn" data-category="${track.originalCategory}" data-index="${track.originalIndex}"><i class="bi bi-trash"></i></button>
                                <button class="btn btn-sm btn-link text-primary p-0 edit-btn" data-category="${track.originalCategory}" data-index="${track.originalIndex}"><i class="bi bi-pencil"></i></button>
                            </div>
                        </td>
                    </tr>
                `
                )
                .join("")
          : `<tr><td colspan="6" class="text-center">Không tìm thấy bài hát. Bộ lọc "${filter}" không khớp với bất kỳ danh mục nào.</td></tr>`;

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

      // Previous button
      const prevItem = document.createElement("li");
      prevItem.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
      prevItem.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><i class="bi bi-chevron-left"></i></a>`;
      prevItem.addEventListener("click", (e) => {
          e.preventDefault();
          if (currentPage > 1) {
              loadTracks(currentFilter, currentPage - 1, searchQuery);
          }
      });
      paginationContainer.appendChild(prevItem);

      // Page numbers
      const maxVisiblePages = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      if (endPage - startPage + 1 < maxVisiblePages) {
          startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      if (startPage > 1) {
          const firstPage = document.createElement("li");
          firstPage.className = "page-item";
          firstPage.innerHTML = `<a class="page-link" href="#">1</a>`;
          firstPage.addEventListener("click", (e) => {
              e.preventDefault();
              loadTracks(currentFilter, 1, searchQuery);
          });
          paginationContainer.appendChild(firstPage);

          if (startPage > 2) {
              const ellipsis = document.createElement("li");
              ellipsis.className = "page-item disabled";
              ellipsis.innerHTML = `<span class="page-link">...</span>`;
              paginationContainer.appendChild(ellipsis);
          }
      }

      for (let i = startPage; i <= endPage; i++) {
          const pageItem = document.createElement("li");
          pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;
          pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
          pageItem.addEventListener("click", (e) => {
              e.preventDefault();
              loadTracks(currentFilter, i, searchQuery);
          });
          paginationContainer.appendChild(pageItem);
      }

      if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
              const ellipsis = document.createElement("li");
              ellipsis.className = "page-item disabled";
              ellipsis.innerHTML = `<span class="page-link">...</span>`;
              paginationContainer.appendChild(ellipsis);
          }

          const lastPage = document.createElement("li");
          lastPage.className = "page-item";
          lastPage.innerHTML = `<a class="page-link" href="#">${totalPages}</a>`;
          lastPage.addEventListener("click", (e) => {
              e.preventDefault();
              loadTracks(currentFilter, totalPages, searchQuery);
          });
          paginationContainer.appendChild(lastPage);
      }

      // Next button
      const nextItem = document.createElement("li");
      nextItem.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
      nextItem.innerHTML = `<a class="page-link" href="#" aria-label="Next"><i class="bi bi-chevron-right"></i></a>`;
      nextItem.addEventListener("click", (e) => {
          e.preventDefault();
          if (currentPage < totalPages) {
              loadTracks(currentFilter, currentPage + 1, searchQuery);
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

  // Thêm bài hát
  const addButton = document.querySelector(".btn-primary");
  if (addButton) {
      addButton.addEventListener("click", () => {
          Swal.fire({
              title: "<strong>Thêm Bài hát</strong>",
              html: `
                  <div class="container" style="text-align: left; font-family: Arial, sans-serif;">
                      <div class="row mb-2">
                          <div class="col-12">
                              <h6 style="color: #333; font-size: 14px; font-weight: bold;">Thông tin bài hát</h6>
                              <p style="color: #666; font-size: 12px;">Cập nhật thông tin bài hát</p>
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
                              <label class="form-label" style="color: #333; font-size: 12px;">Tên bài hát</label>
                              <div class="input-group">
                                  <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                      <i class="bi bi-music-note" style="color: #666;"></i>
                                  </span>
                                  <input type="text" class="form-control" id="name-music" placeholder="Tên bài hát" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                              </div>
                          </div>
                          <div class="col-6">
                              <label class="form-label" style="color: #333; font-size: 12px;">Nghệ sĩ</label>
                              <div class="input-group">
                                  <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                      <i class="bi bi-person-fill" style="color: #666;"></i>
                                  </span>
                                  <input type="text" class="form-control" id="artist" placeholder="Nghệ sĩ" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                              </div>
                          </div>
                      </div>
                      <div class="row mb-2">
                          <div class="col-6">
                              <label class="form-label" style="color: #333; font-size: 12px;">Loại danh sách</label>
                              <select class="form-select" id="list-type" style="font-size: 12px; border-color: #ccc;">
                                  <option value="Top_Music">Top Music</option>
                                  <option value="Top_All_Times">Top All Times</option>
                                  <option value="Trending">Trending</option>
                              </select>
                          </div>
                          <div class="col-6">
                              <label class="form-label" style="color: #333; font-size: 12px;">URL MP3</label>
                              <div class="input-group">
                                  <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                      <i class="bi bi-link" style="color: #666;"></i>
                                  </span>
                                  <input type="url" class="form-control" id="mp3" placeholder="URL MP3" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                              </div>
                          </div>
                      </div>
                  </div>
              `,
              showCloseButton: true,
              showCancelButton: true,
              focusConfirm: false,
              confirmButtonText: "Thêm Bài hát",
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
                  const nameMusic = document.getElementById("name-music").value.trim();
                  const artist = document.getElementById("artist").value.trim();
                  const listType = document.getElementById("list-type").value;
                  const mp3 = document.getElementById("mp3").value.trim();
                  const img = document.getElementById("profile-pic").files[0] ? URL.createObjectURL(document.getElementById("profile-pic").files[0]) : "";

                  if (!nameMusic || !artist || !listType || !mp3) {
                      Swal.showValidationMessage("Tên bài hát, Nghệ sĩ, Loại danh sách và URL MP3 là bắt buộc.");
                      return false;
                  }
                  const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
                  if (!urlRegex.test(mp3)) {
                      Swal.showValidationMessage("Vui lòng nhập URL MP3 hợp lệ.");
                      return false;
                  }

                  return { nameMusic, artist, listType, img, mp3 };
              }
          }).then((result) => {
              if (result.isConfirmed) {
                  const maxId = flattenTracks().length > 0 ? Math.max(...flattenTracks().map((t) => t.id)) : 25;
                  const newTrack = {
                      trackId: `TRK${(maxId + 1).toString().padStart(6, "0")}`,
                      id: maxId + 1,
                      nameMusic: result.value.nameMusic,
                      artist: result.value.artist,
                      img: result.value.img,
                      mp3: result.value.mp3
                  };
                  const category = tracksData.data.find((cat) => cat[result.value.listType]);
                  if (category) {
                      category[result.value.listType].push(newTrack);
                  } else {
                      tracksData.data.push({ [result.value.listType]: [newTrack] });
                  }
                  saveTracks();
                  currentPage = 1;
                  loadTracks();
                  Swal.fire("Thành công!", "Đã thêm bài hát thành công.", "success");
              }
          });
      });
  } else {
      console.error("Không tìm thấy nút Thêm Bài hát (.btn-primary)!");
  }

  // Xóa bài hát
  function handleDelete(event) {
      const category = event.currentTarget.getAttribute("data-category");
      const index = parseInt(event.currentTarget.getAttribute("data-index"));
      const track = tracksData.data.find((cat) => cat[category])[category][index];

      Swal.fire({
          title: "<strong>Xác nhận Xóa</strong>",
          html: `<p style="color: #333; font-size: 14px;">Bạn có chắc muốn xóa bài hát <strong>${track.nameMusic}</strong>?</p>`,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: "Xóa",
          cancelButtonText: "Hủy",
          customClass: { popup: "custom-modal", confirmButton: "btn btn-danger", cancelButton: "btn btn-gray me-2" }
      }).then((result) => {
          if (result.isConfirmed) {
              tracksData.data.find((cat) => cat[category])[category].splice(index, 1);
              saveTracks();
              currentPage = 1;
              loadTracks();
              Swal.fire("Thành công!", "Đã xóa bài hát thành công.", "success");
          }
      });
  }

  // Sửa bài hát
  function handleEdit(event) {
      const category = event.currentTarget.getAttribute("data-category");
      const index = parseInt(event.currentTarget.getAttribute("data-index"));
      const track = tracksData.data.find((cat) => cat[category])[category][index];

      Swal.fire({
          title: "<strong>Chỉnh sửa Bài hát</strong>",
          html: `
              <div class="container" style="text-align: left; font-family: Arial, sans-serif;">
                  <div class="row mb-2">
                      <div class="col-12">
                          <h6 style="color: #333; font-size: 14px; font-weight: bold;">Thông tin bài hát</h6>
                          <p style="color: #666; font-size: 12px;">Cập nhật thông tin bài hát</p>
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
                          <label class="form-label" style="color: #333; font-size: 12px;">Tên bài hát</label>
                          <div class="input-group">
                              <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                  <i class="bi bi-music-note" style="color: #666;"></i>
                              </span>
                              <input type="text" class="form-control" id="name-music" value="${track.nameMusic}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                          </div>
                      </div>
                      <div class="col-6">
                          <label class="form-label" style="color: #333; font-size: 12px;">Nghệ sĩ</label>
                          <div class="input-group">
                              <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                  <i class="bi bi-person-fill" style="color: #666;"></i>
                              </span>
                              <input type="text" class="form-control" id="artist" value="${track.artist}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                          </div>
                      </div>
                  </div>
                  <div class="row mb-2">
                      <div class="col-6">
                          <label class="form-label" style="color: #333; font-size: 12px;">Loại danh sách</label>
                          <select class="form-select" id="list-type" style="font-size: 12px; border-color: #ccc;">
                              <option value="Top_Music" ${track.type === "Top_Music" ? "selected" : ""}>Top Music</option>
                              <option value="Top_All_Times" ${track.type === "Top_All_Times" ? "selected" : ""}>Top All Times</option>
                              <option value="Trending" ${track.type === "Trending" ? "selected" : ""}>Trending</option>
                          </select>
                      </div>
                      <div class="col-6">
                          <label class="form-label" style="color: #333; font-size: 12px;">URL MP3</label>
                          <div class="input-group">
                              <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                  <i class="bi bi-link" style="color: #666;"></i>
                              </span>
                              <input type="url" class="form-control" id="mp3" value="${track.mp3}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
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
              const nameMusic = document.getElementById("name-music").value.trim();
              const artist = document.getElementById("artist").value.trim();
              const listType = document.getElementById("list-type").value;
              const mp3 = document.getElementById("mp3").value.trim();
              const img = document.getElementById("profile-pic").files[0] ? URL.createObjectURL(document.getElementById("profile-pic").files[0]) : track.img;

              if (!nameMusic || !artist || !listType || !mp3) {
                  Swal.showValidationMessage("Tên bài hát, Nghệ sĩ, Loại danh sách và URL MP3 là bắt buộc.");
                  return false;
              }
              const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
              if (!urlRegex.test(mp3)) {
                  Swal.showValidationMessage("Vui lòng nhập URL MP3 hợp lệ.");
                  return false;
              }

              return { nameMusic, artist, listType, img, mp3 };
          }
      }).then((result) => {
          if (result.isConfirmed) {
              const updatedTrack = {
                  trackId: track.trackId,
                  id: track.id,
                  nameMusic: result.value.nameMusic,
                  artist: result.value.artist,
                  img: result.value.img,
                  mp3: result.value.mp3,
                  type: category // Giữ nguyên loại danh sách ban đầu
              };

              // Cập nhật bài hát trong danh mục hiện tại
              tracksData.data.find((cat) => cat[category])[category][index] = updatedTrack;

              saveTracks();
              loadTracks(currentFilter, currentPage, searchQuery);
              Swal.fire("Thành công!", "Đã cập nhật bài hát thành công.", "success");
          }
      });
  }

  // Lọc và tìm kiếm
  const filterPills = document.querySelectorAll(".filter-pill");
  if (filterPills.length) {
      filterPills.forEach((pill) => {
          pill.addEventListener("click", () => {
              const filterValue = pill.getAttribute("data-filter");
              console.log("Filter clicked:", filterValue);
              filterPills.forEach((p) => p.classList.remove("active"));
              pill.classList.add("active");
              currentFilter = filterValue || "all";
              currentPage = 1;
              loadTracks();
          });
      });
  } else {
      console.warn("Không tìm thấy bộ lọc (.filter-pill), hiển thị tất cả bài hát.");
  }

  const searchInput = document.querySelector(".form-control[placeholder='Tìm kiếm']");
  if (searchInput) {
      searchInput.addEventListener("input", (e) => {
          searchQuery = e.target.value.trim();
          currentPage = 1;
          loadTracks();
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

  // Xóa nhiều bài hát
  const deleteSelectedBtn = document.querySelector(".delete-selected-btn");
  if (deleteSelectedBtn) {
      deleteSelectedBtn.addEventListener("click", () => {
          const checkboxes = document.querySelectorAll("tbody .form-check-input:checked");
          if (checkboxes.length === 0) {
              Swal.fire("Cảnh báo", "Vui lòng chọn ít nhất một bài hát.", "warning");
              return;
          }

          Swal.fire({
              title: "Xác nhận Xóa",
              text: `Bạn có chắc muốn xóa ${checkboxes.length} bài hát đã chọn?`,
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
                      tracksData.data.find((cat) => cat[category])[category].splice(index, 1);
                  });

                  saveTracks();
                  currentPage = 1;
                  loadTracks();
                  Swal.fire("Thành công", "Đã xóa các bài hát được chọn.", "success");
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
  loadTracks();
  saveTracks();
});