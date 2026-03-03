const gameUrl = 'https://v2.api.noroff.dev/gamehub';
const container = document.querySelector('#container')
const searchInput = document.querySelector('#searchInput')

let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemBagde = document.querySelector('.cart-count');
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemBagde.style.visibility = 'visible';
        cartItemBagde.textContent = cartItemCount;
    } else {
        cartItemBagde.style.visibility = 'hidden';
        cartItemBagde.textContent = '';
    }
};

function loadCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartItemCount = totalItems;
    updateCartCount(0);
}

loadCartCount();

let allGames = [];

async function fetchGames() {
try {
const response = await fetch(gameUrl);
if (!response.ok) {
    throw new Error(`Error! Status: ${response.status}`);
}
const result = await response.json();
allGames = result.data;

localStorage.setItem('allGames', JSON.stringify(result));

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

        const title = document.createElement('h3');
        title.textContent = game.title;

        const content = document.createElement('div');
        content.classList.add('text-content');

        const price = document.createElement('p');
        price.textContent = game.price;
        price.classList.add('price');

        const anchor = document.createElement('a')
        anchor.href = `products.html?id=${game.id}`;
        anchor.classList.add('card-anchor')

        content.appendChild(title);
        content.appendChild(price);
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(content);
        anchor.appendChild(card);

        container.appendChild(anchor);
    });
}

function filterGames(searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    if (!lowerCaseSearchTerm) {
        return allGames;
    }
    const filtered = allGames.filter((game) => {
        const nameMatch = game.title.toLowerCase().includes(lowerCaseSearchTerm);
        const genreMatch = game.genre.toLowerCase().includes(lowerCaseSearchTerm);
return nameMatch || genreMatch;
    });
    return filtered;
}



searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    const filteredGames = filterGames(searchTerm);

    renderGames(filteredGames);
});




async function startApp() {
    await fetchGames();

    renderGames(allGames);
}

startApp();


