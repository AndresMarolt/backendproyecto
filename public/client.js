const socket = io();

const form = document.querySelector('#productForm');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const thumbnailInput = document.querySelector('#thumbnail');
const container = document.querySelector('#productos');

// =================
const formChat = document.querySelector('#form-chat');
const emailInput = document.querySelector('#email')
const mensajeInput = document.querySelector('#mensaje')
const chatContainer = document.querySelector('#chat-container');


//============= PRODUCTOS

socket.on('server:products', async products => {
    try {
        const response = await fetch('./plantilla.hbs');
        const plantilla = await response.text();
        render(container, plantilla, products);
        container.classList.contains('d-none') && container.classList.remove('d-none');
    } catch(err) {
        console.log(err);
    }
})

form.addEventListener('submit', event => {
    event.preventDefault();
    sendProduct();
})

//============= CHAT

socket.on('server:messages', async messages => {
    try {
        const response = await fetch('./plantilla-chat.hbs');
        const plantilla = await response.text();
        render(chatContainer, plantilla, messages);
    } catch(err) {
        console.log(err);
    }
})

formChat.addEventListener('submit', event => {
    event.preventDefault();
    sendMessage();
})

// ===========================================

const render = async (container, plantilla, elements) => {
    try {
        container.innerHTML = "";
        if(elements.length > 0) {
            elements.forEach(element => {
                const template = Handlebars.compile(plantilla);
                const html = template(element);
                container.innerHTML += html;
            });
        }
    } catch(err) {
        console.log(err);
    }
}

const sendProduct = async () => {
    try {
        const title = titleInput.value;
        const price = priceInput.value;
        const thumbnail = thumbnailInput.value;
        
        socket.emit('client:product', {title, price, thumbnail});           // ENVIA AL SERVIDOR EL PRODUCTO INGRESADO 

        titleInput.value = "";
        priceInput.value = "";
        thumbnailInput.value = "";
    } catch(err) {
        console.log(`Hubo un error: ${err}`);
    }
}

const sendMessage = async () => {
    try {
        const email = emailInput.value;
        const fecha = new Date().toLocaleString();
        const mensaje = mensajeInput.value;
        socket.emit('client:message', {email, fecha, mensaje});
        mensaje.value = "";
    } catch(err) {
        console.log(`Hubo un error: ${err}`);
    }
}