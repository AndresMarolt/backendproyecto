import FirebaseContainer from "../../containers/FirebaseContainer.js";

class FirebaseProductDao extends FirebaseContainer {
    constructor() {
        super('productos');
    }
}

export default FirebaseProductDao;