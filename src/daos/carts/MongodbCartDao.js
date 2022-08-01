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
            await this.collection.updateOne({_id: cartId}, {
                $push: {products: product}
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
    
    async deleteCartProd(cartId, prodId) {
        try {
            let deletedProd = await this.collection.findByIdAndUpdate(cartId, {
                $pull: {
                    products: {id: prodId}
                }
            });
            return deletedProd;
        } catch(err) {
            console.log(err);
        } 
    }
}

export default MongodbCartDao;