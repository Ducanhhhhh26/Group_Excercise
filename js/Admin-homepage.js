let data = {
    "played": [],
    "top15": [],
    "artist": [],
    "releases": [],
    "albums": []
};

let currentFilter = "all";
let currentPage = 1;
const itemsPerPage = 8;
let searchQuery = "";

document.addEventListener("DOMContentLoaded", () => {
    // Load data from home.js
    try {
        // Get data from home.js
        if (typeof musicData !== 'undefined') {
            // Add IDs to releases if they don't exist
            const releasesWithIds = musicData.releases.map((item, index) => ({
                ...item,
                id: (index + 1).toString()
            }));

            data = {
                played: musicData.played || [],
                top15: musicData.top15 || [],
                artist: musicData.artist || [],
                releases: releasesWithIds,
                albums: musicData.albums || []
            };
            console.log("Loaded data from home.js:", data);
        } else {
            console.error("musicData is not defined. Make sure home.js is loaded before Admin-homepage.js");
        }
    } catch (e) {
        console.error("Error loading data from home.js:", e);
    }

    // Save data to localStorage
    function saveHomepage() {
        try {
            localStorage.setItem("homepage", JSON.stringify(data));
        } catch (e) {
            console.error("Error saving to localStorage:", e);
        }
    }

    // Flatten data for display
    function flattenItems() {
        const items = [];
        Object.keys(data).forEach(category => {
            data[category].forEach(item => {
                items.push({
                    ...item,
                    type: category
                });
            });
        });
        return items;
    }

    // Load and render items
    function loadItems(filter = currentFilter, page = currentPage, query = searchQuery) {
        console.log("Loading items with filter:", filter, "page:", page, "query:", query);
        let filteredItems = flattenItems();
        
        if (filter !== "all") {
            filteredItems = filteredItems.filter(item => item.type === filter);
        }

        if (query) {
            filteredItems = filteredItems.filter(
                (item) =>
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    item.artist.toLowerCase().includes(query.toLowerCase()) ||
                    item.id.toLowerCase().includes(query.toLowerCase())
            );
        }

        updateFilterCounts(filteredItems);
        const totalItems = filteredItems.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
        
        if (page > totalPages) {
            page = 1;
            currentPage = 1;
        }
        
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

        const tbody = document.querySelector("table tbody");
        if (!tbody) {
            console.error("Table body not found!");
            return;
        }

        tbody.innerHTML = paginatedItems.length
            ? paginatedItems
                .map(
                    (item) => `
                    <tr>
                        <td><div class="form-check"><input class="form-check-input" type="checkbox" value=""></div></td>
                        <td>${item.id}</td>
                        <td>${item.title}</td>
                        <td>${item.artist}</td>
                        <td><img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover;"></td>
                        <td><a href="${item.mp3}" target="_blank">Link</a></td>
                        <td><span class="tag">${item.type}</span></td>
                        <td>
                            <div class="d-flex">
                                <button class="btn btn-sm btn-link text-danger p-0 me-2 delete-btn" data-category="${item.type}" data-id="${item.id}"><i class="bi bi-trash"></i></button>
                                <button class="btn btn-sm btn-link text-primary p-0 edit-btn" data-category="${item.type}" data-id="${item.id}"><i class="bi bi-pencil"></i></button>
                            </div>
                        </td>
                    </tr>
                `
                )
                .join("")
            : '<tr><td colspan="8" class="text-center">No items found.</td></tr>';

        updatePagination(totalPages, page);
        attachButtonListeners();
    }

    // Update filter counts
    function updateFilterCounts(items) {
        const counts = {
            all: items.length,
            played: items.filter((item) => item.type === "played").length,
            top15: items.filter((item) => item.type === "top15").length,
            artist: items.filter((item) => item.type === "artist").length,
            releases: items.filter((item) => item.type === "releases").length,
            albums: items.filter((item) => item.type === "albums").length,
        };

        Object.keys(counts).forEach(filter => {
            const pill = document.querySelector(`[data-filter="${filter}"] .filter-count`);
            if (pill) pill.textContent = counts[filter];
        });
    }

    // Update pagination
    function updatePagination(totalPages, currentPage) {
        const paginationContainer = document.querySelector(".pagination");
        if (!paginationContainer) {
            console.error("Pagination container not found!");
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
                loadItems(currentFilter, currentPage - 1, searchQuery);
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
                loadItems(currentFilter, 1, searchQuery);
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
                loadItems(currentFilter, i, searchQuery);
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
                loadItems(currentFilter, totalPages, searchQuery);
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
                loadItems(currentFilter, currentPage + 1, searchQuery);
            }
        });
        paginationContainer.appendChild(nextItem);
    }

    // Attach event listeners to buttons
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

    // Handle add item
    const addButton = document.querySelector(".btn-primary");
    if (addButton) {
        addButton.addEventListener("click", () => {
            Swal.fire({
                title: "<strong>Add Item</strong>",
                html: `
                    <div class="container" style="text-align: left; font-family: Arial, sans-serif;">
                        <div class="row mb-2">
                            <div class="col-12">
                                <h6 style="color: #333; font-size: 14px; font-weight: bold;">Item Information</h6>
                                <p style="color: #666; font-size: 12px;">Add new item information</p>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 text-center">
                                <div class="d-flex justify-content-center align-items-center" style="height: 80px; width: 80px; border-radius: 50%; background-color: #e0e0e0; margin: 0 auto;">
                                    <span style="color: #666; font-size: 12px; text-align: center;">Click to upload</span>
                                </div>
                                <p style="color: #666; font-size: 10px; margin-top: 5px;">SVG, PNG, JPG or GIF (max. 400x400px)</p>
                                <input type="file" id="item-img" accept="image/*" style="display: none;" />
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-6">
                                <label class="form-label" style="color: #333; font-size: 12px;">Title</label>
                                <div class="input-group">
                                    <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                        <i class="bi bi-music-note-list" style="color: #666;"></i>
                                    </span>
                                    <input type="text" class="form-control" id="title" placeholder="Item Title" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                                </div>
                            </div>
                            <div class="col-6">
                                <label class="form-label" style="color: #333; font-size: 12px;">Artist</label>
                                <div class="input-group">
                                    <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                        <i class="bi bi-person-fill" style="color: #666;"></i>
                                    </span>
                                    <input type="text" class="form-control" id="artist" placeholder="Artist Name" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                                </div>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-6">
                                <label class="form-label" style="color: #333; font-size: 12px;">Image URL</label>
                                <div class="input-group">
                                    <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                        <i class="bi bi-image" style="color: #666;"></i>
                                    </span>
                                    <input type="text" class="form-control" id="image" placeholder="Image URL" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                                </div>
                            </div>
                            <div class="col-6">
                                <label class="form-label" style="color: #333; font-size: 12px;">MP3 URL</label>
                                <div class="input-group">
                                    <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                        <i class="bi bi-music-note" style="color: #666;"></i>
                                    </span>
                                    <input type="text" class="form-control" id="mp3" placeholder="MP3 URL" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                                </div>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-6">
                                <label class="form-label" style="color: #333; font-size: 12px;">Type</label>
                                <select class="form-select" id="type" style="font-size: 12px; border-color: #ccc;">
                                    <option value="played">Recently Played</option>
                                    <option value="top15">Top 15</option>
                                    <option value="artist">Featured Artists</option>
                                    <option value="releases">New Releases</option>
                                    <option value="albums">Featured Albums</option>
                                </select>
                            </div>
                        </div>
                    </div>
                `,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "Add Item",
                cancelButtonText: "Cancel",
                customClass: { popup: "custom-modal", confirmButton: "btn btn-primary", cancelButton: "btn btn-gray me-2" },
                didOpen: () => {
                    const uploadArea = document.querySelector(".d-flex.justify-content-center.align-items-center");
                    if (uploadArea) {
                        const fileInput = document.getElementById("item-img");
                        uploadArea.addEventListener("click", () => fileInput.click());
                    }
                },
                preConfirm: () => {
                    const title = document.getElementById("title").value.trim();
                    const artist = document.getElementById("artist").value.trim();
                    const image = document.getElementById("image").value.trim();
                    const mp3 = document.getElementById("mp3").value.trim();
                    const type = document.getElementById("type").value;

                    if (!title || !artist || !image || !mp3) {
                        Swal.showValidationMessage("All fields are required.");
                        return false;
                    }

                    return { title, artist, image, mp3, type };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const newItem = {
                        id: `${result.value.type.slice(0, 3).toUpperCase()}${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`,
                        title: result.value.title,
                        artist: result.value.artist,
                        image: result.value.image,
                        mp3: result.value.mp3
                    };

                    if (!data[result.value.type]) {
                        data[result.value.type] = [];
                    }
                    data[result.value.type].push(newItem);

                    saveHomepage();
                    currentPage = 1;
                    loadItems();
                    Swal.fire("Success!", "Item added successfully.", "success");
                }
            });
        });
    }

    // Handle delete item
    function handleDelete(event) {
        const category = event.currentTarget.getAttribute("data-category");
        const id = event.currentTarget.getAttribute("data-id");
        const item = data[category].find((item) => item.id === id);

        Swal.fire({
            title: "<strong>Confirm Delete</strong>",
            html: `<p style="color: #333; font-size: 14px;">Are you sure you want to delete item <strong>${item.title}</strong>?</p>`,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            customClass: { popup: "custom-modal", confirmButton: "btn btn-danger", cancelButton: "btn btn-gray me-2" }
        }).then((result) => {
            if (result.isConfirmed) {
                data[category] = data[category].filter((item) => item.id !== id);
                saveHomepage();
                currentPage = 1;
                loadItems();
                Swal.fire("Success!", "Item deleted successfully.", "success");
            }
        });
    }

    // Handle edit item
    function handleEdit(event) {
        const category = event.currentTarget.getAttribute("data-category");
        const id = event.currentTarget.getAttribute("data-id");
        const item = data[category].find((item) => item.id === id);

        Swal.fire({
            title: "<strong>Edit Item</strong>",
            html: `
                <div class="container" style="text-align: left; font-family: Arial, sans-serif;">
                    <div class="row mb-2">
                        <div class="col-12">
                            <h6 style="color: #333; font-size: 14px; font-weight: bold;">Item Information</h6>
                            <p style="color: #666; font-size: 12px;">Update item information</p>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 text-center">
                            <div class="d-flex justify-content-center align-items-center" style="height: 80px; width: 80px; border-radius: 50%; background-color: #e0e0e0; margin: 0 auto;">
                                <span style="color: #666; font-size: 12px; text-align: center;">Click to upload</span>
                            </div>
                            <p style="color: #666; font-size: 10px; margin-top: 5px;">SVG, PNG, JPG or GIF (max. 400x400px)</p>
                            <input type="file" id="item-img" accept="image/*" style="display: none;" />
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Title</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-music-note-list" style="color: #666;"></i>
                                </span>
                                <input type="text" class="form-control" id="title" value="${item.title}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Artist</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-person-fill" style="color: #666;"></i>
                                </span>
                                <input type="text" class="form-control" id="artist" value="${item.artist}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Image URL</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-image" style="color: #666;"></i>
                                </span>
                                <input type="text" class="form-control" id="image" value="${item.image}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">MP3 URL</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-music-note" style="color: #666;"></i>
                                </span>
                                <input type="text" class="form-control" id="mp3" value="${item.mp3}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Type</label>
                            <select class="form-select" id="type" style="font-size: 12px; border-color: #ccc;">
                                <option value="played" ${item.type === "played" ? "selected" : ""}>Recently Played</option>
                                <option value="top15" ${item.type === "top15" ? "selected" : ""}>Top 15</option>
                                <option value="artist" ${item.type === "artist" ? "selected" : ""}>Featured Artists</option>
                                <option value="releases" ${item.type === "releases" ? "selected" : ""}>New Releases</option>
                                <option value="albums" ${item.type === "albums" ? "selected" : ""}>Featured Albums</option>
                            </select>
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
                if (uploadArea) {
                    const fileInput = document.getElementById("item-img");
                    uploadArea.addEventListener("click", () => fileInput.click());
                }
            },
            preConfirm: () => {
                const title = document.getElementById("title").value.trim();
                const artist = document.getElementById("artist").value.trim();
                const image = document.getElementById("image").value.trim();
                const mp3 = document.getElementById("mp3").value.trim();
                const type = document.getElementById("type").value;

                if (!title || !artist || !image || !mp3) {
                    Swal.showValidationMessage("All fields are required.");
                    return false;
                }

                return { title, artist, image, mp3, type };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedItem = {
                    id: item.id,
                    title: result.value.title,
                    artist: result.value.artist,
                    image: result.value.image,
                    mp3: result.value.mp3
                };

                if (result.value.type === category) {
                    data[category] = data[category].map((i) =>
                        i.id === item.id ? updatedItem : i
                    );
                } else {
                    if (!data[result.value.type]) {
                        data[result.value.type] = [];
                    }
                    data[result.value.type].push(updatedItem);
                    data[category] = data[category].filter((i) => i.id !== item.id);
                }

                saveHomepage();
                loadItems(currentFilter, currentPage, searchQuery);
                Swal.fire("Success!", "Item updated successfully.", "success");
            }
        });
    }

    // Filter and search
    const filterPills = document.querySelectorAll(".filter-pill");
    if (filterPills.length) {
        filterPills.forEach((pill) => {
            pill.addEventListener("click", () => {
                filterPills.forEach((p) => p.classList.remove("active"));
                pill.classList.add("active");
                currentFilter = pill.getAttribute("data-filter");
                currentPage = 1;
                loadItems();
            });
        });
    }

    const searchInput = document.querySelector(".form-control[placeholder='Tìm kiếm']");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.trim();
            currentPage = 1;
            loadItems();
        });
    }

    // Logout
    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            Swal.fire("Success", "Logged out successfully.", "success").then(() => {
                window.location.href = "index.html";
            });
        });
    }

    // Delete selected items
    const deleteSelectedBtn = document.querySelector(".delete-selected-btn");
    if (deleteSelectedBtn) {
        deleteSelectedBtn.addEventListener("click", () => {
            const checkboxes = document.querySelectorAll("tbody .form-check-input:checked");
            if (checkboxes.length === 0) {
                Swal.fire("Warning", "Please select at least one item.", "warning");
                return;
            }

            Swal.fire({
                title: "Confirm Delete",
                text: `Are you sure you want to delete ${checkboxes.length} selected items?`,
                showCancelButton: true,
                confirmButtonText: "Delete",
                cancelButtonText: "Cancel",
                customClass: { popup: "custom-modal", confirmButton: "btn btn-danger", cancelButton: "btn btn-gray me-2" }
            }).then((result) => {
                if (result.isConfirmed) {
                    const deletions = Array.from(checkboxes)
                        .map((cb) => {
                            const deleteBtn = cb.closest("tr").querySelector(".delete-btn");
                            return deleteBtn
                                ? {
                                      category: deleteBtn.getAttribute("data-category"),
                                      id: deleteBtn.getAttribute("data-id")
                                  }
                                : null;
                        })
                        .filter((del) => del !== null);

                    deletions.forEach(({ category, id }) => {
                        data[category] = data[category].filter((item) => item.id !== id);
                    });

                    saveHomepage();
                    currentPage = 1;
                    loadItems();
                    Swal.fire("Success", "Selected items deleted.", "success");
                }
            });
        });
    }

    // Select all
    const selectAllCheckbox = document.getElementById("selectAll");
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener("change", (e) => {
            const checkboxes = document.querySelectorAll("tbody .form-check-input");
            checkboxes.forEach((cb) => (cb.checked = e.target.checked));
        });
    }

    // Initial load
    loadItems();
    saveHomepage();
});
