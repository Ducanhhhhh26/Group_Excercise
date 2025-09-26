let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let currentFilter = "all";
let currentPage = 1;
const itemsPerPage = 8;
let searchQuery = "";

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
} else {
    // Initialize default admin account if none exists
    if (!accounts.some((acc) => acc.role === "Admin")) {
        accounts.push({
            accountId: "TK000001",
            fullName: "Admin User",
            email: "admin@example.com",
            password: "Admin@123",
            dob: "01/01/1990",
            phone: "0123456789",
            role: "Admin",
        });
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }

    // Normalize accounts
    function normalizeAccounts() {
        const normalized = accounts.map((account) => ({
            accountId: account.accountId || `TK${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`,
            fullName: account.fullName || "",
            email: account.email || "",
            dob: account.dob || "",
            phone: account.phone || "",
            hometown: account.hometown || "",
            role: ["Users", "Artists", "Admin"].includes(account.role) ? account.role : "Users",
            password: account.password || "",
            avatar: account.img || "",
        }));
        localStorage.setItem("accounts", JSON.stringify(normalized));
        return normalized;
    }

    // Update filter counts
    function updateFilterCounts(accounts) {
        const counts = {
            all: accounts.length,
            Users: accounts.filter((acc) => acc.role === "Users").length,
            Artists: accounts.filter((acc) => acc.role === "Artists").length,
            Admin: accounts.filter((acc) => acc.role === "Admin").length,
        };
        const allPill = document.querySelector('[data-filter="all"] .filter-count');
        const usersPill = document.querySelector('[data-filter="Users"] .filter-count');
        const artistsPill = document.querySelector('[data-filter="Artists"] .filter-count');
        const adminPill = document.querySelector('[data-filter="Admin"] .filter-count');
        
        if (allPill) allPill.textContent = counts.all;
        if (usersPill) usersPill.textContent = counts.Users;
        if (artistsPill) usersPill.textContent = counts.Artists;
        if (adminPill) adminPill.textContent = counts.Admin;
    }

    // Load and render accounts
    function loadAccounts(filter = currentFilter, page = currentPage, query = searchQuery) {
        accounts = normalizeAccounts();
        let filteredAccounts = filter === "all" ? accounts : accounts.filter((acc) => acc.role === filter);

        if (query) {
            filteredAccounts = filteredAccounts.filter(
                (acc) =>
                    acc.fullName.toLowerCase().includes(query.toLowerCase()) ||
                    acc.email.toLowerCase().includes(query.toLowerCase()) ||
                    acc.accountId.toLowerCase().includes(query.toLowerCase())
            );
        }

        updateFilterCounts(accounts);
        const totalItems = filteredAccounts.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
        
        // Reset to page 1 if current page is greater than total pages
        if (page > totalPages) {
            page = 1;
            currentPage = 1;
        }
        
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedAccounts = filteredAccounts.slice(startIndex, startIndex + itemsPerPage);

        const tbody = document.querySelector("table tbody");
        if (!tbody) {
            return;
        }
        tbody.innerHTML = paginatedAccounts.length
            ? paginatedAccounts
                .map(
                    (account, index) => `
                    <tr>
                        <td><div class="form-check"><input class="form-check-input" type="checkbox" value=""></div></td>
                        <td>${account.accountId}</td>
                        <td>${account.fullName}</td>
                        <td>${account.email}</td>
                        <td>${account.dob}</td>
                        <td>${account.phone}</td>
                        <td>${account.hometown}</td>
                        <td><span class="tag">${account.role}</span></td>
                        <td>
                            <div class="d-flex">
                                <button class="btn btn-sm btn-link text-danger p-0 me-2 delete-btn" data-index="${accounts.indexOf(
                                    account
                                )}"><i class="bi bi-trash"></i></button>
                                <button class="btn btn-sm btn-link text-primary p-0 edit-btn" data-index="${accounts.indexOf(
                                    account
                                )}"><i class="bi bi-pencil"></i></button>
                            </div>
                        </td>
                    </tr>
                `
                )
                .join("")
            : '<tr><td colspan="9" class="text-center">No accounts found.</td></tr>';

        updatePagination(totalPages, page);
        attachButtonListeners();
    }

    // Update pagination
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
                loadAccounts(currentFilter, currentPage - 1, searchQuery);
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
                loadAccounts(currentFilter, 1, searchQuery);
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
                loadAccounts(currentFilter, i, searchQuery);
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
                loadAccounts(currentFilter, totalPages, searchQuery);
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
                loadAccounts(currentFilter, currentPage + 1, searchQuery);
            }
        });
        paginationContainer.appendChild(nextItem);
    }

    // Attach event listeners to buttons
    function attachButtonListeners() {
        document.querySelectorAll(".delete-btn").forEach((btn) => {
            btn.removeEventListener("click", handleDelete);
            btn.addEventListener("click", handleDelete);
        });
        document.querySelectorAll(".edit-btn").forEach((btn) => {
            btn.removeEventListener("click", handleEdit);
            btn.addEventListener("click", handleEdit);
        });
    }

    // Handle Add Account
    document.querySelector(".btn-primary").addEventListener("click", () => {
        Swal.fire({
            title: "<strong>Add Account</strong>",
            html: `
                <div class="container" style="text-align: left; font-family: Arial, sans-serif;">
                    <div class="row mb-2">
                        <div class="col-12">
                            <h6 style="color: #333; font-size: 14px; font-weight: bold;">General Information</h6>
                            <p style="color: #666; font-size: 12px;">Update account information</p>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 text-center">
                            <div class="d-flex justify-content-center align-items-center" style="height: 80px; width: 80px; border-radius: 50%; background-color: #e0e0e0; margin: 0 auto;">
                                <span style="color: #666; font-size: 12px; text-align: center;">Click to upload</span>
                            </div>
                            <p style="color: #666; font-size: 10px; margin-top: 5px;">SVG, PNG, JPG or GIF (max. 400x400px)</p>
                            <input type="file" id="profile-pic" accept="image/*" style="display: none;" />
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Full Name</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-person-fill" style="color: #666;"></i>
                                </span>
                                <input type="text" class="form-control" id="full-name" placeholder="Full Name" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Date of Birth</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-calendar" style="color: #666;"></i>
                                </span>
                                <input type="text" class="form-control" id="dob" placeholder="DD/MM/YYYY" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Phone</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-telephone-fill" style="color: #666;"></i>
                                </span>
                                <input type="text" class="form-control" id="phone" placeholder="Phone Number" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Email</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-envelope-fill" style="color: #666;"></i>
                                </span>
                                <input type="email" class="form-control" id="email" placeholder="Email Address" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Hometown</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-geo-alt-fill" style="color: #666;"></i>
                                </span>
                                <input type="text" class="form-control" id="hometown" placeholder="Hometown" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Role</label>
                            <select class="form-select" id="role" style="font-size: 12px; border-color: #ccc;">
                                <option value="Users">Users</option>
                                <option value="Artists">Artists</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Password</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-lock-fill" style="color: #666;"></i>
                                </span>
                                <input type="password" class="form-control" id="password" placeholder="Password" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                    </div>
                </div>
            `,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Add Account",
            cancelButtonText: "Cancel",
            customClass: { popup: "custom-modal", confirmButton: "btn btn-primary", cancelButton: "btn btn-gray me-2" },
            didOpen: () => {
                const uploadArea = document.querySelector(".d-flex.justify-content-center.align-items-center");
                const fileInput = document.getElementById("profile-pic");
                if (uploadArea && fileInput) {
                    uploadArea.addEventListener("click", () => fileInput.click());
                }
            },
            preConfirm: () => {
                const fullName = document.getElementById("full-name").value.trim();
                const email = document.getElementById("email").value.trim();
                const dob = document.getElementById("dob").value.trim();
                const phone = document.getElementById("phone").value.trim();
                const hometown = document.getElementById("hometown").value.trim();
                const role = document.getElementById("role").value;
                const password = document.getElementById("password").value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

                if (!fullName || !email || !password) {
                    Swal.showValidationMessage("Full Name, Email, and Password are required.");
                    return false;
                }
                if (!emailRegex.test(email)) {
                    Swal.showValidationMessage("Please enter a valid email address.");
                    return false;
                }
                if (!passwordRegex.test(password)) {
                    Swal.showValidationMessage(
                        "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
                    );
                    return false;
                }
                if (accounts.some((acc) => acc.email === email)) {
                    Swal.showValidationMessage("This email is already registered.");
                    return false;
                }

                return { fullName, email, dob, phone, hometown, role, password };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                accounts.push({
                    accountId: `TK${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`,
                    fullName: result.value.fullName,
                    email: result.value.email,
                    dob: result.value.dob,
                    phone: result.value.phone,
                    hometown: result.value.hometown,
                    role: result.value.role,
                    password: result.value.password,
                });
                localStorage.setItem("accounts", JSON.stringify(accounts));
                currentPage = 1;
                loadAccounts();
                Swal.fire("Success!", "Account added successfully.", "success");
            }
        });
    });

    // Handle Delete
    function handleDelete(event) {
        const index = event.currentTarget.getAttribute("data-index");
        const account = accounts[index];

        Swal.fire({
            title: "<strong>Confirm Delete</strong>",
            html: `<p style="color: #333; font-size: 14px;">Are you sure you want to delete account <strong>${account.fullName}</strong>?</p>`,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            customClass: { popup: "custom-modal", confirmButton: "btn btn-danger", cancelButton: "btn btn-gray me-2" },
        }).then((result) => {
            if (result.isConfirmed) {
                accounts.splice(index, 1);
                localStorage.setItem("accounts", JSON.stringify(accounts));
                currentPage = 1;
                loadAccounts();
                Swal.fire("Success!", "Account deleted successfully.", "success");
            }
        });
    }

    // Handle Edit
    function handleEdit(event) {
        const index = event.currentTarget.getAttribute("data-index");
        const account = accounts[index];

        Swal.fire({
            title: "<strong>Edit Account</strong>",
            html: `
                <div class="container" style="text-align: left; font-family: Arial, sans-serif;">
                    <div class="row mb-2">
                        <div class="col-12">
                            <h6 style="color: #333; font-size: 14px; font-weight: bold;">General Information</h6>
                            <p style="color: #666; font-size: 12px;">Update account information</p>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 text-center">
                            <div class="d-flex justify-content-center align-items-center" style="height: 80px; width: 80px; border-radius: 50%; background-color: #e0e0e0; margin: 0 auto;">
                                <span style="color: #666; font-size: 12px; text-align: center;">Click to upload</span>
                            </div>
                            <p style="color: #666; font-size: 10px; margin-top: 5px;">SVG, PNG, JPG or GIF (max. 400x400px)</p>
                            <input type="file" id="profile-pic" accept="image/*" style="display: none;" />
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Full Name</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-person-fill" style="color: #666;"></i>
                                </span>
                                <input type="text" class="form-control" id="full-name" value="${account.fullName}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Date of Birth</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-calendar" style="color: #666;"></i>
                                </span>
                                <input type="text" class="form-control" id="dob" value="${account.dob}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Phone</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-telephone-fill" style="color: #666;"></i>
                                </span>
                                <input type="text" class="form-control" id="phone" value="${account.phone}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Email</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-envelope-fill" style="color: #666;"></i>
                                </span>
                                <input type="email" class="form-control" id="email" value="${account.email}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Hometown</label>
                            <div class="input-group">
                                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                                    <i class="bi bi-geo-alt-fill" style="color: #666;"></i>
                                </span>
                                <input type="text" class="form-control" id="hometown" value="${account.hometown}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
                            </div>
                        </div>
                        <div class="col-6">
                            <label class="form-label" style="color: #333; font-size: 12px;">Role</label>
                            <select class="form-select" id="role" style="font-size: 12px; border-color: #ccc;">
                                <option value="Users" ${account.role === "Users" ? "selected" : ""}>Users</option>
                                <option value="Artists" ${account.role === "Artists" ? "selected" : ""}>Artists</option>
                                <option value="Admin" ${account.role === "Admin" ? "selected" : ""}>Admin</option>
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
                const fileInput = document.getElementById("profile-pic");
                if (uploadArea && fileInput) {
                    uploadArea.addEventListener("click", () => fileInput.click());
                }
            },
            preConfirm: () => {
                const fullName = document.getElementById("full-name").value.trim();
                const email = document.getElementById("email").value.trim();
                const dob = document.getElementById("dob").value.trim();
                const phone = document.getElementById("phone").value.trim();
                const hometown = document.getElementById("hometown").value.trim();
                const role = document.getElementById("role").value;

                if (!fullName || !email) {
                    Swal.showValidationMessage("Full Name and Email are required.");
                    return false;
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    Swal.showValidationMessage("Please enter a valid email address.");
                    return false;
                }
                if (accounts.some((acc, i) => acc.email === email && i !== parseInt(index))) {
                    Swal.showValidationMessage("This email is already registered.");
                    return false;
                }

                return { fullName, email, dob, phone, hometown, role };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                accounts[index] = {
                    accountId: account.accountId,
                    fullName: result.value.fullName,
                    email: result.value.email,
                    dob: result.value.dob,
                    phone: result.value.phone,
                    hometown: result.value.hometown,
                    role: result.value.role,
                    password: account.password,
                };
                localStorage.setItem("accounts", JSON.stringify(accounts));
                loadAccounts(currentFilter, currentPage, searchQuery);
                Swal.fire("Success!", "Account updated successfully.", "success");
            }
        });
    }

    // Add filter event listeners
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active class from all pills
            document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
            // Add active class to clicked pill
            pill.classList.add('active');
            // Update current filter and reset to page 1
            currentFilter = pill.dataset.filter;
            currentPage = 1;
            loadAccounts(currentFilter, 1, searchQuery);
        });
    });

    // Add search event listener
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            currentPage = 1; // Reset to page 1 when searching
            loadAccounts(currentFilter, 1, searchQuery);
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

    // Delete selected accounts
    document.querySelector(".delete-selected-btn").addEventListener("click", () => {
        const checkboxes = document.querySelectorAll("tbody .form-check-input:checked");
        if (checkboxes.length === 0) {
            Swal.fire("Warning", "Please select at least one account.", "warning");
            return;
        }

        Swal.fire({
            title: "Confirm Delete",
            text: `Are you sure you want to delete ${checkboxes.length} selected accounts?`,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
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
                    Swal.fire("Error", "No valid accounts selected for deletion.", "error");
                    return;
                }

                accounts = accounts.filter((_, i) => !indices.includes(i));
                localStorage.setItem("accounts", JSON.stringify(accounts));
                currentPage = 1;
                loadAccounts();
                Swal.fire("Success", "Selected accounts deleted.", "success");
            }
        });
    });

    // Select All checkbox
    const selectAllCheckbox = document.getElementById("selectAll");
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener("change", (e) => {
            const checkboxes = document.querySelectorAll("tbody .form-check-input");
            checkboxes.forEach((cb) => (cb.checked = e.target.checked));
        });
    }

    // Initial load
    loadAccounts();
}