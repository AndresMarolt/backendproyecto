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

            console.log(cartObj);

            const cartProducts = cartObj.products;
            console.log(cartProducts);


        } catch(err) {
            console.log(err);
        }
    }

    async addCartProduct(cartId, product) {
        await this.collection.doc(cartId).update({
            products: admin.firestore.FieldValue.arrayUnion(product)
        })
    }
}

export default FirebaseCartDao;