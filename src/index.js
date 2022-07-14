class ddbbHandler {
    constructor(ddbb, table) {
        this.ddbb = ddbb;
        this.table = table;
    }

    render = async container => {
        try {
            const elements = await this.ddbb.from(this.table).select('*');          // TRAE TODOS LOS DATOS DE LA TABLA
            document.querySelector(`${container}`).innerHTML = "";
            elements.forEach(element => {
                const template = Handlebars.compile(plantilla);
                const html = template(element);
                document.querySelector(`${container}`).innerHTML += html;
            });
            console.log(`RENDERING: ${elements}`);
            this.ddbb.destroy();
        } catch(err) {
            console.log(err);
            this.ddbb.destroy();
        }
    }

    renderProducts = async () => {
        try {
            const products = await this.ddbb.from(this.table).select('*');          // TRAE TODOS LOS DATOS DE LA TABLA
            document.querySelector('#productos').innerHTML = "";
            products.forEach(product => {
                const template = Handlebars.compile(plantilla);
                const html = template(product);
                document.querySelector('#productos').innerHTML += html;
            });
            console.log(`RENDERING: ${products}`);
            this.ddbb.destroy();
        } catch(err) {
            console.log(err);
            this.ddbb.destroy();
        }
    }
    
    sendProduct = async () => {
        try {
            const title = titleInput.value;
            const price = priceInput.value;
            const thumbnail = thumbnailInput.value;
            console.log(`SENDING: ${title} - $${price} - ${thumbnail}`);
            
            socket.emit('client:product', {title, price, thumbnail});           // ENVIA AL SERVIDOR EL PRODUCTO INGRESADO 

            titleInput.value = "";
            priceInput.value = "";
            thumbnailInput.value = "";
        } catch(err) {
            console.log(`Hubo un error: ${err}`);
        }
    }

    
    
    renderMessages = async () => {
        try {
            const messages = await this.ddbb.from(this.table).select('*');
            document.querySelector('#chat-container').innerHTML = "";
            messages.forEach(message => {
                const template = Handlebars.compile(plantilla);
                const html = template(message);
                document.querySelector('#chat-container').innerHTML += html;
            });
            this.ddbb.destroy();
        } catch(err) {
            console.log(`Hubo un error: ${err}`);
            this.ddbb.destroy();
        }
    }
    
    sendMessage = async () => {
        try {
            const email = emailInput.value;
            const fecha = new Date().toLocaleString();
            const mensaje = mensajeInput.value;
            
            console.log(mensaje);
    
            socket.emit('client:message', {email, fecha, mensaje});
            mensaje.value = "";
        } catch(err) {
            console.log(`Hubo un error: ${err}`);
        }
    }
}

module.exports = {
    ddbbHandler: ddbbHandler
}