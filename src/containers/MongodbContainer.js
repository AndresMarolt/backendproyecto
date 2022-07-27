import mongoose from 'mongoose'
import config from "../config.js";


await mongoose.connect(config.mongodb.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

class MongodbContainer {
    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema);
    }

    async get(id) {
        try {
            let doc;
            if(id) {
                doc = await this.collection.find({_id: id}, {__v: 0});
            } else {
                doc = await this.collection.find();
            }
            return doc;
        } catch(err) {
            console.log(err);
        }
    }

    async add(newItem) {
        try {
            const docum = new this.collection(newItem);
            await docum.save();
        } catch(err) {
            console.log(err);
        }
    }

    async update(id, updated) {
        try {
            await this.collection.updateOne({_id: id}, {
                $set: updated
            })
        } catch(err) {
            console.log(err);
        }
    }

    async delete(id) {
        try {
            await this.collection.deleteOne({_id: id});
        } catch(err) {
            console.log(err);
        }
    }
}

export default MongodbContainer;