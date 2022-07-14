const socket = io();
const ddbbHandler = require('../src/index');

const form = document.querySelector('#productForm');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const thumbnailInput = document.querySelector('#thumbnail');
const container = document.querySelector('#productos');
const containerHeading = document.querySelector('#tableHeading');

// =================
const formChat = document.querySelector('#form-chat');
const emailInput = document.querySelector('#email')
const mensajeInput = document.querySelector('#mensaje')
const chatContainer = document.querySelector('#chat-container');

const productHandler = new ddbbHandler('ecommerce', 'product');
const chatHandler = new ddbbHandler('logs', 'chat');


//============= PRODUCTOS

socket.on('server:products', () => {
    productHandler.render('#productos');
    container.classList.contains('d-none') && container.classList.remove('d-none');
})

form.addEventListener('submit', event => {
    event.preventDefault();
    productHandler.sendProducts();
})

//============= CHAT

socket.on('server:messages', () => {
    chatHandler.render('#chat-container');
})

formChat.addEventListener('submit', event => {
    event.preventDefault();
    chatHandler.sendMessage();
})

