/* Login */
const loginBtn = document.querySelector('.login-btn');
const modal = document.querySelector('.modalLogin');

loginBtn.addEventListener('click', () => {
  modal.classList.add('show');
});

// Đóng modal khi click ra ngoài (tuỳ chọn)
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});
/* Register */
const registerBtn = document.querySelector('.register-btn');
const registerModal = document.querySelector('.modalRegister');

registerBtn.addEventListener('click', () => {
  registerModal.classList.add('show');
});

registerModal.addEventListener('click', (e) => {
  if (e.target === registerModal) {
    registerModal.classList.remove('show');
  }
});
/*Render  */
 const artistsData = [
  [
    { image: "../assets/song1.jpg.png", title: "Best Of Ava Cornish" },
    { image: "../assets/song2.jpg.png", title: "Until I Met You" },
    { image: "../assets/song3.jpg.png", title: "Gimme Some Courage" },
    { image: "../assets/song4.jpg.png", title: "Dark Alley Acoustic" },
    { image: "../assets/song5.jpg.png", title: "Walking Promises" },
    { image: "../assets/song6.jpg.png", title: "Desired Games" }
],
[
    { image: "../assets/r_music1.jpg.png", title: "Claire Hudson" },
    { image: "../assets/artist1.jpg.png", title: "Carl Brown" },
    { image: "../assets/artist2.jpg.png", title: "Virginia Harris" },
    { image: "../assets/artist3.jpg.png", title: "Max Glover" },
    { image: "../assets/artist4.jpg.png", title: "Jennifer Kelly" },
    { image: "../assets/artist5.jpg.png", title: "Harry Jackson" },
    { image: "../assets/artist6.jpg.png", title: "Kevin Buckland" },
    { image: "../assets/artist7.jpg.png", title: "Anna Ellison" },
    { image: "../assets/artist8.jpg.png", title: "Kylie Greene" },
    { image: "../assets/song6.jpg (1).png", title: "Sean Wilson" },
    { image: "../assets/album4.jpg.png", title: "Jennifer Kelly" },
    { image: "../assets/song2.jpg (1).png", title: "Steven Walker" },
    { image: "../assets/artist9.jpg.png", title: "Olivia Paige" },
    { image: "../assets/artist10.jpg.png", title: "Nicole Miller" },
    { image: "../assets/artist11.jpg.png", title: "Edward Clark" },
    { image: "../assets/artist12.jpg.png", title: "Adam Glover" },
    { image: "../assets/artist13.jpg.png", title: "Leah Knox" },
    { image: "../assets/song4.jpg (1).png", title: "Charles Davidson" },
    { image: "../assets/album2.jpg.png", title: "Vanessa Hunter" },
    { image: "../assets/album3.jpg.png", title: "Sophie Hudson" }
]
];

// Hàm để render danh sách nghệ sĩ
const renderArtistsSections = () => {
const artistSections = document.querySelectorAll('.artists-grid');

artistSections.forEach((grid, index) => {
    grid.innerHTML = ""; // Xóa nội dung cũ

    artistsData[index].forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        const img = document.createElement('img');
        img.src = artist.image;
        img.alt = artist.title;

        const title = document.createElement('p');
        title.textContent = artist.title;

        artistCard.appendChild(img);
        artistCard.appendChild(title);
        grid.appendChild(artistCard);
    });
});
};

// Gọi hàm để render danh sách nghệ sĩ p2
renderArtistsSections();



// Lấy element artists-grid2
const renderArtistsSections2 = () => {
  const artistSections2 = document.querySelectorAll('.artists-grid2');
  
  artistSections2.forEach((grid, index) => {
      grid.innerHTML = ""; // Xóa nội dung cũ
  
      artistsData[1].forEach(artist => {
          const artistCard2 = document.createElement('div');
          artistCard2.classList.add('artist-card2');
  
          const img = document.createElement('img');
          img.src = artist.image;
          img.alt = artist.title;
  
          const title2 = document.createElement('p');
          title2.textContent = artist.title;
  
          artistCard2.appendChild(img);
          artistCard2.appendChild(title2);
          grid.appendChild(artistCard2);
      });
  });
  };
  
  // Gọi hàm để render danh sách nghệ sĩ p2
  renderArtistsSections2();



// Chức năng toggle sidebar (mở rộng/thu gọn)
const sidebar = document.querySelector('.sidebar'); // Lấy phần tử sidebar
const chevronBtn = document.querySelector('.sidebar-chevorn a'); // Lấy nút chevron (mũi tên)
const mainContent = document.querySelector('.container'); // Lấy container chính
const header = document.querySelector('header'); // Lấy header
let isSidebarExpanded = false; // Biến trạng thái: false = sidebar thu gọn, true = sidebar mở rộng

// Thêm sự kiện click cho nút chevron để toggle sidebar
chevronBtn.addEventListener('click', () => {
    isSidebarExpanded = !isSidebarExpanded; // Đổi trạng thái (thu gọn ↔ mở rộng)
    if (isSidebarExpanded) {
        // Khi sidebar mở rộng  
        sidebar.classList.add('expanded'); // Thêm class .expanded cho sidebar
        mainContent.classList.add('expanded'); // Điều chỉnh padding container
        header.classList.add('expanded'); // Điều chỉnh vị trí và chiều rộng header
        chevronBtn.querySelector('i').classList.replace('fa-chevron-right', 'fa-chevron-left'); // Đổi biểu tượng thành mũi tên trái
    } else {
        // Khi sidebar thu gọn
        sidebar.classList.remove('expanded'); // Xóa class .expanded
        mainContent.classList.remove('expanded'); // Khôi phục padding container
        header.classList.remove('expanded'); // Khôi phục header
        chevronBtn.querySelector('i').classList.replace('fa-chevron-left', 'fa-chevron-right'); // Đổi biểu tượng thành mũi tên phải
    }
});





// Hàm render toàn bộ nghệ sĩ ban đầu
const renderArtistsSections1 = () => {
  const artistSections = document.querySelectorAll('.artists-grid2');

  artistSections.forEach((grid, index) => {
    grid.innerHTML = "";

    artistsData[1].forEach(artist => {
      const artistCard = document.createElement('div');
      artistCard.classList.add('artist-card2');

      const img = document.createElement('img');
      img.src = artist.image;
      img.alt = artist.title;

      const title = document.createElement('p');
      title.textContent = artist.title;

      artistCard.appendChild(img);
      artistCard.appendChild(title);
      grid.appendChild(artistCard);
    });
  });
};

// Hàm tìm kiếm nghệ sĩ
const searchArtists = (searchTerm) => {
  const artistSections = document.querySelectorAll('.artists-grid2');

  // Gộp toàn bộ nghệ sĩ từ tất cả sections thành 1 mảng
  const allArtists = artistsData.flat();

  // Lọc nghệ sĩ theo từ khóa
  const filteredArtists = allArtists.filter(artist =>
    artist.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xóa nội dung cũ và chỉ render nghệ sĩ khớp
  artistSections.forEach(grid => {
    grid.innerHTML = "";

    filteredArtists.forEach(artist => {
      const artistCard = document.createElement('div');
      artistCard.classList.add('artist-card2');

      const img = document.createElement('img');
      img.src = artist.image;
      img.alt = artist.title;

      const title = document.createElement('p');
      title.textContent = artist.title;

      artistCard.appendChild(img);
      artistCard.appendChild(title);
      grid.appendChild(artistCard);
    });
  });
};

// Lắng nghe sự kiện nhập vào ô tìm kiếm
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.trim();

  if (searchTerm === "") {
    renderArtistsSections1(); // Nếu trống, render lại tất cả
  } else {
    searchArtists(searchTerm); // Nếu có từ khóa, lọc
  }
});

// Render ban đầu
renderArtistsSections1();
const links = document.querySelectorAll('.sidebar a');
const currentPage = window.location.pathname.split('/').pop();

links.forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage) {
    link.classList.add('active');
  }
});





