let artists = JSON.parse(localStorage.getItem("artists")) || [];
let defaultImages = JSON.parse(localStorage.getItem("defaultImages")) || [
    "/assets/r_music1.jpg.png",
    "/assets/artist1.jpg.png",
    "/assets/artist2.jpg.png",
    "/assets/artist3.jpg.png",
    "/assets/artist4.jpg.png",
    "/assets/artist5.jpg.png",
    "/assets/artist6.jpg.png",
    "/assets/artist7.jpg.png",
    "/assets/artist8.jpg.png",
    "/assets/song6.jpg.png",
    "/assets/album4.jpg.png",
    "/assets/song2.jpg (1).png",
    "/assets/artist9.jpg.png",
    "/assets/artist10.jpg.png",
    "/assets/artist11.jpg.png",
    "/assets/artist12.jpg.png",
    "/assets/artist13.jpg.png",
    "/assets/song4.jpg (1).png",
    "/assets/album2.jpg.png",
    "/assets/album3.jpg.png",
    // Thêm một vài hình ảnh online để test
    "https://via.placeholder.com/50x50/4CAF50/white?text=A1",
    "https://via.placeholder.com/50x50/2196F3/white?text=A2"
];
const placeholderImage = "/assets/Artists.png";
const fallbackPlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNFMEUwRTAiLz4KPGF4dCB4PSIxOSIgeT0iMjAiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMCIgZmlsbD0iIzk5OTk5OSIgcng9IjIiLz4KPGNpcmNsZSBjeD0iMjUiIGN5PSIzOCIgcj0iOCIgZmlsbD0iIzk5OTk5OSIvPgo8L3N2Zz4K";
let currentFilter = "all";
let currentPage = 1;
const itemsPerPage = 10;
let searchQuery = "";

// Kiểm tra xác thực người dùng (tạm thời disable để test)
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
console.log("Current user:", currentUser);
// if (!currentUser || currentUser.role !== "Admin") {
//     Swal.fire({
//         title: "Access Denied",
//         text: "You do not have permission to access this page.",
//         icon: "error",
//         confirmButtonText: "OK"
//     }).then(() => {
//         window.location.href = "index.html";
//     });
// } else {
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
    const filterPills = document.querySelectorAll(".filter-pill");
    if (!filterPills.length) {
        return;
    }
    const counts = {
        all: artists.length,
        Artists: artists.filter((artist) => artist.role === "Artists").length,
        Users: artists.filter((artist) => artist.role === "Users").length,
        Admin: artists.filter((artist) => artist.role === "Admin").length,
    };
    filterPills.forEach((pill) => {
        const filter = pill.getAttribute("data-filter");
        const countSpan = pill.querySelector(".filter-count");
        if (countSpan && filter) {
            countSpan.textContent = counts[filter] || 0;
        }
    });
}

// Tải và hiển thị nghệ sĩ trong bảng
function loadArtists(filter = currentFilter, page = currentPage, query = searchQuery) {
    console.log("Loading artists...", artists);
    console.log("Placeholder image:", placeholderImage);

    let filteredArtists = filter === "all" ? artists : artists.filter((a) => a.role === filter);

    if (query) {
        filteredArtists = filteredArtists.filter(
            (a) =>
                a.fullName.toLowerCase().includes(query.toLowerCase()) ||
                a.email.toLowerCase().includes(query.toLowerCase()) ||
                a.artistId.toLowerCase().includes(query.toLowerCase())
        );
    }

    console.log("Filtered artists:", filteredArtists);

    updateFilterCounts(artists);
    const totalItems = filteredArtists.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    // Reset to page 1 if current page is greater than total pages
    if (page > totalPages) {
        page = 1;
        currentPage = 1;
    }

    const startIndex = (page - 1) * itemsPerPage;
    const paginatedArtists = filteredArtists.slice(startIndex, startIndex + itemsPerPage);

    const tbody = document.querySelector("table tbody");
    if (!tbody) {
        return;
    }
    tbody.innerHTML = paginatedArtists.length
        ? paginatedArtists
            .map(
                (artist, index) => {
                    const imageUrl = artist.image || placeholderImage;
                    console.log(`Artist ${artist.fullName}: image = ${imageUrl}`);
                    return `
                    <tr>
                        <td><div class="form-check"><input class="form-check-input" type="checkbox" value=""></div></td>
                        <td>
                            <img src="${imageUrl}" 
                                 alt="${artist.fullName}" 
                                 class="artist-table-image"
                                 onerror="console.log('Image load error for:', this.src); if(this.src !== '${fallbackPlaceholder}') { this.src='${fallbackPlaceholder}'; }" />
                        </td>
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
                `;
                }
            )
            .join("")
        : '<tr><td colspan="7" class="text-center">Không tìm thấy nghệ sĩ.</td></tr>';

    updatePagination(totalPages, page);
    attachButtonListeners();
    renderArtistsSections2(); // Gọi hàm render để hiển thị trong .artists-grid2
}

// Hiển thị nghệ sĩ trong .artists-grid2
function renderArtistsSections2() {
    const artistsGrid = document.querySelector(".artists-grid2");
    if (!artistsGrid) {
        return;
    }
    const artists = normalizeArtists();
    artistsGrid.innerHTML = "";
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
        artistsGrid.appendChild(artistCard2);
    });
}

// Cập nhật phân trang
function updatePagination(totalPages, currentPage) {
    const paginationContainer = document.querySelector(".pagination");
    if (!paginationContainer) {
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
            loadArtists(currentFilter, currentPage - 1, searchQuery);
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
            loadArtists(currentFilter, 1, searchQuery);
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
            loadArtists(currentFilter, i, searchQuery);
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
            loadArtists(currentFilter, totalPages, searchQuery);
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
            loadArtists(currentFilter, currentPage + 1, searchQuery);
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
            title: "<strong>Thêm Nghệ Sĩ</strong>",
            html: `
                    <div class="container" style="text-align: center; font-family: Arial, sans-serif;">
                        <div class="row mb-3">
                            <div class="col-12">
                                <h6 style="color: #333; font-size: 14px; font-weight: bold;">Thông Tin Nghệ Sĩ</h6>
                                <p style="color: #666; font-size: 12px;">Thêm thông tin nghệ sĩ mới</p>
                            </div>
                        </div>
                        <div class="row mb-4">
                            <div class="col-12">
                                <div class="d-flex justify-content-center align-items-center" style="height: 100px; width: 100px; border-radius: 50%; background-color: #e0e0e0; margin: 0 auto; position: relative; cursor: pointer;">
                                    <img id="preview-img" style="display: none; height: 100%; width: 100%; border-radius: 50%; object-fit: cover;" />
                                    <span id="upload-text" style="color: #666; font-size: 12px; text-align: center;">Nhấn để tải lên</span>
                                </div>
                                <p style="color: #666; font-size: 10px; margin-top: 5px;">SVG, PNG, JPG hoặc GIF (tối đa 400x400px)</p>
                                <input type="file" id="artist-img" accept="image/*" style="display: none;" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12">
                                <label class="form-label" style="color: #333; font-size: 12px;">Tên Nghệ Sĩ</label>
                                <div class="input-group" style="max-width: 300px; margin: 0 auto;">
                                    <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                        <i class="bi bi-person-fill" style="color: #666;"></i>
                                    </span>
                                    <input type="text" class="form-control" id="name" placeholder="Tên Nghệ Sĩ" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12">
                                <label class="form-label" style="color: #333; font-size: 12px;">Loại</label>
                                <select class="form-select" id="type" style="font-size: 12px; border-color: #ccc; max-width: 300px; margin: 0 auto;">
                                    <option value="Featured_Artists">Nổi Bật</option>
                                    <option value="Trending_Artists">Xu Hướng</option>
                                    <option value="Top_Artists">Hàng Đầu</option>
                                </select>
                            </div>
                        </div>
                    </div>
                `,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Thêm Nghệ Sĩ",
            cancelButtonText: "Hủy",
            customClass: { popup: "custom-modal", confirmButton: "btn btn-primary", cancelButton: "btn btn-gray me-2" },
            didOpen: () => {
                const uploadArea = document.querySelector(".d-flex.justify-content-center.align-items-center");
                const fileInput = document.getElementById("artist-img");
                const previewImg = document.getElementById("preview-img");
                const uploadText = document.getElementById("upload-text");

                if (uploadArea && fileInput && previewImg && uploadText) {
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
                }
            },
            preConfirm: async () => {
                const fullName = document.getElementById("name").value.trim();
                const type = document.getElementById("type").value;
                const fileInput = document.getElementById("artist-img");
                const image = fileInput.files[0] ? await processImage(fileInput.files[0]) : null;

                if (!fullName) {
                    Swal.showValidationMessage("Tên nghệ sĩ là bắt buộc.");
                    return false;
                }

                return { fullName, type, image };
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
                    type: result.value.type,
                    image,
                });
                localStorage.setItem("artists", JSON.stringify(artists));
                currentPage = 1;
                loadArtists();
                Swal.fire("Thành Công!", "Nghệ sĩ đã được thêm thành công.", "success");
            }
        });
    });
} else {
    console.error("Không tìm thấy nút Thêm Nghệ Sĩ (.btn-primary)!");
}

// Xóa nghệ sĩ
function handleDelete(event) {
    const index = event.currentTarget.getAttribute("data-index");
    const artist = artists[index];

    Swal.fire({
        title: "<strong>Confirm Delete</strong>",
        html: `<p style="color: #333; font-size: 14px;">Are you sure you want to delete artist <strong>${artist.fullName}</strong>?</p>`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        customClass: { popup: "custom-modal", confirmButton: "btn btn-danger", cancelButton: "btn btn-gray me-2" }
    }).then((result) => {
        if (result.isConfirmed) {
            artists.splice(index, 1);
            localStorage.setItem("artists", JSON.stringify(artists));
            currentPage = 1;
            loadArtists();
            Swal.fire("Success!", "Artist deleted successfully.", "success");
        }
    });
}

// Sửa nghệ sĩ
function handleEdit(event) {
    const index = event.currentTarget.getAttribute("data-index");
    const artist = artists[index];

    Swal.fire({
        title: "<strong>Edit Artist</strong>",
        html: `
                <div class="container" style="text-align: left; font-family: Arial, sans-serif;">
                    <div class="row mb-2">
                        <div class="col-12">
                            <h6 style="color: #333; font-size: 14px; font-weight: bold;">Artist Information</h6>
                            <p style="color: #666; font-size: 12px;">Update artist information</p>
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
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
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
            loadArtists(currentFilter, currentPage, searchQuery);
            Swal.fire("Success!", "Artist updated successfully.", "success");
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
}

const searchInput = document.querySelector(".form-control[placeholder='Tìm kiếm']");
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim();
        currentPage = 1;
        loadArtists();
    });
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
}

// Xóa nhiều nghệ sĩ
const deleteSelectedBtn = document.querySelector(".delete-selected-btn");
if (deleteSelectedBtn) {
    deleteSelectedBtn.addEventListener("click", () => {
        const checkboxes = document.querySelectorAll("tbody .form-check-input:checked");
        if (checkboxes.length === 0) {
            Swal.fire("Warning", "Please select at least one artist.", "warning");
            return;
        }

        Swal.fire({
            title: "Confirm Delete",
            text: `Are you sure you want to delete ${checkboxes.length} selected artists?`,
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
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
                    Swal.fire("Lỗi", "Không có nghệ sĩ hợp lệ được chọn để xóa.", "error");
                    return;
                }

                artists = artists.filter((_, i) => !indices.includes(i));
                localStorage.setItem("artists", JSON.stringify(artists));
                currentPage = 1;
                loadArtists();
                Swal.fire("Success", "Selected artists deleted.", "success");
            }
        });
    });
}

// Checkbox chọn tất cả
const selectAllCheckbox = document.getElementById("selectAll");
if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", (e) => {
        const checkboxes = document.querySelectorAll("tbody .form-check-input");
        checkboxes.forEach((cb) => (cb.checked = e.target.checked));
    });
}

// Initial load
// Clear localStorage để force refresh dữ liệu (chỉ để test)
localStorage.removeItem("artists");
localStorage.removeItem("defaultImages");
console.log("Cleared localStorage for testing");

artists = normalizeArtists(); // Đảm bảo dữ liệu được chuẩn hóa trước
console.log("Normalized artists before loading:", artists);
loadArtists();
// }
