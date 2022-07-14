const fs = require('fs');
const path = require('path');
const pathProductos = path.join(__dirname, '../persistenceTextFiles/productos');
const pathCarritos = path.join(__dirname, '../persistenceTextFiles/carritos');
const { productDatabase, chatDatabase } = require('./ddbb');

class ProductsHandler {
    constructor(ddbb, table) {
        this.table = table;
        this.database = ddbb;
    }

    async getProd(req, res) {
        try {
            // TRAER PRODUCTOS DE LA BBDD:
            let products = await this.database.from(this.table).select('*');
            // ===========================
            let id = Number(req.params.id); 

            if(id) {
                const aBuscar = products.find(prod => prod.id == id);
                res.status(200).json(aBuscar);
            } else {
                res.status(200).json(products);
            }

        } catch(err) {
            res.status(502).json({error: 502, descripcion: `${err}`});
        }
    }

    async addProd(req, res) {
        try{

            let existe = await this.database.hasTable(this.table);
            let products;

            const { title, thumbnail, stock, description, serialNumber } = req.body;
            const price = Number(req.body.price);
            let id = products.length + 1;
            let timestamp = Date.now();
            const newProd = { id, title, price, thumbnail, stock, description, serialNumber, timestamp }

            if(!existe) {
                await this.database.schema.createTable(this.table, table => {
                    table.increments('id').primary();
                    table.string('title', 100).notNullable();
                    table.string('thumbnail', 100).notNullable();
                    table.string('description', 100);
                    table.string('timestamp', 50);
                    table.integer('price').notNullable();
                    table.integer('stock');
                    table.integer('serialNumber');
                })
            }
            
            await this.database(this.table).insert(newProd);            

            this.database.destroy();
            res.status(201).json('Producto agregado correctamente a la BBDD');
        } catch(err) {
            this.database.destroy();
            res.status(502).json({error: 502, descripcion: `${err}`});
        }
    }

    async updateProd(req, res) {
        try {
            let productsString = await fs.promises.readFile(pathProductos, 'utf-8');
            let productsObj = JSON.parse(productsString);
            console.log(productsObj);
            let id = Number(req.params.id);
            const { title, price, thumbnail, stock, description, serialNumber, timestamp } = req.body;
            let aModificar = productsObj.find(prod => {
                return prod.id === id;
            })
            if(aModificar) {
                aModificar.title = title;
                aModificar.price = price;
                aModificar.thumbnail = thumbnail;
                aModificar.timestamp = timestamp;
                aModificar.stock = stock;
                aModificar.serialNumber = serialNumber;
                aModificar.description = description;

                productsString = JSON.stringify(productsObj);
                await fs.promises.writeFile(pathProductos, productsString);
                res.status(201).json('Actualizado correctamente');
            } else {
                res.status(404).json({error: 404, descripcion: 'Producto no encontrado'});
            }
        } catch(err) {
            res.status(502).json({error: 502, descripcion: `${err}`});
        }
    }

    async deleteProd(req, res) {
        try {
            let productsString = await fs.promises.readFile(pathProductos, 'utf-8');
            let productsObj = JSON.parse(productsString);

            let id = Number(req.params.id);
            let aEliminar = productsObj.find(prod => {
                return prod.id == id;
            })
            if(aEliminar) {
                const index = productsObj.indexOf(aEliminar);
                if(index > -1) {
                    productsObj.splice(index, 1);
                    productsString = JSON.stringify(productsObj);
                    await fs.promises.writeFile(pathProductos, productsString)
                    res.status(200).json('Producto eliminado correctamente');
                }
            } else {
                res.status(404).json({error: 404, descripcion: 'Producto no encontrado'});
            }
        } catch(err) {
            res.status(502).json({error: 502, descripcion: `${err}`});
        }
    }
}

// ==================================================================================================================================
// ==================================================================================================================================
// ==================================================================================================================================
// ==================================================================================================================================
// ==================================================================================================================================
// ==================================================================================================================================
// ==================================================================================================================================
// ==================================================================================================================================
// ==================================================================================================================================
// ==================================================================================================================================
// ==================================================================================================================================

class CartHandler {

    async createCart(req, res) {
        try{
            let existe;
            fs.existsSync(pathCarritos) ? existe=true : existe=false;

            let cartsString;
            let cartsObj;
            if(existe) {
                cartsString = await fs.promises.readFile(pathCarritos, 'utf-8');
                cartsObj = JSON.parse(cartsString);
            } else {
                cartsObj = [];
            }

            const id = cartsObj.length + 1;
            const carrito = {
                id: id,
                timestamp: Date.now(),
                productos: []
            }

            cartsObj.push(carrito);
            
            cartsString = JSON.stringify(cartsObj);
            await fs.promises.writeFile(pathCarritos, cartsString);

            res.status(201).json(carrito.id);
        } catch(err) {
            res.status(502).json({error: 502, descripcion: `${err}`})
        }
    }

    async deleteCart(req, res) {
        try {
            let cartsString = await fs.promises.readFile(pathCarritos, 'utf-8');
            let cartsObj = JSON.parse(cartsString); 

            let id = Number(req.params.id);
            let aEliminar = cartsObj.find(prod => {
                return prod.id == id;
            })
            if(aEliminar) {
                const index = cartsObj.indexOf(aEliminar);
                if(index > -1) {
                    cartsObj.splice(index, 1);
                    cartsString = JSON.stringify(cartsObj);
                    await fs.promises.writeFile(pathCarritos, cartsString);
                    res.status(200).json('Carrito eliminado correctamente!');
                }
            } else {
                res.status(404).json({error: 'Carrito no encontrado'});
            }
        } catch(err) {
            res.status(502).json({error: 502, descripcion: `${err}`});
        }
    }

    async getCartProducts(req, res) {
        try {
            let cartsString = await fs.promises.readFile(pathCarritos, 'utf-8');
            let cartsObj = JSON.parse(cartsString);

            let id = Number(req.params.id);
            let carritoBuscado = cartsObj.find(prod => {
                return prod.id == id;
            })
            if(carritoBuscado) {
                res.status(200).json(carritoBuscado.productos);
            } else {
                res.status(404).json({error: 'Carrito no encontrado'})
            }
        } catch(err) {
            res.status(502).json({error: 502, descripcion: `${err}`});
        }
    }

    async addCartProduct(req, res) {
        try {
            let cartsString = await fs.promises.readFile(pathCarritos, 'utf-8');
            let cartsObj = JSON.parse(cartsString);
            let productsString = await fs.promises.readFile(pathProductos, 'utf-8');
            let productsObj = JSON.parse(productsString);

            let cartId = Number(req.params.id);
            let carrito = cartsObj.find(cart => cart.id == cartId);
            if(!carrito) {
                res.status(404).json('No se encontró ningún carrito con el ID especificado');
            }

            let id = Number(req.body.id);
            const prodAgregado = productsObj.find(prod => prod.id == id);
            if(prodAgregado) {
                carrito.productos.push(prodAgregado);
                cartsString = JSON.stringify(cartsObj);
                await fs.promises.writeFile(pathCarritos, cartsString);
                res.status(201).json('Producto agregado al carrito con éxito');
            } else {
                res.status(404).json('No se encontró el producto');
            }
        } catch(err) {
            res.status(502).json({error: 502, descripcion: `${err}`});
        }
    }

    async deleteCartProduct(req, res) {
        try {
            let cartsString = await fs.promises.readFile(pathCarritos, 'utf-8');
            let cartsObj = JSON.parse(cartsString);

            const { id, id_prod } = req.params;
            const carrito = cartsObj.find(cart => cart.id == id);
            if(carrito) {
                const prodBuscado = carrito.productos.find(prod => prod.id == id_prod);
                if(prodBuscado) {
                    const index = carrito.productos.indexOf(prodBuscado);
                    if(index > -1) {
                        carrito.productos.splice(index, 1);
                        cartsString = JSON.stringify(cartsObj);
                        await fs.promises.writeFile(pathCarritos, cartsString);
                        res.status(200).json('Eliminado correctamente');
                    }
                } else {
                    res.status(404).json('El producto que intenta eliminar no existe en el carrito especificado');
                }
            } else {
                res.status(404).json('El carrito especificado no existe');
            }
        } catch(err) {
            res.status(502).json({error: 502, descripcion: `${err}`});
        }
    }
}

module.exports = {
    CartHandler: CartHandler,
    adminMiddleware,
    ProductsHandler: ProductsHandler
}