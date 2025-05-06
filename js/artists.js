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
    {id:1, image: "../assets/song1.jpg.png", title: "Best Of Ava Cornish", },
    {id:2,  image: "../assets/song2.jpg.png", title: "Until I Met You" },
    {id:3,  image: "../assets/song3.jpg.png", title: "Gimme Some Courage" },
    {id:4,  image: "../assets/song4.jpg.png", title: "Dark Alley Acoustic" },
    {id:5,  image: "../assets/song5.jpg.png", title: "Walking Promises" },
    {id:6,  image: "../assets/song6.jpg.png", title: "Desired Games" }
],
[
    {id:7,  image: "../assets/r_music1.jpg.png", title: "Claire Hudson" },
    {id:8,  image: "../assets/artist1.jpg.png", title: "Carl Brown" },
    {id:9,  image: "../assets/artist2.jpg.png", title: "Virginia Harris" },
    {id:10,  image: "../assets/artist3.jpg.png", title: "Max Glover" },
    {id:11,  image: "../assets/artist4.jpg.png", title: "Jennifer Kelly" },
    {id:12,  image: "../assets/artist5.jpg.png", title: "Harry Jackson" },
    {id:13,  image: "../assets/artist6.jpg.png", title: "Kevin Buckland" },
    {id:14,  image: "../assets/artist7.jpg.png", title: "Anna Ellison" },
    {id:15,  image: "../assets/artist8.jpg.png", title: "Kylie Greene" },
    {id:16,  image: "../assets/song6.jpg (1).png", title: "Sean Wilson" },
    {id:17,  image: "../assets/album4.jpg.png", title: "Jennifer Kelly" },
    {id:18,  image: "../assets/song2.jpg (1).png", title: "Steven Walker" },
    {id:19,  image: "../assets/artist9.jpg.png", title: "Olivia Paige" },
    {id:20, image: "../assets/artist10.jpg.png", title: "Nicole Miller" },
    {id:21, image: "../assets/artist11.jpg.png", title: "Edward Clark" },
    {id:22,  image: "../assets/artist12.jpg.png", title: "Adam Glover" },
    {id:23,  image: "../assets/artist13.jpg.png", title: "Leah Knox" },
    {id:24,  image: "../assets/song4.jpg (1).png", title: "Charles Davidson" },
    {id:25,  image: "../assets/album2.jpg.png", title: "Vanessa Hunter" },
    {id:26,  image: "../assets/album3.jpg.png", title: "Sophie Hudson" }
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





