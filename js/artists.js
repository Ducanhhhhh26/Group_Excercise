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
