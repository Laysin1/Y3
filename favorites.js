document.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.getElementById('favoritesContainer');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Back Button Functionality
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        window.history.back(); // Go back to the previous page
    });

    // Function to update favorites in localStorage
    function updateFavorites() {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Function to render favorited products
    function renderFavorites() {
        favoritesContainer.innerHTML = ''; // Clear the container

        if (favorites.length === 0) {
            favoritesContainer.innerHTML = '<p>No favorites added yet.</p>';
        } else {
            favorites.forEach(product => {
                const productBox = document.createElement('div');
                productBox.classList.add('box');
                productBox.innerHTML = `
                    <div class="image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="content">
                        <h3>${product.name}</h3>
                        <div class="price">$${product.price.toFixed(2)}</div>
                        <a href="#" class="fas fa-heart favorite-btn active" data-id="${product.id}"></a>
                    </div>
                `;
                favoritesContainer.appendChild(productBox);
            });

            // Add event listeners to remove favorites
            const favoriteButtons = document.querySelectorAll('.favorite-btn');
            favoriteButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const productId = button.dataset.id;

                    // Remove the product from favorites
                    favorites = favorites.filter(item => item.id !== productId);
                    updateFavorites(); // Update localStorage
                    renderFavorites(); // Re-render the favorites list
                });
            });
        }
    }

    // Render favorites on page load
    renderFavorites();
});