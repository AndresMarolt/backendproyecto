import MongodbContainer from "../../containers/MongodbContainer.js";

class MongodbProductDao extends MongodbContainer {
    constructor() {
        super('productos', {
            timestamp: { type: Date, required: true },
            title: {type: String, required: true},
            description: {type: String},
            serialNumber: {type: String},
            thumbnail: {type: String},
            price: {type: Number, required: true},
            stock: {type: Number, required: true}
        })
    }
}

export default MongodbProductDao;