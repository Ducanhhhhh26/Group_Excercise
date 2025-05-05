document.addEventListener('DOMContentLoaded', function () {
  let currentFilter = 'all'; // Biến lưu trạng thái lọc hiện tại
  let currentPage = 1; // Trang hiện tại
  const itemsPerPage = 10; // Số tài khoản mỗi trang
  let searchQuery = ''; // Từ khóa tìm kiếm

  // Function to clean and normalize accounts data in localStorage
  function normalizeAccounts() {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const normalizedAccounts = accounts.map(account => ({
      accountId: account.accountId || `TK${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      fullName: account.fullName || '',
      dob: account.dob || '',
      phone: account.phone || '',
      email: account.email || '',
      hometown: account.hometown || '',
      role: account.role === 'Users' || account.role === 'Artists' ? account.role : 'Users' // Đảm bảo role hợp lệ
    }));
    localStorage.setItem('accounts', JSON.stringify(normalizedAccounts));
    return normalizedAccounts;
  }

  // Function to update filter counts
  function updateFilterCounts(accounts) {
    const counts = {
      all: accounts.length,
      Users: accounts.filter(account => account.role === 'Users').length,
      Artists: accounts.filter(account => account.role === 'Artists').length
    };

    document.querySelector('[data-filter="all"] .filter-count').textContent = counts.all;
    document.querySelector('[data-filter="Users"] .filter-count').textContent = counts.Users;
    document.querySelector('[data-filter="Artists"] .filter-count').textContent = counts.Artists;
  }

  // Function to load accounts from localStorage and display them in the table
  function loadAccounts(filter = currentFilter, page = currentPage, query = searchQuery) {
    const accounts = normalizeAccounts(); // Làm sạch dữ liệu trước khi sử dụng
    
    // Lọc theo role
    let filteredAccounts = filter === 'all' 
      ? accounts 
      : accounts.filter(account => account.role === filter);

    // Tìm kiếm theo tên hoặc email
    if (query) {
      filteredAccounts = filteredAccounts.filter(account => 
        account.fullName.toLowerCase().includes(query.toLowerCase()) ||
        account.email.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Cập nhật số lượng trong filter pills
    updateFilterCounts(accounts);

    // Tính toán phân trang
    const totalItems = filteredAccounts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1; // Đảm bảo ít nhất 1 trang
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedAccounts = filteredAccounts.slice(startIndex, endIndex);

    // Hiển thị danh sách tài khoản
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = ''; // Clear existing rows

    if (paginatedAccounts.length === 0) {
      tbody.innerHTML = '<tr><td colspan="9" class="text-center">Không tìm thấy tài khoản nào.</td></tr>';
    } else {
      paginatedAccounts.forEach((account, index) => {
        const globalIndex = accounts.indexOf(account); // Lấy chỉ số toàn cục để xóa/sửa
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="">
            </div>
          </td>
          <td>${account.accountId}</td>
          <td>${account.fullName}</td>
          <td>${account.email}</td>
          <td>${account.dob}</td>
          <td>${account.phone}</td>
          <td>${account.hometown}</td>
          <td><span class="tag">${account.role}</span></td>
          <td>
            <div class="d-flex">
              <button class="btn btn-sm btn-link text-danger p-0 me-2 delete-btn" data-index="${globalIndex}">
                <i class="bi bi-trash"></i>
              </button>
              <button class="btn btn-sm btn-link text-primary p-0 edit-btn" data-index="${globalIndex}">
                <i class="bi bi-pencil"></i>
              </button>
            </div>
          </td>
        `;
        tbody.appendChild(row);
      });
    }

    // Cập nhật phân trang
    updatePagination(totalPages, page);

    // Add event listeners to delete and edit buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.removeEventListener('click', handleDelete); // Xóa sự kiện cũ để tránh trùng lặp
      btn.addEventListener('click', handleDelete);
    });
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.removeEventListener('click', handleEdit); // Xóa sự kiện cũ để tránh trùng lặp
      btn.addEventListener('click', handleEdit);
    });
  }

  // Function to update pagination
  function updatePagination(totalPages, currentPage) {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) {
      console.error('Pagination container not found!');
      return;
    }
    paginationContainer.innerHTML = '';

    // Nút Previous
    const prevItem = document.createElement('li');
    prevItem.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevItem.innerHTML = `<a class="page-link" href="#">Previous</a>`;
    prevItem.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        loadAccounts();
      }
    });
    paginationContainer.appendChild(prevItem);

    // Các nút số trang
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
      pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      pageItem.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage = i;
        loadAccounts();
      });
      paginationContainer.appendChild(pageItem);
    }

    // Nút Next
    const nextItem = document.createElement('li');
    nextItem.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextItem.innerHTML = `<a class="page-link" href="#">Next</a>`;
    nextItem.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        loadAccounts();
      }
    });
    paginationContainer.appendChild(nextItem);
  }

  // Add event listeners to filter pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', function () {
      // Remove active class from all pills
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      // Add active class to the clicked pill
      this.classList.add('active');
      // Update current filter and reset page
      currentFilter = this.getAttribute('data-filter');
      currentPage = 1; // Reset về trang 1 khi thay đổi bộ lọc
      loadAccounts();
    });
  });

  // Add event listener to search input
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      searchQuery = this.value.trim();
      currentPage = 1; // Reset về trang 1 khi tìm kiếm
      loadAccounts();
    });
  } else {
    console.error('Search input not found!');
  }

  // Handle Add Account
  document.querySelector('.btn-primary').addEventListener('click', function () {
    if (!window.Swal) {
      console.error('SweetAlert2 is not loaded!');
      return;
    }
    Swal.fire({
      title: '<strong>Thêm tài khoản</strong>',
      html: `
        <div class="container" style="text-align: left; font-family: Arial, sans-serif;">
          <div class="row mb-2">
            <div class="col-12">
              <h6 style="color: #333; font-size: 14px; font-weight: bold;">Thông tin chung</h6>
              <p style="color: #666; font-size: 12px;">Cập nhật thông tin về tài khoản</p>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 text-center">
              <div class="d-flex justify-content-center align-items-center" style="height: 80px; width: 80px; border-radius: 50%; background-color: #e0e0e0; margin: 0 auto;">
                <span style="color: #666; font-size: 12px; text-align: center;">Click to upload or drag and drop</span>
              </div>
              <p style="color: #666; font-size: 10px; margin-top: 5px;">SVG, PNG, JPG or GIF (max. 400x400px)</p>
              <input type="file" id="profile-pic" accept="image/*" style="display: none;" />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <label class="form-label" style="color: #333; font-size: 12px;">Họ và tên</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                  <i class="bi bi-person-fill" style="color: #666;"></i>
                </span>
                <input type="text" class="form-control" id="full-name" placeholder="Nguyễn Văn Nam" style="font-size: 12px; border-left: none; border-color: #ccc;" />
              </div>
            </div>
            <div class="col-6">
              <label class="form-label" style="color: #333; font-size: 12px;">Ngày sinh</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                  <i class="bi bi-calendar" style="color: #666;"></i>
                </span>
                <input type="text" class="form-control" id="dob" placeholder="30/08/2001" style="font-size: 12px; border-left: none; border-color: #ccc;" />
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <label class="form-label" style="color: #333; font-size: 12px;">Số điện thoại</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                  <i class="bi bi-telephone-fill" style="color: #666;"></i>
                </span>
                <input type="text" class="form-control" id="phone" placeholder="0988662345" style="font-size: 12px; border-left: none; border-color: #ccc;" />
              </div>
            </div>
            <div class="col-6">
              <label class="form-label" style="color: #333; font-size: 12px;">Email</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                  <i class="bi bi-envelope-fill" style="color: #666;"></i>
                </span>
                <input type="email" class="form-control" id="email" placeholder="namtran94@phenikaa.com" style="font-size: 12px; border-left: none; border-color: #ccc;" />
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <label class="form-label" style="color: #333; font-size: 12px;">Quê quán</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                  <i class="bi bi-geo-alt-fill" style="color: #666;"></i>
                </span>
                <input type="text" class="form-control" id="hometown" placeholder="Hà Nam" style="font-size: 12px; border-left: none; border-color: #ccc;" />
              </div>
            </div>
            <div class="col-6">
              <label class="form-label" style="color: #333; font-size: 12px;">Loại tài khoản</label>
              <select class="form-select" id="role" style="font-size: 12px; border-color: #ccc;">
                <option value="Users">Users</option>
                <option value="Artists">Artists</option>
              </select>
            </div>
          </div>
        </div>
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Thêm tài khoản',
      cancelButtonText: 'Hủy',
      confirmButtonAriaLabel: 'Add account',
      cancelButtonAriaLabel: 'Cancel',
      customClass: {
        popup: 'custom-modal',
        confirmButton: 'btn btn-orange',
        cancelButton: 'btn btn-gray me-2'
      },
      didOpen: () => {
        const uploadArea = document.querySelector('.d-flex.justify-content-center.align-items-center');
        const fileInput = document.getElementById('profile-pic');
        uploadArea.addEventListener('click', () => fileInput.click());
      },
      preConfirm: () => {
        const fullName = document.getElementById('full-name').value;
        const dob = document.getElementById('dob').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const hometown = document.getElementById('hometown').value;
        const role = document.getElementById('role').value;

        if (!fullName || !email) {
          Swal.showValidationMessage('Vui lòng điền đầy đủ thông tin bắt buộc');
          return false;
        }

        return {
          fullName,
          dob,
          phone,
          email,
          hometown,
          role
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        const accountId = `TK${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
        accounts.push({
          accountId,
          fullName: result.value.fullName,
          dob: result.value.dob,
          phone: result.value.phone,
          email: result.value.email,
          hometown: result.value.hometown,
          role: result.value.role
        });
        localStorage.setItem('accounts', JSON.stringify(accounts));
        currentPage = 1; // Reset về trang 1 khi thêm tài khoản mới
        loadAccounts();
        Swal.fire('Thành công!', 'Tài khoản đã được thêm.', 'success');
      }
    });
  });

  // Handle Delete Account
  function handleDelete(event) {
    const index = event.currentTarget.getAttribute('data-index');
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const account = accounts[index];

    if (!account) {
      console.error('Account not found at index:', index);
      return;
    }

    Swal.fire({
      title: '<strong>Xác nhận xóa</strong>',
      html: `<p style="color: #333; font-size: 14px;">Bạn có chắc chắn muốn xóa tài khoản <strong>${account.fullName}</strong> không?</p>`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      confirmButtonAriaLabel: 'Delete account',
      cancelButtonAriaLabel: 'Cancel',
      customClass: {
        popup: 'custom-modal',
        confirmButton: 'btn btn-orange',
        cancelButton: 'btn btn-gray me-2'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        accounts.splice(index, 1); // Remove the account
        localStorage.setItem('accounts', JSON.stringify(accounts));
        currentPage = 1; // Reset về trang 1 khi xóa tài khoản
        loadAccounts();
        Swal.fire('Thành công!', 'Tài khoản đã được xóa.', 'success');
      }
    });
  }

  // Handle Edit Account
  function handleEdit(event) {
    const index = event.currentTarget.getAttribute('data-index');
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const account = accounts[index];

    if (!account) {
      console.error('Account not found at index:', index);
      return;
    }

    Swal.fire({
      title: '<strong>Sửa tài khoản</strong>',
      html: `
        <div class="container" style="text-align: left; font-family: Arial, sans-serif;">
          <div class="row mb-2">
            <div class="col-12">
              <h6 style="color: #333; font-size: 14px; font-weight: bold;">Thông tin chung</h6>
              <p style="color: #666; font-size: 12px;">Cập nhật thông tin về tài khoản</p>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 text-center">
              <div class="d-flex justify-content-center align-items-center" style="height: 80px; width: 80px; border-radius: 50%; background-color: #e0e0e0; margin: 0 auto;">
                <span style="color: #666; font-size: 12px; text-align: center;">Click to upload or drag and drop</span>
              </div>
              <p style="color: #666; font-size: 10px; margin-top: 5px;">SVG, PNG, JPG or GIF (max. 400x400px)</p>
              <input type="file" id="profile-pic" accept="image/*" style="display: none;" />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <label class="form-label" style="color: #333; font-size: 12px;">Họ và tên</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                  <i class="bi bi-person-fill" style="color: #666;"></i>
                </span>
                <input type="text" class="form-control" id="full-name" value="${account.fullName || ''}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
              </div>
            </div>
            <div class="col-6">
              <label class="form-label" style="color: #333; font-size: 12px;">Ngày sinh</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                  <i class="bi bi-calendar" style="color: #666;"></i>
                </span>
                <input type="text" class="form-control" id="dob" value="${account.dob || ''}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <label class="form-label" style="color: #333; font-size: 12px;">Số điện thoại</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                  <i class="bi bi-telephone-fill" style="color: #666;"></i>
                </span>
                <input type="text" class="form-control" id="phone" value="${account.phone || ''}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
              </div>
            </div>
            <div class="col-6">
              <label class="form-label" style="color: #333; font-size: 12px;">Email</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                  <i class="bi bi-envelope-fill" style="color: #666;"></i>
                </span>
                <input type="email" class="form-control" id="email" value="${account.email || ''}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <label class="form-label" style="color: #333; font-size: 12px;">Quê quán</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: #fff; border-right: none; border-color: #ccc;">
                  <i class="bi bi-geo-alt-fill" style="color: #666;"></i>
                </span>
                <input type="text" class="form-control" id="hometown" value="${account.hometown || ''}" style="font-size: 12px; border-left: none; border-color: #ccc;" />
              </div>
            </div>
            <div class="col-6">
              <label class="form-label" style="color: #333; font-size: 12px;">Loại tài khoản</label>
              <select class="form-select" id="role" style="font-size: 12px; border-color: #ccc;">
                <option value="Users" ${account.role === 'Users' ? 'selected' : ''}>Users</option>
                <option value="Artists" ${account.role === 'Artists' ? 'selected' : ''}>Artists</option>
              </select>
            </div>
          </div>
        </div>
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Lưu',
      cancelButtonText: 'Hủy',
      confirmButtonAriaLabel: 'Save account',
      cancelButtonAriaLabel: 'Cancel',
      customClass: {
        popup: 'custom-modal',
        confirmButton: 'btn btn-orange',
        cancelButton: 'btn btn-gray me-2'
      },
      didOpen: () => {
        const uploadArea = document.querySelector('.d-flex.justify-content-center.align-items-center');
        const fileInput = document.getElementById('profile-pic');
        uploadArea.addEventListener('click', () => fileInput.click());
      },
      preConfirm: () => {
        const fullName = document.getElementById('full-name').value;
        const dob = document.getElementById('dob').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const hometown = document.getElementById('hometown').value;
        const role = document.getElementById('role').value;

        if (!fullName || !email) {
          Swal.showValidationMessage('Vui lòng điền đầy đủ thông tin bắt buộc');
          return false;
        }

        return {
          fullName,
          dob,
          phone,
          email,
          hometown,
          role
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        accounts[index] = {
          accountId: account.accountId, // Preserve the original account ID
          fullName: result.value.fullName,
          dob: result.value.dob,
          phone: result.value.phone,
          email: result.value.email,
          hometown: result.value.hometown,
          role: result.value.role
        };
        localStorage.setItem('accounts', JSON.stringify(accounts));
        loadAccounts();
        Swal.fire('Thành công!', 'Tài khoản đã được cập nhật.', 'success');
      }
    });
  }

  // Load accounts when the page loads
  loadAccounts();
});