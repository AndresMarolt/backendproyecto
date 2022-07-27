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
            console.log(cart);

            return cart;
        } catch(err) {
            console.log(err);
        }
    }

    async deleteCartProd(cartId, prodId) {
        const cart = await this.getProducts(cartId);
    }
}

export default MongodbCartDao;