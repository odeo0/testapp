// Данные меню
const menu = [
    { id: 1, name: "Пицца", price: 500 },
    { id: 2, name: "Бургер", price: 300 },
    { id: 3, name: "Салат", price: 200 },
    { id: 4, name: "Напиток", price: 100 },
];

// Корзина
let cart = [];
let totalPrice = 0;

// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

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

// Функция для оформления заказа
function checkout() {
    const message = `Ваш заказ:\n${cart.map(item => `- ${item.name}: ${item.price} руб.`).join('\n')}\nИтого: ${totalPrice} руб.`;
    tg.sendData(message); // Отправка данных в Telegram
    tg.close(); // Закрытие мини-приложения
}

// Инициализация
document.getElementById('checkout-button').addEventListener('click', checkout);
renderMenu();