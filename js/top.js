// main.js

document.addEventListener("DOMContentLoaded", () => {
  // Music Player Controls
  const playBtn = document.querySelector(".play-btn");
  const skipStartBtn = document.querySelector(".player-btn:nth-child(1)");
  const skipEndBtn = document.querySelector(".player-btn:nth-child(3)");
  const volumeBtn = document.querySelector(".player-option-btn:nth-child(1)");
  const heartBtn = document.querySelector(".player-option-btn:nth-child(2)");
  const downloadBtn = document.querySelector(".player-option-btn:nth-child(3)");
  const progressBar = document.querySelector(".progress-bar");
  const currentTime = document.querySelector(".current-time");
  const totalTime = document.querySelector(".total-time");

  let isPlaying = false;

  // Phát/Tạm dừng nhạc
  playBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    playBtn.innerHTML = isPlaying
      ? '<i class="bi bi-pause-fill"></i>'
      : '<i class="bi bi-play-fill"></i>';
    if (isPlaying) {
      // Logic phát bài hát (gọi API hoặc HTML5 Audio)
      console.log("Playing song...");
    } else {
      // Logic tạm dừng bài hát
      console.log("Pausing song...");
    }
  });

  // Chuyển bài trước
  skipStartBtn.addEventListener("click", () => {
    console.log("Skipping to previous song...");
    // Logic chuyển bài trước
  });

  // Chuyển bài tiếp theo
  skipEndBtn.addEventListener("click", () => {
    console.log("Skipping to next song...");
    // Logic chuyển bài tiếp theo
  });

  // Điều chỉnh âm lượng
  volumeBtn.addEventListener("click", () => {
    alert("Adjust volume"); // Thay bằng slider hoặc logic điều chỉnh âm lượng
  });

  // Thêm vào yêu thích
  heartBtn.addEventListener("click", () => {
    heartBtn.classList.toggle("active");
    console.log(
      heartBtn.classList.contains("active")
        ? "Added to favorites"
        : "Removed from favorites"
    );
  });

  // Tải bài hát
  downloadBtn.addEventListener("click", () => {
    alert("Downloading song..."); // Thay bằng logic tải file
  });

  // Cập nhật thanh tiến trình
  let currentProgress = 25; // Giả lập tiến trình ban đầu
  progressBar.style.width = `${currentProgress}%`;

  // Giả lập cập nhật thời gian
  setInterval(() => {
    if (isPlaying) {
      currentProgress += 1;
      if (currentProgress > 100) currentProgress = 0;
      progressBar.style.width = `${currentProgress}%`;

      // Cập nhật thời gian hiện tại
      const minutes = Math.floor(((currentProgress / 100) * 240) / 60); // Giả sử bài hát 4:00
      const seconds = Math.floor((currentProgress / 100) * 240) % 60;
      currentTime.textContent = `${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
    }
  }, 1000);

  // Xử lý form đăng ký (subscribe)
  const subscribeForm = document.querySelector(".subscribe-form");
  subscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = subscribeForm.querySelector('input[type="text"]').value;
    const email = subscribeForm.querySelector('input[type="email"]').value;
    if (name && email) {
      alert(`Subscribed with Name: ${name}, Email: ${email}`);
      // Thay bằng logic gửi dữ liệu đến server
      subscribeForm.reset();
    } else {
      alert("Please fill in all fields");
    }
  });
});
