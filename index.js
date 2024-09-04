// Lista de productos con imágenes
const products = [
    { id: 1, name: 'Tarta de Chocolate', price: 30.00, imgSrc: 'img/11.jpeg', description: 'Una deliciosa tarta de chocolate hecha con los ingredientes más finos, perfecta para cualquier ocasión.' },
    { id: 2, name: 'Cupcake de Chocolate y Fresas', price: 3.00, imgSrc: 'img/5.jpeg', description: 'Cupcake esponjoso de chocolate cubierto con un glaseado de fresas frescas.' },
    { id: 3, name: 'Galleta Decorada', price: 2.50, imgSrc: 'img/1.jpeg', description: 'Galletas artesanales decoradas a mano, ideales para regalar o disfrutar con un café.' },
    { id: 4, name: 'Tarta Personalizada', price: 50.00, imgSrc: 'img/44.png', description: 'Una tarta que puedes personalizar a tu gusto, perfecta para cumpleaños y celebraciones.' },
    { id: 5, name: 'Tarta de Zanahoria', price: 25.00, imgSrc: 'img/55.png', description: 'Tarta clásica de zanahoria, húmeda y llena de sabor, cubierta con un glaseado de queso crema.' },
    { id: 6, name: 'Galletas Decoradas', price: 2.50, imgSrc: 'img/2.jpeg', description: 'Galletas decoradas con glaseado real, disponibles en diferentes formas y colores.' },
    { id: 7, name: 'Cupcake de Unicornio', price: 25.00, imgSrc: 'img/11.png', description: 'Cupcakes mágicos con decoraciones de unicornio, ideales para fiestas infantiles.' },
    { id: 8, name: 'Cupcakes Personalizados', price: 3.50, imgSrc: 'img/c.png', description: 'Cupcakes que puedes personalizar con mensajes, colores y decoraciones especiales.' },
    { id: 9, name: 'Tarta de Frutas', price: 50.00, imgSrc: 'img/22.png', description: 'Tarta fresca de frutas, perfecta para disfrutar en días calurosos, con una base crujiente y un toque de crema.' }
];

// Inicializa el carrito
let cart = [];

// Función para mostrar productos
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-md-4 mb-4';
        productDiv.innerHTML = `
            <div class="card">
                <img src="${product.imgSrc}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text font-weight-bold">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al Carrito</button>
                </div>
            </div>
        `;
        productList.appendChild(productDiv);
    });
}


// Función para agregar productos al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        cartItem.innerHTML = `
            ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <div>
                <button class="btn btn-secondary btn-sm mr-2" onclick="changeQuantity(${item.id}, -1)">-</button>
                <button class="btn btn-secondary btn-sm" onclick="changeQuantity(${item.id}, 1)">+</button>
                <button class="btn btn-danger btn-sm ml-3" onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        `;
        cartItems.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = total.toFixed(2);
}

// Función para cambiar la cantidad de un producto en el carrito
function changeQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Función para eliminar productos del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Función para manejar la compra
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Tu carrito se vaciará.");
        return;
    }

    alert(`El total es $${document.getElementById('total-price').textContent}.`);
    cart = [];
    updateCart();
});
const validCoupons = {
    'DULCE10': 0.10,
    'DULCE20': 0.20,
    'DULCE30': 0.30
};

let discount = 0;

function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.toUpperCase();
    if (validCoupons[couponCode] !== undefined) {
        discount = validCoupons[couponCode];
        alert(`Cupón aplicado: ${couponCode} - ${discount * 100}% de descuento`);
    } else {
        alert('Cupón inválido');
        discount = 0;
    }
    updateCart();
}
//Agregar un Popup de Confirmación de Compra
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        cartItem.innerHTML = `
            ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        cartItems.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    total = total * (1 - discount);
    totalPriceElement.textContent = total.toFixed(2);
}
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('¡Gracias por tu compra! Recibirás un correo de confirmación pronto.');
        cart = [];
        updateCart();
    } else {
        alert('Tu carrito está vacío.');
    }
});
document.getElementById('toggle-theme').addEventListener('click', () => {
    const bodyElement = document.body;
    const currentTheme = bodyElement.getAttribute('data-theme');
    const toggleButtonText = document.querySelector('.toggle-text');

    if (currentTheme === 'dark') {
        bodyElement.removeAttribute('data-theme');
        toggleButtonText.textContent = 'Modo Oscuro';
    } else {
        bodyElement.setAttribute('data-theme', 'dark');
        toggleButtonText.textContent = 'Modo Claro';
    }
});



// Inicializar la tienda al cargar la página
document.addEventListener('DOMContentLoaded', displayProducts);

