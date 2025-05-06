document.addEventListener("DOMContentLoaded", () => {
    let tracks = JSON.parse(localStorage.getItem("tracks")) || [];
    let currentFilter = "all";
    let currentPage = 1;
    const itemsPerPage = 10;
    let searchQuery = "";
  
    // Dữ liệu bài hát mặc định từ topMusicSong.data
    const defaultTracks = [
      ...[
        { id: 1, name: "Ava Cornish", name_music: "Until I Met You", img: "../assets/1.png", mp3: "https://samplesongs.netlify.app/Faded.mp3", listType: "Top Music" },
        { id: 2, name: "Ava Cornish", name_music: "Walking Promises", img: "../assets/2.png", mp3: "https://samplesongs.netlify.app/Solo.mp3", listType: "Top Music" },
        { id: 3, name: "Ava Cornish", name_music: "Gimme Some Courage", img: "../assets/3.png", mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3", listType: "Top Music" },
        { id: 4, name: "Ava Cornish", name_music: "Desired Games", img: "../assets/4.png", mp3: "https://samplesongs.netlify.app/Bad%20Liar.mp3", listType: "Top Music" },
        { id: 5, name: "Ava Cornish", name_music: "Dark Alley Acoustic", img: "../assets/5.png", mp3: "https://samplesongs.netlify.app/Hate%20Me.mp3", listType: "Top Music" },
        { id: 6, name: "Ava Cornish", name_music: "Walking Promises", img: "../assets/6.png", mp3: "https://samplesongs.netlify.app/Without%20Me.mp3", listType: "Top Music" },
        { id: 7, name: "Ava Cornish", name_music: "Endless Things", img: "../assets/7.png", mp3: "https://samplesongs.netlify.app/Faded.mp3", listType: "Top Music" },
        { id: 8, name: "Ava Cornish", name_music: "Dream Your Moments", img: "../assets/8.png", mp3: "https://samplesongs.netlify.app/Solo.mp3", listType: "Top Music" },
        { id: 9, name: "Ava Cornish", name_music: "Until I Met You", img: "../assets/9.png", mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3", listType: "Top Music" },
        { id: 10, name: "Ava Cornish", name_music: "Gimme Some Courage", img: "../assets/10.png", mp3: "https://samplesongs.netlify.app/Bad%20Liar.mp3", listType: "Top Music" },
        { id: 11, name: "Ava Cornish", name_music: "Dark Alley Acoustic", img: "../assets/11.png", mp3: "https://samplesongs.netlify.app/Hate%20Me.mp3", listType: "Top Music" },
        { id: 12, name: "Ava Cornish", name_music: "The Heartbeat Stops", img: "../assets/12.png", mp3: "https://samplesongs.netlify.app/Without%20Me.mp3", listType: "Top Music" },
        { id: 13, name: "Ava Cornish", name_music: "One More Stranger", img: "../assets/13.png", mp3: "https://samplesongs.netlify.app/Faded.mp3", listType: "Top Music" },
        { id: 14, name: "Ava Cornish", name_music: "Walking Promises", img: "../assets/14.png", mp3: "https://samplesongs.netlify.app/Solo.mp3", listType: "Top Music" },
        { id: 15, name: "Ava Cornish", name_music: "Endless Things", img: "../assets/15.png", mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3", listType: "Top Music" },
      ],
      ...[
        { id: 16, name: "Ava Cornish & Brian Hill", name_music: "Bloodlust", img: "../assets/album1.jpg.png", mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3", listType: "Top All Times" },
        { id: 17, name: "Ava Cornish & Brian Hill", name_music: "Time flies", img: "../assets/album2.jpg.png", mp3: "https://samplesongs.netlify.app/Bad%20Liar.mp3", listType: "Top All Times" },
        { id: 18, name: "Ava Cornish & Brian Hill", name_music: "Dark matters", img: "../assets/album3.jpg.png", mp3: "https://samplesongs.netlify.app/Faded.mp3", listType: "Top All Times" },
        { id: 19, name: "Ava Cornish & Brian Hill", name_music: "Eye to eye", img: "../assets/album4.jpg.png", mp3: "https://samplesongs.netlify.app/Hate%20Me.mp3", listType: "Top All Times" },
        { id: 20, name: "Ava Cornish & Brian Hill", name_music: "Cloud nine", img: "../assets/album5.jpg.png", mp3: "https://samplesongs.netlify.app/Solo.mp3", listType: "Top All Times" },
        { id: 21, name: "Ava Cornish & Brian Hill", name_music: "Cobweb of lies", img: "../assets/album6.jpg.png", mp3: "https://samplesongs.netlify.app/Without%20Me.mp3", listType: "Top All Times" },
      ],
      ...[
        { id: 22, name: "Ava Cornish", name_music: "Dark Alley Acoustic", img: "../assets/1.png", mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3", listType: "Trending" },
        { id: 23, name: "Ava Cornish", name_music: "Dark Alley Acoustic", img: "../assets/2.png", mp3: "https://samplesongs.netlify.app/Solo.mp3", listType: "Trending" },
        { id: 24, name: "Ava Cornish", name_music: "Dark Alley Acoustic", img: "../assets/3.png", mp3: "https://samplesongs.netlify.app/Faded.mp3", listType: "Trending" },
        { id: 25, name: "Ava Cornish", name_music: "Dark Alley Acoustic", img: "../assets/4.png", mp3: "https://samplesongs.netlify.app/Hate%20Me.mp3", listType: "Trending" },
      ]
    ];
  
    // Khởi tạo dữ liệu nếu trống
    if (tracks.length === 0) {
      tracks = defaultTracks.map((track) => ({
        trackId: `TRK${track.id.toString().padStart(6, "0")}`,
        id: track.id,
        nameMusic: track.name_music,
        artist: track.name,
        listType: track.listType,
        img: track.img,
        mp3: track.mp3
      }));
      localStorage.setItem("tracks", JSON.stringify(tracks));
    }
  
    // Chuẩn hóa dữ liệu
    function normalizeTracks() {
      const maxId = tracks.length > 0 ? Math.max(...tracks.map((t) => t.id)) : 25;
      const normalized = tracks.map((track, index) => ({
        trackId: track.trackId || `TRK${(maxId + index + 1).toString().padStart(6, "0")}`,
        id: track.id || maxId + index + 1,
        nameMusic: track.nameMusic || "",
        artist: track.artist || "",
        listType: ["Top Music", "Top All Times", "Trending"].includes(track.listType) ? track.listType : "Top Music",
        img: track.img || "",
        mp3: track.mp3 || ""
      }));
      localStorage.setItem("tracks", JSON.stringify(normalized));
      return normalized;
    }
  
    // Cập nhật số lượng bộ lọc
    function updateFilterCounts(tracks) {
      const counts = {
        all: tracks.length,
        "Top Music": tracks.filter((t) => t.listType === "Top Music").length,
        "Top All Times": tracks.filter((t) => t.listType === "Top All Times").length,
        Trending: tracks.filter((t) => t.listType === "Trending").length
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
  
    // Tải và hiển thị bài hát
    function loadTracks(filter = currentFilter, page = currentPage, query = searchQuery) {
      console.log("Đang tải bài hát với bộ lọc:", filter, "trang:", page, "tìm kiếm:", query);
      tracks = normalizeTracks();
      let filteredTracks = filter === "all" ? tracks : tracks.filter((t) => t.listType === filter);
  
      if (query) {
        filteredTracks = filteredTracks.filter(
          (t) =>
            t.nameMusic.toLowerCase().includes(query.toLowerCase()) ||
            t.artist.toLowerCase().includes(query.toLowerCase()) ||
            t.trackId.toLowerCase().includes(query.toLowerCase())
        );
      }
  
      console.log("Số bài hát được lọc:", filteredTracks.length);
      updateFilterCounts(tracks);
      const totalItems = filteredTracks.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
      page = Math.max(1, Math.min(page, totalPages));
      currentPage = page;
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
              (track, index) => `
              <tr>
                  <td><div class="form-check"><input class="form-check-input" type="checkbox" value=""></div></td>
                  <td>${track.trackId}</td>
                  <td>${track.nameMusic}</td>
                  <td>${track.artist}</td>
                  <td>${track.listType}</td>
                  <td>
                      <div class="d-flex">
                          <button class="btn btn-sm btn-link text-danger p-0 me-2 delete-btn" data-index="${tracks.indexOf(track)}"><i class="bi bi-trash"></i></button>
                          <button class="btn btn-sm btn-link text-primary p-0 edit-btn" data-index="${tracks.indexOf(track)}"><i class="bi bi-pencil"></i></button>
                      </div>
                  </td>
              </tr>
          `
            )
            .join("")
        : '<tr><td colspan="6" class="text-center">Không tìm thấy bài hát.</td></tr>';
  
      console.log("Đang hiển thị trang:", page, "của", totalPages, "với", paginatedTracks.length, "bài hát");
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
      console.log("Cập nhật phân trang: tổng số trang =", totalPages, "trang hiện tại =", currentPage);
  
      const prevItem = document.createElement("li");
      prevItem.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
      prevItem.innerHTML = `<a class="page-link" href="#" aria-label="Previous">Trước</a>`;
      prevItem.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPage > 1) {
          currentPage--;
          console.log("Chuyển đến trang trước:", currentPage);
          loadTracks();
        } else {
          console.log("Đã ở trang đầu tiên, không thể chuyển trước!");
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
            loadTracks();
          } else {
            console.log("Đã ở trang hiện tại:", currentPage);
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
          loadTracks();
        } else {
          console.log("Đã ở trang cuối cùng, không thể chuyển tiếp!");
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
                    <option value="Top Music">Top Music</option>
                    <option value="Top All Times">Top All Times</option>
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
  
            if (!nameMusic || !artist || !listType) {
              Swal.showValidationMessage("Tên bài hát, Nghệ sĩ và Loại danh sách là bắt buộc.");
              return false;
            }
  
            return { nameMusic, artist, listType, img, mp3 };
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const maxId = tracks.length > 0 ? Math.max(...tracks.map((t) => t.id)) : 25;
            const newId = maxId + 1;
            tracks.push({
              trackId: `TRK${newId.toString().padStart(6, "0")}`,
              id: newId,
              nameMusic: result.value.nameMusic,
              artist: result.value.artist,
              listType: result.value.listType,
              img: result.value.img,
              mp3: result.value.mp3
            });
            localStorage.setItem("tracks", JSON.stringify(tracks));
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
      const index = event.currentTarget.getAttribute("data-index");
      const track = tracks[index];
  
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
          tracks.splice(index, 1);
          localStorage.setItem("tracks", JSON.stringify(tracks));
          currentPage = 1;
          loadTracks();
          Swal.fire("Thành công!", "Đã xóa bài hát thành công.", "success");
        }
      });
    }
  
    // Sửa bài hát
    function handleEdit(event) {
      const index = event.currentTarget.getAttribute("data-index");
      const track = tracks[index];
  
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
                  <option value="Top Music" ${track.listType === "Top Music" ? "selected" : ""}>Top Music</option>
                  <option value="Top All Times" ${track.listType === "Top All Times" ? "selected" : ""}>Top All Times</option>
                  <option value="Trending" ${track.listType === "Trending" ? "selected" : ""}>Trending</option>
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
  
          if (!nameMusic || !artist || !listType) {
            Swal.showValidationMessage("Tên bài hát, Nghệ sĩ và Loại danh sách là bắt buộc.");
            return false;
          }
  
          return { nameMusic, artist, listType, img, mp3 };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          tracks[index] = {
            trackId: track.trackId,
            id: track.id,
            nameMusic: result.value.nameMusic,
            artist: result.value.artist,
            listType: result.value.listType,
            img: result.value.img,
            mp3: result.value.mp3
          };
          localStorage.setItem("tracks", JSON.stringify(tracks));
          loadTracks();
          Swal.fire("Thành công!", "Đã cập nhật bài hát thành công.", "success");
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
          loadTracks();
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
        loadTracks();
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
            const indices = Array.from(checkboxes)
              .map((cb) => {
                const deleteBtn = cb.closest("tr").querySelector(".delete-btn");
                return deleteBtn ? parseInt(deleteBtn.getAttribute("data-index")) : null;
              })
              .filter((index) => index !== null);
  
            if (indices.length === 0) {
              Swal.fire("Lỗi", "Không có bài hát hợp lệ được chọn để xóa.", "error");
              return;
            }
  
            tracks = tracks.filter((_, i) => !indices.includes(i));
            localStorage.setItem("tracks", JSON.stringify(tracks));
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
  });