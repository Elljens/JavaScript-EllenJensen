const gameUrl = 'https://v2.api.noroff.dev/gamehub';
const apiKey = '29583f39-a999-474e-bfd7-1e4a180cd5b5';
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWxsZW5KZW5zZW4iLCJlbWFpbCI6ImVsbGplbjA1NTEwQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzYyODY3NDYwfQ.U3eQcV23lAW8Yaa1f8dAMa1Xj6pZ8RoiDKyBBqoi0k4';

const container = document.querySelector('#container')

let allGames = [];

async function fetchGames() {
const options = {
    headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey.data
        }
      };
try {
const response = await fetch(gameUrl, options);
if (!response.ok) {
    throw new Error(`Error! Status: ${response.status}`);
}
const result = await response.json();
allGames = result.data;

} catch (error) {
    console.error('Failed to fetch games', error);
    container.innerHTML = '<p>Could not load games. Please try again later</p> '
}
};



function renderGames(gamesToRender) {
    container.innerHTML = '';

    if (gamesToRender.length === 0) {
        container.innerHTML = '<p>No games found. Try a different search!</p>';
        return; 
    }

    gamesToRender.forEach((game) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        image.src = game.image.url;
        image.alt = game.image.alt;
        image.classList.add('image');

        const title = document.createElement('h2');
        title.textContent = game.title;

        const content = document.createElement('div');
        content.classList.add('text-content');

        const genre = document.createElement('p');
        genre.textContent = game.genre;

        const price = document.createElement('p');
        price.textContent = game.price;
        price.classList.add('price');

        const anchor = document.createElement('a')
        anchor.href = `products.html?id=${game.id}`;

        content.appendChild(genre);
        content.appendChild(price);
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(genre);
        card.appendChild(price);
        card.appendChild(content);
        anchor.appendChild(card);

        container.appendChild(anchor);
    });
}

async function startApp() {
    await fetchGames();

    renderGames(allGames);
}

startApp();

