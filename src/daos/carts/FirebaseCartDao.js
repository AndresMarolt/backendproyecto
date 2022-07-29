import FirebaseContainer from "../../containers/FirebaseContainer.js";
import admin from 'firebase-admin'

class FirebaseCartDao extends FirebaseContainer {
    constructor() {
        super('carritos')
    }

    async getProducts(cartId) {
        try {
            const cart = await this.collection.doc(cartId).get();
            let cartData = cart.data();
            let cartObj = {id: cartId, ...cartData}
            
            const cartProducts = cartObj.products;
            

            return cartProducts;
        } catch(err) {
            console.log(err);
        }
    }

    async addCartProduct(cartId, product) {
        try {
            await this.collection.doc(cartId).update({
                products: admin.firestore.FieldValue.arrayUnion(product)
            })
        } catch(err) {
            console.log(err);
        }
    }

    async deleteCartProd(cartId, product) {
        try {
            await this.collection.doc(cartId).update({
                products: admin.firestore.FieldValue.arrayRemove(product)
            })
        } catch(err) {
            console.log(err);
        }
    }
}

export default FirebaseCartDao;