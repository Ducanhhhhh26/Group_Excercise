document.addEventListener("DOMContentLoaded", () => {
  // Initialize localStorage with song data, fixing paths
  const initialSongData = {
    data: [
      {
        top_music: [
          {
            name: "Ava Cornish",
            name_music: "Until I Met You",
            img: "../assets/1.png",
            mp3: "../assets/mp3/1.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Walking Promises",
            img: "../assets/2.png",
            mp3: "../assets/mp3/2.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Gimme Some Courage",
            img: "../assets/3.png",
            mp3: "../assets/mp3/3.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Desired Games",
            img: "../assets/4.png",
            mp3: "../assets/mp3/4.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Dark Alley Acoustic",
            img: "../assets/5.png",
            mp3: "../assets/mp3/5.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Walking Promises",
            img: "../assets/6.png",
            mp3: "../assets/mp3/6.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Endless Things",
            img: "../assets/7.png",
            mp3: "../assets/mp3/7.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Dream Your Moments",
            img: "../assets/8.png",
            mp3: "../assets/mp3/8.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Until I Met You",
            img: "../assets/9.png",
            mp3: "../assets/mp3/9.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Gimme Some Courage",
            img: "../assets/10.png",
            mp3: "../assets/mp3/10.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Dark Alley Acoustic",
            img: "../assets/11.png",
            mp3: "../assets/mp3/11.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "The Heartbeat Stops",
            img: "../assets/12.png",
            mp3: "../assets/mp3/12.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "One More Stranger",
            img: "../assets/13.png",
            mp3: "../assets/mp3/13.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Walking Promises",
            img: "../assets/14.png",
            mp3: "../assets/mp3/14.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Endless Things",
            img: "../assets/15.png",
            mp3: "../assets/mp3/15.mp3",
          },
        ],
      },
      {
        top_all_times: [
          {
            name: "Ava Cornish & Brian Hill",
            name_music: "Bloodlust",
            img: "../assets/album1.jpg.png",
            mp3: "../assets/mp3/album1.mp3",
          },
          {
            name: "Ava Cornish & Brian Hill",
            name_music: "Time flies",
            img: "../assets/album2.jpg.png",
            mp3: "../assets/mp3/album2.mp3",
          },
          {
            name: "Ava Cornish & Brian Hill",
            name_music: "Dark matters",
            img: "../assets/album3.jpg.png",
            mp3: "../assets/mp3/album3.mp3",
          },
          {
            name: "Ava Cornish & Brian Hill",
            name_music: "Eye to eye",
            img: "../assets/album4.jpg.png",
            mp3: "../assets/mp3/album4.mp3",
          },
          {
            name: "Ava Cornish & Brian Hill",
            name_music: "Cloud nine",
            img: "../assets/album5.jpg.png",
            mp3: "../assets/mp3/album5.mp3",
          },
          {
            name: "Ava Cornish & Brian Hill",
            name_music: "Cobweb of lies",
            img: "../assets/album6.jpg.png",
            mp3: "../assets/mp3/album6.mp3",
          },
        ],
      },
      {
        trending: [
          {
            name: "Ava Cornish",
            name_music: "Dark Alley Acoustic",
            img: "../assets/1.png",
            mp3: "../assets/mp3/1.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Dark Alley Acoustic",
            img: "../assets/2.png",
            mp3: "../assets/mp3/2.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Dark Alley Acoustic",
            img: "../assets/3.png",
            mp3: "../assets/mp3/3.mp3",
          },
          {
            name: "Ava Cornish",
            name_music: "Dark Alley Acoustic",
            img: "../assets/4.png",
            mp3: "../assets/mp3/4.mp3",
          },
        ],
      },
    ],
  };

  if (!localStorage.getItem("songData")) {
    localStorage.setItem("songData", JSON.stringify(initialSongData));
  }

  // Modal Toggling
  const loginBtn = document.querySelector(".login-btn");
  const registerBtn = document.querySelector(".register-btn");
  const modalLogin = document.querySelector(".modalLogin");
  const modalRegister = document.querySelector(".modalRegister");

  loginBtn.addEventListener("click", () => {
    modalLogin.classList.toggle("show");
    modalRegister.classList.remove("show");
  });

  registerBtn.addEventListener("click", () => {
    modalRegister.classList.toggle("show");
    modalLogin.classList.remove("show");
  });

  // Close modals when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target === modalLogin) {
      modalLogin.classList.remove("show");
    }
    if (e.target === modalRegister) {
      modalRegister.classList.remove("show");
    }
  });

  // Scroll Buttons for Top Tracks of All Time
  const leftBtn = document.querySelector(".leftBtn");
  const rightBtn = document.querySelector(".rightBtn");
  const topAllTimesRow = document.querySelector(".topAllTimesRow");

  leftBtn.addEventListener("click", () => {
    topAllTimesRow.scrollBy({ left: -235, behavior: "smooth" });
  });

  rightBtn.addEventListener("click", () => {
    topAllTimesRow.scrollBy({ left: 235, behavior: "smooth" });
  });

  // Music Player Controls
  const playBtn = document.querySelector(".play-btn");
  const progressBar = document.querySelector(".progress-bar");
  const currentTimeEl = document.querySelector(".current-time");
  const totalTimeEl = document.querySelector(".total-time");

  let isPlaying = false;
  const audio = new Audio(); // Initialize without a source

  // Format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === undefined) return "5:10"; // Fallback to 5:10 if invalid
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Update Music Player from localStorage
  const updatePlayer = () => {
    const currentSong = JSON.parse(localStorage.getItem("currentSong"));
    const playerSongTitle = document.querySelector(".player-song-info h6");
    const playerArtistName = document.querySelector(".player-song-info p");
    const playerAlbumImg = document.querySelector(".player-album-img img");

    if (currentSong) {
      playerSongTitle.textContent = currentSong.name_music;
      playerArtistName.textContent = currentSong.name;
      playerAlbumImg.src = currentSong.img;
      audio.src = currentSong.mp3;

      // Default duration
      const defaultDuration = 310; // 5:10 in seconds
      totalTimeEl.textContent = formatTime(defaultDuration);

      // Update duration when metadata is available
      audio.addEventListener(
        "loadedmetadata",
        () => {
          const duration = audio.duration || defaultDuration;
          totalTimeEl.textContent = formatTime(duration);
        },
        { once: true }
      );

      // Handle audio loading errors
      audio.addEventListener(
        "error",
        () => {
          totalTimeEl.textContent = formatTime(defaultDuration);
          isPlaying = false;
          playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        },
        { once: true }
      );

      // Reset and play if already playing
      audio.currentTime = 0;
      progressBar.style.width = "0%";
      currentTimeEl.textContent = "0:00";
      if (isPlaying) {
        audio.play().catch(() => {
          isPlaying = false;
          playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        });
      }
    }
  };

  // Set initial player state from localStorage
  updatePlayer();

  // Toggle play/pause
  playBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      audio.play().catch(() => {
        isPlaying = false;
        playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
      });
      playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    } else {
      audio.pause();
      playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    }
  });

  // Update progress bar and current time
  audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration || 310;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
  });

  // Reset progress when audio ends
  audio.addEventListener("ended", () => {
    isPlaying = false;
    playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    progressBar.style.width = "0%";
    currentTimeEl.textContent = "0:00";
    audio.currentTime = 0;
  });

  // Song Click Handlers
  const songData = JSON.parse(localStorage.getItem("songData"));

  // Weekly Top 15 Songs
  const top15Items = document.querySelectorAll("#top15Row > div");
  top15Items.forEach((item, index) => {
    item.addEventListener("click", () => {
      const song = songData.data[0].top_music[index];
      localStorage.setItem("currentSong", JSON.stringify(song));
      updatePlayer();
    });
  });

  // Top Tracks of All Time
  const topAllTimesItems = document.querySelectorAll(".topAllTimesItem");
  topAllTimesItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const song = songData.data[1].top_all_times[index];
      localStorage.setItem("currentSong", JSON.stringify(song));
      updatePlayer();
    });
  });

  // Trending Tracks
  const trendingItems = document.querySelectorAll(".trendingItem");
  trendingItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const song = songData.data[2].trending[index];
      localStorage.setItem("currentSong", JSON.stringify(song));
      updatePlayer();
    });
  });
});
