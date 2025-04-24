document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const modalLogin = document.querySelector('.modalLogin');
    const modalRegister = document.querySelector('.modalRegister');
    const loginForm = document.querySelector('.formLogin');
    const registerForm = document.querySelector('.formRegister');
    const switchToRegister = document.querySelector('.switch-to-register');
    const switchToLogin = document.querySelector('.switch-to-login');

    // Open Login Modal
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modalLogin.classList.add('show');
    });

    // Open Register Modal
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modalRegister.classList.add('show');
    });

    // Close Modal when clicking outside
    modalLogin.addEventListener('click', (e) => {
        if (e.target === modalLogin) {
            modalLogin.classList.remove('show');
        }
    });

    modalRegister.addEventListener('click', (e) => {
        if (e.target === modalRegister) {
            modalRegister.classList.remove('show');
        }
    });

    // Switch from Login to Register
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        modalLogin.classList.remove('show');
        modalRegister.classList.add('show');
    });

    // Switch from Register to Login
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        modalRegister.classList.remove('show');
        modalLogin.classList.add('show');
    });

    // Handle Register Form Submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email1').value.trim();
        const password = document.querySelector('#password1').value;
        const confirmPassword = document.querySelector('#password2').value;

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Check if email already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            alert('This email is already registered. Please use a different email or login.');
            return;
        }

        // Save new user to localStorage
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registration successful! Please login.');
        modalRegister.classList.remove('show');
        modalLogin.classList.add('show');

        // Reset form
        registerForm.reset();
    });

    // Handle Login Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('#email').value.trim();
        const password = document.querySelector('#password').value;
        const keepSignedIn = document.querySelector('#checkbox').checked;

        // Validation
        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Check credentials
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            alert('Invalid email or password.');
            return;
        }

        // Successful login
        if (keepSignedIn) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        }

        alert(`Welcome back, ${user.name}!`);
        modalLogin.classList.remove('show');

        // Reset form
        loginForm.reset();
    });
});