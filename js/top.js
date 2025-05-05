document.addEventListener("DOMContentLoaded", () => {
  // Initialize localStorage with song data, using local paths for img and external URLs for mp3
  const initialSongData = {
    data: [
      {
        top_music: [
          {
            name: "Ava Cornish",
            name_music: "Until I Met You",
            img: "../assets/1.png",
            mp3: "https://samplesongs.netlify.app/Faded.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Walking Promises",
            img: "../assets/2.png",
            mp3: "https://samplesongs.netlify.app/Solo.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Gimme Some Courage",
            img: "../assets/3.png",
            mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Desired Games",
            img: "../assets/4.png",
            mp3: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Dark Alley Acoustic",
            img: "../assets/5.png",
            mp3: "https://samplesongs.netlify.app/Hate%20Me.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Walking Promises",
            img: "../assets/6.png",
            mp3: "https://samplesongs.netlify.app/Without%20Me.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Endless Things",
            img: "../assets/7.png",
            mp3: "https://samplesongs.netlify.app/Faded.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Dream Your Moments",
            img: "../assets/8.png",
            mp3: "https://samplesongs.netlify.app/Solo.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Until I Met You",
            img: "../assets/9.png",
            mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Gimme Some Courage",
            img: "../assets/10.png",
            mp3: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Dark Alley Acoustic",
            img: "../assets/11.png",
            mp3: "https://samplesongs.netlify.app/Hate%20Me.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "The Heartbeat Stops",
            img: "../assets/12.png",
            mp3: "https://samplesongs.netlify.app/Without%20Me.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "One More Stranger",
            img: "../assets/13.png",
            mp3: "https://samplesongs.netlify.app/Faded.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Walking Promises",
            img: "../assets/14.png",
            mp3: "https://samplesongs.netlify.app/Solo.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Endless Things",
            img: "../assets/15.png",
            mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3",
          },
        ],
      },
      {
        top_all_times: [
          {
            name: "Ava Cornish & Brian Hill",
            name_music: "Bloodlust",
            img: "../assets/album1.jpg.png",
            mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3",
          },
          {
            name: "Ava Cornish & Brian Hill",
            name_music: "Time flies",
            img: "../assets/album2.jpg.png",
            mp3: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
          },
          {
            name: "Ava Cornish & Brian Hill",
            name_music: "Dark matters",
            img: "../assets/album3.jpg.png",
            mp3: "https://samplesongs.netlify.app/Faded.mp3",
          },
          {
            name: "Ava Cornish & Brian Hill",
            name_music: "Eye to eye",
            img: "../assets/album4.jpg.png",
            mp3: "https://samplesongs.netlify.app/Hate%20Me.mp3",
          },
          {
            name: "Ava Cornish & Brian Hill",
            name_music: "Cloud nine",
            img: "../assets/album5.jpg.png",
            mp3: "https://samplesongs.netlify.app/Solo.mp3",
          },
          {
            name: "Ava Cornish & Brian Hill",
            name_music: "Cobweb of lies",
            img: "../assets/album6.jpg.png",
            mp3: "https://samplesongs.netlify.app/Without%20Me.mp3",
          },
        ],
      },
      {
        trending: [
          {
            name: "Ava Cornish",
            name_music: "Dark Alley Acoustic",
            img: "../assets/1.png",
            mp3: "https://samplesongs.netlify.app/Death%20Bed.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Dark Alley Acoustic",
            img: "../assets/2.png",
            mp3: "https://samplesongs.netlify.app/Solo.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Dark Alley Acoustic",
            img: "../assets/3.png",
            mp3: "https://samplesongs.netlify.app/Faded.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Dark Alley Acoustic",
            img: "../assets/4.png",
            mp3: "https://samplesongs.netlify.app/Hate%20Me.mp3",
          },
        ],
      },
    ],
  };

  // Đảm bảo có local storage
  if (!localStorage.getItem("songData")) {
    localStorage.setItem("songData", JSON.stringify(initialSongData));
  }

  const links = document.querySelectorAll(".sidebar a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  // Modal Toggling and Music Player Visibility
  const loginBtn = document.querySelector(".login-btn");
  const registerBtn = document.querySelector(".register-btn");
  const modalLogin = document.querySelector(".modalLogin");
  const modalRegister = document.querySelector(".modalRegister");
  const musicPlayer = document.querySelector(".music-player");

  const toggleMusicPlayerVisibility = () => {
    if (
      modalLogin.classList.contains("show") ||
      modalRegister.classList.contains("show")
    ) {
      musicPlayer.classList.add("hidden");
    } else {
      musicPlayer.classList.remove("hidden");
    }
  };

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      modalLogin.classList.toggle("show");
      modalRegister.classList.remove("show");
      toggleMusicPlayerVisibility();
    });
  }

  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      modalRegister.classList.toggle("show");
      modalLogin.classList.remove("show");
      toggleMusicPlayerVisibility();
    });
  }

  document.addEventListener("click", (e) => {
    if (e.target === modalLogin) {
      modalLogin.classList.remove("show");
      toggleMusicPlayerVisibility();
    }
    if (e.target === modalRegister) {
      modalRegister.classList.remove("show");
      toggleMusicPlayerVisibility();
    }
  });

  // Scroll Buttons for Top Tracks of All Time
  const leftBtn = document.querySelector(".leftBtn");
  const rightBtn = document.querySelector(".rightBtn");
  const topAllTimesRow = document.querySelector(".topAllTimesRow");

  if (leftBtn) {
    leftBtn.addEventListener("click", () => {
      topAllTimesRow.scrollBy({ left: -235, behavior: "smooth" });
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener("click", () => {
      topAllTimesRow.scrollBy({ left: 235, behavior: "smooth" });
    });
  }

  // Music Player Controls
  const playBtn = document.querySelector(".play-btn");
  const progressBar = document.querySelector(".progress-bar");
  const currentTimeEl = document.querySelector(".current-time");
  const totalTimeEl = document.querySelector(".total-time");

  let isPlaying = false;
  const audio = new Audio();

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === undefined) return "5:10";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const updatePlayer = () => {
    let currentSong =
      JSON.parse(localStorage.getItem("currentSong")) ||
      initialSongData.data[0].top_music[0];
    localStorage.setItem("currentSong", JSON.stringify(currentSong));

    const playerSongTitle = document.querySelector(".player-song-info h6");
    const playerArtistName = document.querySelector(".player-song-info p");
    const playerAlbumImg = document.querySelector(".small-img");

    if (playerSongTitle) playerSongTitle.textContent = currentSong.name_music;
    if (playerArtistName) playerArtistName.textContent = currentSong.name;
    if (playerAlbumImg) playerAlbumImg.src = currentSong.img;

    audio.src = currentSong.mp3;
    const defaultDuration = 310;
    if (totalTimeEl) totalTimeEl.textContent = formatTime(defaultDuration);

    audio.addEventListener(
      "loadedmetadata",
      () => {
        if (totalTimeEl)
          totalTimeEl.textContent = formatTime(
            audio.duration || defaultDuration
          );
      },
      { once: true }
    );

    audio.addEventListener(
      "error",
      () => {
        isPlaying = false;
        if (playBtn) playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
      },
      { once: true }
    );

    audio.currentTime = 0;
    if (progressBar) progressBar.style.width = "0%";
    if (currentTimeEl) currentTimeEl.textContent = "0:00";

    if (isPlaying && audio.src) {
      audio
        .play()
        .then(() => {
          if (playBtn) playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        })
        .catch(() => {
          isPlaying = false;
          if (playBtn) playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        });
    }
  };

  updatePlayer();

  if (playBtn) {
    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isPlaying = !isPlaying;
      if (isPlaying && audio.src) {
        audio
          .play()
          .then(() => {
            playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
          })
          .catch(() => {
            isPlaying = false;
            playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
          });
      } else {
        audio.pause();
        playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
      }
    });
  }

  audio.addEventListener("play", () => {
    isPlaying = true;
    if (playBtn) playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
  });

  audio.addEventListener("pause", () => {
    isPlaying = false;
    if (playBtn) playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
  });

  audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration || 310;
    const progressPercent = (currentTime / duration) * 100;
    if (progressBar) progressBar.style.width = `${progressPercent}%`;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(currentTime);
  });

  audio.addEventListener("ended", () => {
    isPlaying = false;
    if (playBtn) playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    if (progressBar) progressBar.style.width = "0%";
    if (currentTimeEl) currentTimeEl.textContent = "0:00";
    audio.currentTime = 0;
  });

  let songData =
    JSON.parse(localStorage.getItem("songData")) || initialSongData;
  localStorage.setItem("songData", JSON.stringify(songData));

  // Function play song when clicked
  window.playSong = function (index, category) {
    let song;
    if (category === "top_music") {
      song = songData.data[0].top_music[index];
    } else if (category === "top_all_times") {
      song = songData.data[1].top_all_times[index];
    } else if (category === "trending") {
      song = songData.data[2].trending[index];
    }

    if (song) {
      localStorage.setItem("currentSong", JSON.stringify(song));
      updatePlayer();
      isPlaying = true;
      audio
        .play()
        .then(() => {
          if (playBtn) playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        })
        .catch(() => {
          isPlaying = false;
          if (playBtn) playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        });
    }
  };

  // Search function
  const searchInput = document.querySelector(".search-input");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.trim().toLowerCase();

      // Reset display
      if (!searchTerm) {
        document.querySelectorAll("#top15Row > div").forEach((el) => {
          el.style.display = "flex";
        });
        document.querySelectorAll(".topAllTimesItem").forEach((el) => {
          el.style.display = "block";
        });
        document.querySelectorAll(".trendingItem").forEach((el) => {
          el.style.display = "flex";
        });
        return;
      }

      // Filter Weekly Top 15
      const top15Items = document.querySelectorAll("#top15Row > div");
      songData.data[0].top_music.forEach((song, index) => {
        const matches =
          song.name_music.toLowerCase().includes(searchTerm) ||
          song.name.toLowerCase().includes(searchTerm);
        if (index < top15Items.length) {
          top15Items[index].style.display = matches ? "flex" : "none";
        }
      });

      // Filter top_all_times
      songData.data[1].top_all_times.forEach((song, index) => {
        const matches =
          song.name_music.toLowerCase().includes(searchTerm) ||
          song.name.toLowerCase().includes(searchTerm);
        const element = document.querySelector(
          `.topAllTimesItem:nth-child(${index + 1})`
        );
        if (element) {
          element.style.display = matches ? "block" : "none";
        }
      });

      // Filter trending
      songData.data[2].trending.forEach((song, index) => {
        const matches =
          song.name_music.toLowerCase().includes(searchTerm) ||
          song.name.toLowerCase().includes(searchTerm);
        const element = document.querySelector(
          `.trendingItem:nth-child(${index + 1})`
        );
        if (element) {
          element.style.display = matches ? "flex" : "none";
        }
      });
    });
  }
});

const sidebar = document.querySelector(".sidebar");
const chevronBtn = document.querySelector(".sidebar-chevorn a");
const mainContent = document.querySelector(".container");
const header = document.querySelector("header");
let isSidebarExpanded = false;

if (chevronBtn) {
  chevronBtn.addEventListener("click", () => {
    isSidebarExpanded = !isSidebarExpanded;
    if (isSidebarExpanded) {
      sidebar.classList.add("expanded");
      mainContent.classList.add("expanded");
      header.classList.add("expanded");
      chevronBtn
        .querySelector("i")
        .classList.replace("fa-chevron-right", "fa-chevron-left");
    } else {
      sidebar.classList.remove("expanded");
      mainContent.classList.remove("expanded");
      header.classList.remove("expanded");
      chevronBtn
        .querySelector("i")
        .classList.replace("fa-chevron-left", "fa-chevron-right");
    }
  });
}
