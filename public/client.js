const socket = io();

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
const chatCotainer = document.querySelector('#chat-container');


const renderProducts = async products => {
    try {
        const response = await fetch('./plantilla.hbs');
        const plantilla = await response.text();
        document.querySelector('#productos').innerHTML = "";
        products.forEach(product => {
            const template = Handlebars.compile(plantilla);
            const html = template(product);
            document.querySelector('#productos').innerHTML += html;
        });
    } catch(err) {
        console.log(`Hubo un error: ${err}`);
    }
}

const sendProduct = () => {
    try {
        const title = titleInput.value;
        const price = priceInput.value;
        const thumbnail = thumbnailInput.value;

        socket.emit('client:product', {title, price, thumbnail});           // ENVIA AL SERVIDOR EL PRODUCTO INGRESADO 
    } catch(err) {
        console.log(`Hubo un error: ${err}`);
    }
}

const renderMessages = async messages => {
    try {
        const response = await fetch('./plantilla-chat.hbs');
        const plantilla = await response.text();
        document.querySelector('#chat-container').innerHTML = "";
        messages.forEach(message => {
            const template = Handlebars.compile(plantilla);
            const html = template(message);
            document.querySelector('#chat-container').innerHTML += html;
        });
    } catch(err) {
        console.log(`Hubo un error: ${err}`);
    }
}

const sendMessage = () => {
    try {
        const email = emailInput.value;
        let fecha = new Date();
        fecha = fecha.toLocaleString();
        const mensaje = mensajeInput.value;

        console.log(mensaje);

        socket.emit('client:message', {email, fecha, mensaje});           // ENVIA AL SERVIDOR EL PRODUCTO INGRESADO 
    } catch(err) {
        console.log(`Hubo un error: ${err}`);
    }
}



socket.on('server:products', products => {      // RECIBE EL ENVÍO DE LOS PRODUCTOS DESDE EL SERVIDOR
    renderProducts(products);
    container.classList.contains('d-none') && container.classList.remove('d-none');
})

form.addEventListener('submit', event => {
    event.preventDefault();
    sendProduct();
    titleInput.value = "";
    priceInput.value = "";
    thumbnailInput.value = "";
})


socket.on('server:messages', messages => {
    renderMessages(messages);
})

formChat.addEventListener('submit', event => {
    event.preventDefault();
    sendMessage();
    mensaje.value = "";
})
