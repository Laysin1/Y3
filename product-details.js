document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // Get product ID from URL

    // Sample product data (replace with your actual data or fetch from an API)
    const products = [
        {
            id: "1",
            name: "Blue Hoodie",
            price: 12.99,
            image: "Photo/Blue Hoodie.jpg",
            description: "A comfortable and stylish blue hoodie made from premium cotton. Perfect for casual outings."
        },
        {
            id: "2",
            name: "Cropped Hoodie",
            price: 12.99,
            image: "Photo/Cropped Hoodie.jpg",
            description: "A trendy cropped hoodie for a modern look. Available in various colors."
        },
        {
            id: "3",
            name: "Loose Fit Printed sweatshirt",
            price: 12.99,
            image: "Photo/Loose Fit Printed sweatshirt 1.jpg",
            description: "A loose-fit sweatshirt with a printed design, perfect for a casual look."
        },
        {
            id: "4",
            name: "EMBROIDERED SEERSUCKER SHIRT",
            price: 9.99,
            image: "Photo/EMBROIDERED SEERSUCKER SHIRT.jpg",
            description: "A stylish embroidered shirt made from seersucker fabric."
        },
        {
            id: "5",
            name: "Short Sleeves Shirt",
            price: 9.99,
            image: "Photo/Short Sleeves Shirt.jpg",
            description: "A short-sleeve shirt, perfect for summer."
        },
        {
            id: "6",
            name: "V-Neck T-Shirt",
            price: 9.99,
            image: "Photo/V-Neck T-Shirt.jpg",
            description: "A classic V-neck T-shirt, great for everyday wear."
        },
        {
            id: "7",
            name: "comfort trousers",
            price: 7.99,
            image: "Photo/comfortt trosers.jpg",
            description: "Comfortable trousers for a relaxed fit."
        },
        {
            id: "8",
            name: "jooger trousers",
            price: 7.99,
            image: "Photo/jooger troussers.jpg",
            description: "Stylish jogger trousers for a casual look."
        },
        {
            id: "9",
            name: "wide fit pleated",
            price: 7.99,
            image: "Photo/wide fit pleated.jpg",
            description: "Wide-fit pleated trousers for a modern style."
        },
        {
            id: "10",
            name: "Belted bouclé dress",
            price: 13.99,
            image: "Photo/Belted bouclé dress.png",
            description: "A stylish belted dress made from bouclé fabric."
        },
        {
            id: "11",
            name: "Bodycon Dress",
            price: 13.99,
            image: "Photo/Bodycon Dress.jpg",
            description: "A bodycon dress that hugs your curves perfectly."
        },
        {
            id: "12",
            name: "Draped bodycon dress",
            price: 13.99,
            image: "Photo/Draped bodycon dress.png",
            description: "A draped bodycon dress for a chic look."
        },
        {
            id: "13",
            name: "Baggy Regular Jeans",
            price: 12.99,
            image: "Photo/Baggy Regular Jeans.png",
            description: "Baggy regular jeans for a relaxed fit."
        },
        {
            id: "14",
            name: "Barrel Low Cargo Jeans",
            price: 12.99,
            image: "Photo/Barrel Low Cargo Jeans.png",
            description: "Barrel low cargo jeans with a trendy design."
        },
        {
            id: "15",
            name: "Wide belted trousers - B",
            price: 12.99,
            image: "Photo/Wide belted trousers - B.png",
            description: "Wide belted trousers for a stylish look."
        },
        {
            id: "16",
            name: "Cinched Button Up Crop Shirt",
            price: 12.99,
            image: "Photo/Cinched Button Up Crop Shirt.jpg",
            description: "A cinched button-up crop shirt for a trendy look."
        },
        {
            id: "17",
            name: "Balloon-Sleeved Blouse",
            price: 12.99,
            image: "Photo/Balloon-Sleeved Blouse.png",
            description: "A balloon-sleeved blouse for a feminine touch."
        },
        {
            id: "18",
            name: "Floral Printed Shirt",
            price: 12.99,
            image: "Photo/Floral Printed Shirt.jpg",
            description: "A floral printed shirt for a fresh look."
        }
    ];

    // Find the product by ID
    const product = products.find(p => p.id === productId);

    if (product) {
        // Update the product details on the page
        document.getElementById('productImage').src = product.image;
        document.getElementById('productName').innerText = product.name;
        document.getElementById('productPrice').innerHTML = `$${product.price.toFixed(2)}`;
        document.getElementById('productDescription').innerText = product.description;

        // Add to cart functionality
        const addToCartBtn = document.getElementById('addToCartBtn');
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantity').value);
            addToCart(product, quantity);
        });
    } else {
        // Redirect to 404 page or show an error message
        window.location.href = 'index.html';
    }
       // Back Button Functionality
       const backButton = document.getElementById('backButton');
       backButton.addEventListener('click', () => {
           window.history.back(); // Go back to the previous page
       });
    // Function to add product to cart
    function addToCart(product, quantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += quantity; // Increase quantity if product already exists
        } else {
            // Add new product to cart
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    // Function to update cart count
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.icons span').innerText = totalQuantity;
    }
});