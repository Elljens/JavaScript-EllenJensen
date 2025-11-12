const gameUrl = 'https://v2.api.noroff.dev/gamehub';
const apiKey = '29583f39-a999-474e-bfd7-1e4a180cd5b5';
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWxsZW5KZW5zZW4iLCJlbWFpbCI6ImVsbGplbjA1NTEwQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzYyODY3NDYwfQ.U3eQcV23lAW8Yaa1f8dAMa1Xj6pZ8RoiDKyBBqoi0k4';

const gameContainer = document.querySelector('#game-container')


async function fetchGameDetail() {
const options = {
    headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey.data
        }
      };

try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const response = await fetch(`${gameUrl}/${id}`,options);
    if (!response.ok) {
    throw new Error(`Error! Status: ${response.status}`);
    }
    const result = await response.json();
    const details = result.data;

    const gameDiv = document.createElement('div');
    gameDiv.classList.add('game-page');

    const image = document.createElement('img');
    image.src = details.image.url;
    image.alt = details.image.alt;
    image.classList.add('game-image');

    const title = document.createElement('h2');
    title.textContent = details.title;
    title.classList.add('game-title')

    const genre = document.createElement('p');
    genre.textContent = details.genre;

    const price = document.createElement('p');
    price.textContent = details.price;
    price.classList.add('price');

    const description = document.createElement('p')
    description.classList.add('game-description');

    const backButton = document.createElement('a');
    backButton.classList.add('back-button');
    backButton.href = './index.hrml';

    gameDiv.appendChild(title);
    gameDiv.appendChild(image);
    gameDiv.appendChild(genre);
    gameDiv.appendChild(price);
    gameDiv.appendChild(description);
    gameDiv.appendChild(backButton);

    gameContainer.appendChild(gameDiv);
        
    } catch (error) {
    console.error('Failed to fetch games', error);
    gameContainer.innerHTML = '<p>Could not load games. Please try again later</p> '
    }
};

fetchGameDetail();


/*
try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const response = await fetch(`${gameUrl}/${id}`,options);
    const result = await response.json();
    details = result.data;

    const gameDiv = document.createElement('div');
    gameDiv.classList.add('game-page');

    const image = document.createElement('img');
    image.src = game.image.url;
    image.alt = game.image.alt;
    image.classList.add('game-image');

    const title = document.createElement('h2');
    title.textContent = game.title;

    const genre = document.createElement('p');
    genre.textContent = game.genre;

    const price = document.createElement('p');
    price.textContent = game.price;
    price.classList.add('price');

    const description = document.createElement('p')
    description.classList.add('game-description');

    const backButton = document.createElement('a');
    backButton.classList.add('back-button');
    backButton.href = './index.hrml';
    
    gameDiv.appendChild(image);
    gameDiv.appendChild(title);
    gameDiv.appendChild(genre);
    gameDiv.appendChild(price);
    gameDiv.appendChild(description);
    gameDiv.appendChild(backButton);

} catch (error) {
    console.error('Failed to fetch games', error)
}
};

fetchGameDetail();*/