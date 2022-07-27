import admin from 'firebase-admin'
import config from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

class FirebaseContainer {
    constructor(collectionName) {
        this.collection = db.collection(collectionName);
    }

    async get(id) {
        try {
            if(id) {
                const doc = await this.collection.doc(id).get();
                const data = doc.data();
                return { ...data, id };     // RETORNA UN OBJETO QUE TIENE TODA LA INFORMACION DE DATA Y EL ID
            } else {
                const docsSnapshot = await this.collection.get();
                const docs = docsSnapshot.docs;
                return docs;
            }
        } catch(err) {
            console.log(err);
        }
    }

    async add(newItem) {
        try {
            const docum = this.collection.doc();
            await docum.create(newItem);
        } catch(err) {
            console.log(err);
        }
    }

    async update(id, updated) {
        try {
            const docum = this.collection.doc(id);
            await docum.update(updated);
        } catch(err) {
            console.log(err);
        }
    }

    async delete(id) {
        try {
            const docum = this.collection.doc(id);
            await docum.delete();
        } catch(err) {
            console.log(err);
        }
    }
}

export default FirebaseContainer;