document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.cart-btn');
    const cartItems = document.querySelector('.listCart');
    const cartCount = document.querySelector('.icons span');
    const cartTab = document.querySelector('.cartTab');
    const closeCart = document.querySelector('.close');
    const clearAllButton = document.querySelector('.clearAll');
    const totalPriceElement = document.getElementById('totalPrice');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add to Cart Functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productBox = button.closest('.box');
            const product = {
                id: productBox.dataset.id,
                name: productBox.querySelector('.content h3').innerText,
                price: parseFloat(productBox.querySelector('.content .price').innerText.replace('$', '')),
                image: productBox.querySelector('.image img').src,
                quantity: 1
            };

            addToCart(product);
        });
    });

    // Function to Add Product to Cart
    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }

        updateCart();
        saveCartToLocalStorage();
    }

    // Update Cart UI
    function updateCart() {
        cartItems.innerHTML = '';
        let totalQuantity = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;

            const cartItem = document.createElement('div');
            cartItem.classList.add('item');
            cartItem.dataset.id = item.id;
            cartItem.innerHTML = `
                <div class="image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="name">${item.name}</div>
                <div class="totalPrice">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });

        cartCount.innerText = totalQuantity;
        totalPriceElement.innerText = totalPrice.toFixed(2);

        // Add event listeners for quantity changes
        const minusButtons = document.querySelectorAll('.minus');
        const plusButtons = document.querySelectorAll('.plus');

        minusButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.closest('.item').dataset.id;
                changeQuantity(productId, 'minus');
            });
        });

        plusButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.closest('.item').dataset.id;
                changeQuantity(productId, 'plus');
            });
        });
    }

    // Change Quantity Functionality
    function changeQuantity(productId, type) {
        const productIndex = cart.findIndex(item => item.id === productId);
        if (productIndex !== -1) {
            if (type === 'minus') {
                if (cart[productIndex].quantity > 1) {
                    cart[productIndex].quantity -= 1;
                } else {
                    cart.splice(productIndex, 1);
                }
            } else if (type === 'plus') {
                cart[productIndex].quantity += 1;
            }
            updateCart();
            saveCartToLocalStorage();
        }
    }

    // Clear All Functionality
    clearAllButton.addEventListener('click', () => {
        cart = [];
        updateCart();
        saveCartToLocalStorage();
    });

    // Save Cart to Local Storage
    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Load Cart on Page Load
    updateCart();

    // Toggle Cart Visibility
    document.querySelector('.fa-shopping-cart').addEventListener('click', () => {
        cartTab.style.right = '0';
    });

    closeCart.addEventListener('click', () => {
        cartTab.style.right = '-400px';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const favoritesCount = document.querySelector('.favorites-count');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Function to update favorites count in the header
    function updateFavoritesCount() {
        if (favoritesCount) {
            favoritesCount.innerText = favorites.length;
        }
    }

    // Function to check if a product is favorited
    function isProductFavorited(productId) {
        return favorites.some(item => item.id === productId);
    }

    // Function to add or remove a product from favorites
    function toggleFavorite(product) {
        const productId = product.id;
        const isFavorite = isProductFavorited(productId);

        if (isFavorite) {
            // Remove from favorites
            favorites = favorites.filter(item => item.id !== productId);
        } else {
            // Add to favorites
            favorites.push(product);
        }

        // Save to localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesCount();
    }

    // Initialize favorite buttons
    favoriteButtons.forEach(button => {
        const productId = button.dataset.id;

        // Highlight the heart icon if the product is already favorited
        if (isProductFavorited(productId)) {
            button.classList.add('active');
        }

        // Toggle favorite on click
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productBox = button.closest('.box');
            const product = {
                id: productId,
                name: productBox.querySelector('.content h3').innerText,
                price: parseFloat(productBox.querySelector('.content .price').innerText.replace('$', '')),
                image: productBox.querySelector('.image img').src,
            };

            toggleFavorite(product); // Add or remove from favorites
            button.classList.toggle('active'); // Toggle the active class
        });
    });

    // Initialize favorites count on page load
    updateFavoritesCount();
});