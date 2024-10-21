// Store user information in a variable
let userName = "";
const cart = [];

// Array of product objects
const products = [
    { name: 'Laptop', stock: 5 },
    { name: 'Phone', stock: 10 },
    { name: 'Tablet', stock: 2 },
];

// Display the available products
const productList = document.getElementById('product-list');
products.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `${product.name} - ${product.stock} in stock`;
    productList.appendChild(li);
});

// Save the user name
function saveUserName() {
    const input = document.getElementById('username').value;
    if (input) {
        userName = input;
        alert(`Hello, ${userName}! Start shopping.`);
    } else {
        alert('Please enter your name.');
    }
}

// Add products to the cart
function addToCart() {
    const productName = document.getElementById('product-name').value;
    const product = products.find(p => p.name.toLowerCase() === productName.toLowerCase());

    if (product) {
        cart.push(product);
        updateCartDisplay();
    } else {
        alert('Product not found!');
    }
}

// Update cart display
function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Clear existing list
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name}`;
        cartList.appendChild(li);
    });
}

// Asynchronous function to simulate checking stock availability
async function checkStock() {
    const stockMessage = document.getElementById('stock-message');
    stockMessage.textContent = "Checking stock...";

    try {
        const result = await checkStockAvailability();
        stockMessage.textContent = result;
    } catch (error) {
        stockMessage.textContent = "Error checking stock.";
    }
}

// Simulate a delay using a Promise to check stock asynchronously
function checkStockAvailability() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (cart.length > 0) {
                resolve("All products in your cart are in stock.");
            } else {
                reject("Your cart is empty, add items to check stock.");
            }
        }, 2000);
    });
}
