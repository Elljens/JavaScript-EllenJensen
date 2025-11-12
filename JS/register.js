const registerForm = document.querySelector('#new-user-form');

const BASE_API_URL = 'https://v2.api.noroff.dev/' ;
const AUTH_REGISTER_URL = `${BASE_API_URL}/auth/register`;

async function registerUser(userDetails) {
    try {
        const response = await fetch(AUTH_REGISTER_URL);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    const formData = {
        name: name,
        email: email,
        password: password,
    };

    console.log(formData);
});

const container = document.querySelector('#container');
console.log(container);