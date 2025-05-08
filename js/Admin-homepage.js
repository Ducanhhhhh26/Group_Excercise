let data = {
    "data": [
        {
            "Featured": [
                {
                    "id": "FEA001",
                    "title": "Featured Section 1",
                    "description": "Featured music section",
                    "img": "/assets/featured1.jpg",
                    "type": "Featured",
                    "position": 1
                }
            ]
        },
        {
            "Trending": [
                {
                    "id": "TRD001",
                    "title": "Trending Section 1",
                    "description": "Trending music section",
                    "img": "/assets/trending1.jpg",
                    "type": "Trending",
                    "position": 2
                }
            ]
        },
        {
            "New_Releases": [
                {
                    "id": "NEW001",
                    "title": "New Releases Section 1",
                    "description": "Latest music releases",
                    "img": "/assets/new1.jpg",
                    "type": "New_Releases",
                    "position": 3
                }
            ]
        },
        {
            "Top_Charts": [
                {
                    "id": "TOP001",
                    "title": "Top Charts Section 1",
                    "description": "Top charting music",
                    "img": "/assets/top1.jpg",
                    "type": "Top_Charts",
                    "position": 4
                }
            ]
        }
    ]
};

// Get data from localStorage or use default data
let musicData = JSON.parse(localStorage.getItem("musicData")) || {
  albums: [
    { title: "Endless Summer", artist: "Sarah Johnson", image: "../assets/images/img_2.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Midnight Dreams", artist: "Alex Turner", image: "../assets/images/img_3.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Neon Lights", artist: "Electro Beats", image: "../assets/images/img_4.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { title: "Mountain View", artist: "Nature Sounds", image: "../assets/images/img_5.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { title: "City Lights", artist: "Urban Rhythms", image: "../assets/images/img_6.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
    { title: "Ocean Waves", artist: "Coastal Sounds", image: "../assets/images/img_7.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" }
  ],
  charts: [
    { title: "Summer Vibes", artist: "Beach Boys", image: "../assets/images/img_10.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
    { title: "Moonlit Nights", artist: "Luna Echo", image: "../assets/images/img_11.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" },
    { title: "Electric Pulse", artist: "DJ Spark", image: "../assets/images/img_12.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" },
    { title: "Golden Hour", artist: "Sunny Days", image: "../assets/images/img_13.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" },
    { title: "Echoes of Love", artist: "Heartstrings", image: "../assets/images/img_14.png", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }
  ],
  releases: [
    { title: "Dark Alley Acoustic", artist: "Ava Cornish", image: "../assets/images/img_14.png", duration: "5:10", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
    { title: "Dreamy Nights", artist: "Luna Echo", image: "../assets/images/img_16.png", duration: "4:30", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
    { title: "Electric Vibes", artist: "DJ Spark", image: "../assets/images/img_11.png", duration: "3:45", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" },
    { title: "Golden Sunset", artist: "Sunny Days", image: "../assets/images/img_15.png", duration: "4:15", mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
    // Load data from localStorage or use default data
    let homepageData = (() => {
        try {
            const stored = localStorage.getItem("homepage");
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed && Array.isArray(parsed.data)) {
                    return parsed;
                }
            }
            return data;
        } catch (e) {
            console.error("Error parsing localStorage 'homepage':", e);
            return data;
        }
    })();

    // Save data to localStorage
    function saveHomepage() {
        try {
            localStorage.setItem("homepage", JSON.stringify(homepageData));
        } catch (e) {
            console.error("Error saving to localStorage:", e);
        }
    }

    // Flatten data for display
    function flattenSections() {
        if (!homepageData || !Array.isArray(homepageData.data)) {
            console.error("Invalid homepageData.data:", homepageData);
            return [];
        }
        return homepageData.data.flatMap((category) => {
            const type = Object.keys(category)[0];
            return category[type].map((section, index) => ({
                ...section,
                type,
                originalCategory: type,
                originalIndex: index
            }));
        });
    }

    let currentFilter = "all";
    let currentPage = 1;
    const itemsPerPage = 8;
    let searchQuery = "";

    // Load and render sections
    function loadSections(filter = currentFilter, page = currentPage, query = searchQuery) {
        console.log("Loading sections with filter:", filter, "page:", page, "query:", query);
        let filteredSections = filter === "all" ? flattenSections() : flattenSections().filter((s) => s.type === filter);

        if (query) {
            filteredSections = filteredSections.filter(
                (s) =>
                    s.title.toLowerCase().includes(query.toLowerCase()) ||
                    s.description.toLowerCase().includes(query.toLowerCase()) ||
                    s.id.toLowerCase().includes(query.toLowerCase())
            );
        }

        updateFilterCounts(flattenSections());
        const totalItems = filteredSections.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
        
        if (page > totalPages) {
            page = 1;
            currentPage = 1;
        }
        
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedSections = filteredSections.slice(startIndex, startIndex + itemsPerPage);

        const tbody = document.querySelector("table tbody");
        if (!tbody) {
            console.error("Table body not found!");
            return;
        }
        tbody.innerHTML = paginatedSections.length
            ? paginatedSections
                .map(
                    (section) => `
                    <tr>
                        <td><div class="form-check"><input class="form-check-input" type="checkbox" value=""></div></td>
                        <td>${section.id}</td>
                        <td>${section.title}</td>
                        <td>${section.description}</td>
                        <td><img src="${section.img}" alt="${section.title}" style="width: 50px; height: 50px;"></td>
                        <td><span class="tag">${section.type}</span></td>
                        <td>${section.position}</td>
                        <td>
                            <div class="d-flex">
                                <button class="btn btn-sm btn-link text-danger p-0 me-2 delete-btn" data-category="${section.originalCategory}" data-index="${section.originalIndex}"><i class="bi bi-trash"></i></button>
                                <button class="btn btn-sm btn-link text-primary p-0 edit-btn" data-category="${section.originalCategory}" data-index="${section.originalIndex}"><i class="bi bi-pencil"></i></button>
                            </div>
                        </td>
                    </tr>
                `
                )
                .join("")
            : '<tr><td colspan="8" class="text-center">No sections found.</td></tr>';

        updatePagination(totalPages, page);
        attachButtonListeners();
    }

    // Update filter counts
    function updateFilterCounts(sections) {
        const counts = {
            all: sections.length,
            Featured: sections.filter((section) => section.type === "Featured").length,
            Trending: sections.filter((section) => section.type === "Trending").length,
            New_Releases: sections.filter((section) => section.type === "New_Releases").length,
            Top_Charts: sections.filter((section) => section.type === "Top_Charts").length,
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
                loadSections(currentFilter, currentPage - 1, searchQuery);
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
                loadSections(currentFilter, 1, searchQuery);
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
                loadSections(currentFilter, i, searchQuery);
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
                loadSections(currentFilter, totalPages, searchQuery);
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
                loadSections(currentFilter, currentPage + 1, searchQuery);
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

    // Handle add section
    const addButton = document.querySelector(".btn-primary");
    if (addButton) {
        addButton.addEventListener("click", () => {
            Swal.fire({
                title: "<strong>Add Section</strong>",
                html: `
                    <div class="container" style="text-align: left; font-family: Arial, sans-serif;">
                        <div class="row mb-2">
                            <div class="col-12">
                                <h6 style="color: #333; font-size: 14px; font-weight: bold;">Section Information</h6>
                                <p style="color: #666; font-size: 12px;">Add new section information</p>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 text-center">
                                <div class="d-flex justify-content-center align-items-center" style="height: 80px; width: 80px; border-radius: 50%; background-color: #e0e0e0; margin: 0 auto;">
                                    <span style="color: #666; font-size: 12px; text-align: center;">Click to upload</span>
                                </div>
                                <p style="color: #666; font-size: 10px; margin-top: 5px;">SVG, PNG, JPG or GIF (max. 400x400px)</p>
                                <input type="file" id="section-img" accept="image/*" style="display: none;" />
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-6">
                                <label class="form-label" style="color: #333; font-size: 12px;">Title</label>
                                <div class="input-group">
                                    <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                        <i class="bi bi-type-h1" style="color: #666;"></i>
                                    </span>
                                    <input type="text" class="form-control" id="title" placeholder="Section Title" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                                </div>
                            </div>
                            <div class="col-6">
                                <label class="form-label" style="color: #333; font-size: 12px;">Description</label>
                                <div class="input-group">
                                    <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                        <i class="bi bi-text-paragraph" style="color: #666;"></i>
                                    </span>
                                    <input type="text" class="form-control" id="description" placeholder="Section Description" style="font-size: 12px; border-left: none; border-color: #ccc;" />
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
                                    <input type="text" class="form-control" id="img" placeholder="Image URL" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                                </div>
                            </div>
                            <div class="col-6">
                                <label class="form-label" style="color: #333; font-size: 12px;">Position</label>
                                <div class="input-group">
                                    <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                        <i class="bi bi-123" style="color: #666;"></i>
                                    </span>
                                    <input type="number" class="form-control" id="position" placeholder="Section Position" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                                </div>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-6">
                                <label class="form-label" style="color: #333; font-size: 12px;">Type</label>
                                <select class="form-select" id="type" style="font-size: 12px; border-color: #ccc;">
                                    <option value="Featured">Featured</option>
                                    <option value="Trending">Trending</option>
                                    <option value="New_Releases">New Releases</option>
                                    <option value="Top_Charts">Top Charts</option>
                                </select>
                            </div>
                        </div>
                    </div>
                `,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "Add Section",
                cancelButtonText: "Cancel",
                customClass: { popup: "custom-modal", confirmButton: "btn btn-primary", cancelButton: "btn btn-gray me-2" },
                didOpen: () => {
                    const uploadArea = document.querySelector(".d-flex.justify-content-center.align-items-center");
                    if (uploadArea) {
                        const fileInput = document.getElementById("section-img");
                        uploadArea.addEventListener("click", () => fileInput.click());
                    }
                },
                preConfirm: () => {
                    const title = document.getElementById("title").value.trim();
                    const description = document.getElementById("description").value.trim();
                    const img = document.getElementById("img").value.trim();
                    const position = document.getElementById("position").value.trim();
                    const type = document.getElementById("type").value;

                    if (!title || !description || !img || !position) {
                        Swal.showValidationMessage("All fields are required.");
                        return false;
                    }

                    return { title, description, img, position, type };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const newSection = {
                        id: `${result.value.type.slice(0, 3).toUpperCase()}${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`,
                        title: result.value.title,
                        description: result.value.description,
                        img: result.value.img,
                        position: parseInt(result.value.position),
                        type: result.value.type
                    };

                    const category = homepageData.data.find((cat) => cat[result.value.type]);
                    if (category) {
                        category[result.value.type].push(newSection);
                    } else {
                        homepageData.data.push({ [result.value.type]: [newSection] });
                    }

                    saveHomepage();
                    currentPage = 1;
                    loadSections();
                    Swal.fire("Success!", "Section added successfully.", "success");
                }
            });
        });
    }

    // Handle delete section
    function handleDelete(event) {
        const category = event.currentTarget.getAttribute("data-category");
        const index = parseInt(event.currentTarget.getAttribute("data-index"));
        const section = homepageData.data.find((cat) => cat[category])[category][index];

        Swal.fire({
            title: "<strong>Confirm Delete</strong>",
            html: `<p style="color: #333; font-size: 14px;">Are you sure you want to delete section <strong>${section.title}</strong>?</p>`,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            customClass: { popup: "custom-modal", confirmButton: "btn btn-danger", cancelButton: "btn btn-gray me-2" }
        }).then((result) => {
            if (result.isConfirmed) {
                homepageData.data.find((cat) => cat[category])[category].splice(index, 1);
                saveHomepage();
                currentPage = 1;
                loadSections();
                Swal.fire("Success!", "Section deleted successfully.", "success");
            }
        });
    }

    // Handle edit section
    function handleEdit(event) {
        const category = event.currentTarget.getAttribute("data-category");
        const index = parseInt(event.currentTarget.getAttribute("data-index"));
        const section = homepageData.data.find((cat) => cat[category])[category][index];

        Swal.fire({
            title: "<strong>Edit Section</strong>",
            html: `
                <div class="container" style="text-align: left; font-family: Arial, sans-serif;">
                    <div class="row mb-2">
                        <div class="col-12">
                            <h6 style="color: #333; font-size: 14px; font-weight: bold;">Section Information</h6>
                            <p style="color: #666; font-size: 12px;">Update section information</p>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 text-center">
                            <div class="d-flex justify-content-center align-items-center" style="height: 80px; width: 80px; border-radius: 50%; background-color: #e0e0e0; margin: 0 auto;">
                                <span style="color: #666; font-size: 12px; text-align: center;">Click to upload</span>
                            </div>
                            <p style="color: #666; font-size: 10px; margin-top: 5px;">SVG, PNG, JPG or GIF (max. 400x400px)</p>
                            <input type="file" id="section-img" accept="image/*" style="display: none;" />
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Title</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-type-h1" style="color: #666;"></i>
                                </span>
                                <input type="text" class="form-control" id="title" value="${section.title}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Description</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-text-paragraph" style="color: #666;"></i>
                                </span>
                                <input type="text" class="form-control" id="description" value="${section.description}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
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
                                <input type="text" class="form-control" id="img" value="${section.img}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Position</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-123" style="color: #666;"></i>
                                </span>
                                <input type="number" class="form-control" id="position" value="${section.position}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Type</label>
                            <select class="form-select" id="type" style="font-size: 12px; border-color: #ccc;">
                                <option value="Featured" ${section.type === "Featured" ? "selected" : ""}>Featured</option>
                                <option value="Trending" ${section.type === "Trending" ? "selected" : ""}>Trending</option>
                                <option value="New_Releases" ${section.type === "New_Releases" ? "selected" : ""}>New Releases</option>
                                <option value="Top_Charts" ${section.type === "Top_Charts" ? "selected" : ""}>Top Charts</option>
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
                    const fileInput = document.getElementById("section-img");
                    uploadArea.addEventListener("click", () => fileInput.click());
                }
            },
            preConfirm: () => {
                const title = document.getElementById("title").value.trim();
                const description = document.getElementById("description").value.trim();
                const img = document.getElementById("img").value.trim();
                const position = document.getElementById("position").value.trim();
                const type = document.getElementById("type").value;

                if (!title || !description || !img || !position) {
                    Swal.showValidationMessage("All fields are required.");
                    return false;
                }

                return { title, description, img, position, type };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedSection = {
                    id: section.id,
                    title: result.value.title,
                    description: result.value.description,
                    img: result.value.img,
                    position: parseInt(result.value.position),
                    type: result.value.type
                };

                if (result.value.type === category) {
                    homepageData.data.find((cat) => cat[category])[category][index] = updatedSection;
                } else {
                    const oldCategory = homepageData.data.find((cat) => cat[category]);
                    oldCategory[category].splice(index, 1);
                    
                    const newCategory = homepageData.data.find((cat) => cat[result.value.type]) || {
                        [result.value.type]: []
                    };
                    if (!homepageData.data.includes(newCategory)) {
                        homepageData.data.push(newCategory);
                    }
                    newCategory[result.value.type].push(updatedSection);
                }

                saveHomepage();
                loadSections(currentFilter, currentPage, searchQuery);
                Swal.fire("Success!", "Section updated successfully.", "success");
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
                loadSections();
            });
        });
    }

    const searchInput = document.querySelector(".form-control[placeholder='Tìm kiếm']");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.trim();
            currentPage = 1;
            loadSections();
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

    // Delete selected sections
    const deleteSelectedBtn = document.querySelector(".delete-selected-btn");
    if (deleteSelectedBtn) {
        deleteSelectedBtn.addEventListener("click", () => {
            const checkboxes = document.querySelectorAll("tbody .form-check-input:checked");
            if (checkboxes.length === 0) {
                Swal.fire("Warning", "Please select at least one section.", "warning");
                return;
            }

            Swal.fire({
                title: "Confirm Delete",
                text: `Are you sure you want to delete ${checkboxes.length} selected sections?`,
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
                                      index: parseInt(deleteBtn.getAttribute("data-index"))
                                  }
                                : null;
                        })
                        .filter((del) => del !== null);

                    deletions.sort((a, b) => b.index - a.index);
                    deletions.forEach(({ category, index }) => {
                        homepageData.data.find((cat) => cat[category])[category].splice(index, 1);
                    });

                    saveHomepage();
                    currentPage = 1;
                    loadSections();
                    Swal.fire("Success", "Selected sections deleted.", "success");
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
    loadSections();
    saveHomepage();

    // Function to render sections
    function renderSections() {
        // Render Recently Played section
        const recentlyPlayedGrid = document.querySelector('.recently-played .album-grid');
        if (recentlyPlayedGrid) {
            recentlyPlayedGrid.innerHTML = musicData.albums.slice(0, 6).map(item => `
                <div class="album-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="album-info">
                        <div class="album-title">${item.title}</div>
                        <div class="album-artist">${item.artist}</div>
                    </div>
                </div>
            `).join('');
        }

        // Render Featured Artists section
        const featuredArtistsGrid = document.querySelector('.featured-artists .album-grid');
        if (featuredArtistsGrid) {
            featuredArtistsGrid.innerHTML = musicData.albums.slice(6, 12).map(item => `
                <div class="album-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="album-info">
                        <div class="album-title">${item.title}</div>
                        <div class="album-artist">${item.artist}</div>
                    </div>
                </div>
            `).join('');
        }

        // Render Featured Albums section
        const featuredAlbumsGrid = document.querySelector('.featured-albums .album-grid');
        if (featuredAlbumsGrid) {
            featuredAlbumsGrid.innerHTML = musicData.albums.slice(0, 7).map(item => `
                <div class="album-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="album-info">
                        <div class="album-title">${item.title}</div>
                        <div class="album-artist">${item.artist}</div>
                    </div>
                </div>
            `).join('');
        }

        // Render Charts section
        const chartsGrid = document.querySelector('.charts-grid');
        if (chartsGrid) {
            chartsGrid.innerHTML = `
                <div class="chart-column">
                    ${musicData.charts.slice(0, 5).map((item, index) => `
                        <div class="chart-item">
                            <div class="chart-number">${(index + 1).toString().padStart(2, "0")}</div>
                            <div class="chart-thumbnail">
                                <img src="${item.image}" alt="${item.title}">
                            </div>
                            <div class="chart-info">
                                <div class="chart-title">${item.title}</div>
                                <div class="chart-artist">${item.artist}</div>
                            </div>
                            <div class="chart-buttons">
                                <button><i class="fas fa-play"></i></button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="chart-column">
                    ${musicData.charts.slice(5, 10).map((item, index) => `
                        <div class="chart-item">
                            <div class="chart-number">${(index + 6).toString().padStart(2, "0")}</div>
                            <div class="chart-thumbnail">
                                <img src="${item.image}" alt="${item.title}">
                            </div>
                            <div class="chart-info">
                                <div class="chart-title">${item.title}</div>
                                <div class="chart-artist">${item.artist}</div>
                            </div>
                            <div class="chart-buttons">
                                <button><i class="fas fa-play"></i></button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="chart-column">
                    ${musicData.charts.slice(10, 15).map((item, index) => `
                        <div class="chart-item">
                            <div class="chart-number">${(index + 11).toString().padStart(2, "0")}</div>
                            <div class="chart-thumbnail">
                                <img src="${item.image}" alt="${item.title}">
                            </div>
                            <div class="chart-info">
                                <div class="chart-title">${item.title}</div>
                                <div class="chart-artist">${item.artist}</div>
                            </div>
                            <div class="chart-buttons">
                                <button><i class="fas fa-play"></i></button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Render New Releases section
        const newReleasesGrid = document.querySelector('.new-releases .album-grid');
        if (newReleasesGrid) {
            newReleasesGrid.innerHTML = musicData.releases.map(item => `
                <div class="album-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="album-info">
                        <div class="album-title">${item.title}</div>
                        <div class="album-artist">${item.artist}</div>
                        <div class="album-duration">${item.duration}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Function to handle search
    function handleSearch(query) {
        const filteredData = {
            albums: musicData.albums.filter(item => 
                item.title.toLowerCase().includes(query.toLowerCase()) || 
                item.artist.toLowerCase().includes(query.toLowerCase())
            ),
            charts: musicData.charts.filter(item => 
                item.title.toLowerCase().includes(query.toLowerCase()) || 
                item.artist.toLowerCase().includes(query.toLowerCase())
            ),
            releases: musicData.releases.filter(item => 
                item.title.toLowerCase().includes(query.toLowerCase()) || 
                item.artist.toLowerCase().includes(query.toLowerCase())
            )
        };

        // Update the displayed data with filtered results
        const tempData = { ...musicData };
        musicData = filteredData;
        renderSections();
        musicData = tempData;
    }

    // Initialize the page
    document.addEventListener('DOMContentLoaded', () => {
        renderSections();

        // Add search functionality
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query === '') {
                    renderSections();
                } else {
                    handleSearch(query);
                }
            });
        }

        // Add carousel functionality
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            const prevBtn = carousel.querySelector('.carousel-controls button:first-child');
            const nextBtn = carousel.querySelector('.carousel-controls button:last-child');
            const grid = carousel.querySelector('.album-grid');
            let currentIndex = 0;

            if (prevBtn && nextBtn && grid) {
                prevBtn.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                        grid.style.transform = `translateX(-${currentIndex * 100}%)`;
                    }
                });

                nextBtn.addEventListener('click', () => {
                    const maxIndex = Math.ceil(grid.children.length / 6) - 1;
                    if (currentIndex < maxIndex) {
                        currentIndex++;
                        grid.style.transform = `translateX(-${currentIndex * 100}%)`;
                    }
                });
            }
        });
    });
});
