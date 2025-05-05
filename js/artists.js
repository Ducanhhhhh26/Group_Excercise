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




let data ={
  "data": [
    {
      "Featured_Albums":[
        {
          "name": "Ava Cornish & Brian Hilltest",
          "name_music":"Bloodlust",
          "img": "/assets/album1.jpg.png",
          "mp3": "/assets/1.mp3"
        },
        {
          "name": "Ava Cornish & Brian Hill",
          "name_music":"Time flies",
          "img": "/assets/album2.jpg.png",
          "mp3": "/assets/1.mp3"
        },
        {
          "name": "Ava Cornish & Brian Hilltest",
          "name_music":"Dark matters",
          "img": "/assets/album3.jpg.png",
          "mp3": "/assets/1.mp3"
        },
        {
          "name": "Ava Cornish & Brian Hilltest",
          "name_music":"Eye to eye",
          "img": "/assets/album4.jpg.png",
          "mp3": "/assets/1.mp3"
        },
        {
          "name": "Ava Cornish & Brian Hilltest",
          "name_music":"Cloud nine",
          "img": "/assets/album5.jpg.png",
          "mp3": "/assets/1.mp3"
        },
        {
          "name": "Ava Cornish & Brian Hilltest",
          "name_music":"Cobweb of lies",
          "img": "/assets/album6.jpg.png",
          "mp3": "/assets/1.mp3"
        },
        {
          "name": "Ava Cornish & Brian Hilltest",
          "name_music":"Endless Things",
          "img": "/assets/artist1.jpg.png",
          "mp3": "/assets/1.mp3"
        },
        {
          "name": "Ava Cornish & Brian Hilltest",
          "name_music":"Desired Games",
          "img": "/assets/artist2.jpg.png",
          "mp3": "/assets/1.mp3"
        }

      ]
    },
    {
      "Trending_Albums":[
        {
          "name": "Ava Cornish & Brian Hilltest",
          "name_music":"Dream Your",
          "img": "/assets/artist13.jpg.png",
          "mp3": "/assets/1.mp3"
        },
        {
          "name": "Ava Cornish & Brian Hill",
          "name_music":"Until I Met You",
          "img": "/assets/artist12.jpg.png",
          "mp3": "/assets/1.mp3"
        },
        {
          "name": "Ava Cornish & Brian Hilltest",
          "name_music":"Gimme Some Courage",
          "img": "/assets/artist11.jpg.png",
          "mp3": "/assets/1.mp3"
        },
        {
          "name": "Ava Cornish & Brian Hilltest",
          "name_music":"Dark Alley Acoustic",
          "img": "/assets/artist10.jpg.png",
          "mp3": "/assets/1.mp3"
        },
        {
          "name": "Ava Cornish & Brian Hilltest",
          "name_music":"Walking Promises",
          "img": "/assets/artist9.jpg.png",
          "mp3": "/assets/1.mp3"
        },
        {
          "name": "Ava Cornish & Brian Hilltest",
          "name_music":"Desired Games",
          "img": "/assets/artist8.jpg.png",
          "mp3": "/assets/1.mp3"
        },
        {
          "name": "Ava Cornish & Brian Hilltest",
          "name_music":"Endless Things",
          "img": "/assets/artist7.jpg.png",
          "mp3": "/assets/1.mp3"
        },
        {
          "name": "Ava Cornish & Brian Hilltest",
          "name_music":"Desired Games",
          "img": "/assets/artist6.jpg.png",
          "mp3": "/assets/1.mp3"
        }

      ]
    },
    {
      "top_15_albums":[
          {
              "name": "Ava Cornish & Brian Hilltest",
              "name_music":"Dream Your",
              "img": "/assets/1.png",
              "mp3": "/assets/1.mp3"
          },
          {
              "name": "Ava Cornish & Brian Hilltest",
              "name_music":"Until I Met You",
              "img": "/assets/2.png",
              "mp3": "/assets/1.mp3"
          },
          {
              "name": "Ava Cornish & Brian Hilltest",
              "name_music":"Gimme Some",
              "img": "/assets/3.png",
              "mp3": "/assets/1.mp3"
          },
          {
              "name": "Ava Cornish & Brian Hilltest",
              "name_music":"Dark Alley Acoustic",
              "img": "/assets/4.png",
              "mp3": "/assets/1.mp3"
          },
          {
              "name": "Ava Cornish & Brian Hilltest",
              "name_music":"Walking Promises",
              "img": "/assets/5.png",
              "mp3": "/assets/1.mp3"
          },
          {
              "name": "Ava Cornish & Brian Hilltest",
              "name_music":"Desired Games",
              "img": "/assets/6.png",
              "mp3": "/assets/1.mp3"
          },
          {
              "name": "Ava Cornish & Brian Hilltest",
              "name_music":"Endless Things",
              "img": "/assets/7.png",
              "mp3": "/assets/1.mp3"
          },
          {
              "name": "Ava Cornish & Brian Hilltest",
              "name_music":"Desired Games",
              "img": "/assets/8.png",
              "mp3": "/assets/1.mp3"
          },
          {
              "name": "Ava Cornish & Brian Hilltest",
              "name_music":"Desired Games",
              "img": "/assets/9.png",
              "mp3": "/assets/1.mp3"
          },
          {
              "name": "Ava Cornish & Brian Hilltest",
              "name_music":"Desired Games",
              "img": "/assets/10.png",
              "mp3": "/assets/1.mp3"
          },
          {
              "name": "Ava Cornish & Brian Hilltest",
              "name_music":"Desired Games",
              "img": "/assets/11.png",
              "mp3": "/assets/1.mp3"
          },
          {
              "name": "Ava Cornish & Brian Hilltest",
              "name_music":"Desired Games",
              "img": "/assets/12.png",
              "mp3": "/assets/1.mp3"
          },
          {
              "name": "Ava Cornish & Brian Hilltest",
              "name_music":"Desired Games",
              "img": "/assets/13.png",
              "mp3": "/assets/1.mp3"
          },
          {
              "name": "Ava Cornish & Brian Hilltest",
              "name_music":"Desired Games",
              "img": "/assets/14.png",
              "mp3": "/assets/1.mp3"
          },
          {
              "name": "Ava Cornish & Brian Hilltest",
              "name_music":"Desired Games",
              "img": "/assets/15.png",
              "mp3": "/assets/1.mp3"
          }
      ]
    },
    {
      "Albums_By_Artists":[
        {
          "name":"Ava Cornish",
          "name_music":"Best Of Ava Cornish",
          "img":"/assets/artist1.jpg.png",
          "mp3":"/assets/1.mp3"
        },
        {
          "name":"Until I Met You",
          "name_music":"Best Of Ava Cornish",
          "img":"/assets/artist2.jpg.png",
          "mp3":"/assets/2.mp3"
        },
        {
          "name":"Gimme Some Courage",
          "name_music":"Best Of Ava Cornish",
          "img":"/assets/artist3.jpg.png",
          "mp3":"/assets/3.mp3"
        },
        {
          "name":"Dark Alley Acoustic",
          "name_music":"Best Of Ava Cornish",
          "img":"/assets/artist4.jpg.png",
          "mp3":"/assets/4.mp3"
        },
        {
          "name":"Walking Promises",
          "name_music":"Best Of Ava Cornish",
          "img":"/assets/artist5.jpg.png",
          "mp3":"/assets/5.mp3"
        },
        {
          "name":"Desired Games",
          "name_music":"Best Of Ava Cornish",
          "img":"/assets/artist6.jpg.png",
          "mp3":"/assets/1.mp3"
        },
        {
          "name":"Endless Things",
          "name_music":"Best Of Ava Cornish",
          "img":"/assets/artist7.jpg.png",
          "mp3":"/assets/2.mp3"
        },
        {
          "name":"Desired Games",
          "name_music":"Best Of Ava Cornish",
          "img":"/assets/artist8.jpg.png",
          "mp3":"/assets/3.mp3"
        }
      ]
    }

  ]
}

