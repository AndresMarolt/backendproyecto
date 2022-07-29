import MongodbContainer from "../../containers/MongodbContainer.js";

class MongodbCartDao extends MongodbContainer {
    constructor() {
        super('carritos', {
            timestamp: { type: Date, required: true },
            products: { type: Array, required: true }
        })
    }

    async addCartProduct(cartId, product) {
        try {
            const data = {...product};
            await this.collection.updateOne({_id: cartId}, {
                $push: {products: data}
            });
        } catch(err) {
            console.log(err);
        }
    }

    async getProducts(cartId) {
        try {
            let cart = await this.collection.find({_id: cartId}, {__v: 0, _id: 0, timestamp: 0});
            return cart[0].products;
        } catch(err) {
            console.log(err);
        }
    }
    
    async deleteCartProd(cartId, product) {
        try {
            await this.collection.updateMany({id: cartId}, {
                $pullAll: { 
                    products: [{id: product[0].id}] 
                }
            })
        } catch(err) {
            console.log(err);
        } 
    }
}

export default MongodbCartDao;