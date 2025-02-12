// Данные меню
const menu = [
    { id: 1, name: "Пицца", price: 500 },
    { id: 2, name: "Бургер", price: 300 },
    { id: 3, name: "Салат", price: 200 },
    { id: 4, name: "Напиток", price: 100 },
];

// Функция для отображения меню
function renderMenu() {
    const menuContainer = document.getElementById('menu');
    menu.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <span>${item.name} - ${item.price} руб.</span>
            <button onclick="addToCart(${item.id})">Добавить</button>
        `;
        menuContainer.appendChild(menuItem);
    });
}

// Функция для добавления в корзину
function addToCart(itemId) {
    const item = menu.find(i => i.id === itemId);
    if (item) {
        cart.push(item);
        totalPrice += item.price;
        updateCart();
    }
}

// Функция для обновления корзины
let cart = [];
let totalPrice = 0;

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.name}</span><span>${item.price} руб.</span>`;
        cartItems.appendChild(li);
    });
    totalPriceElement.textContent = totalPrice;
}

// Инициализация
document.addEventListener('DOMContentLoaded', renderMenu);
document.getElementById('checkout-button').addEventListener('click', () => {
    alert(`Ваш заказ на сумму ${totalPrice} руб. оформлен!`);
    cart = [];
    totalPrice = 0;
    updateCart();
});
