import FirebaseContainer from "../../containers/FirebaseContainer.js";

class FirebaseCartDao extends FirebaseContainer {
    constructor() {
        super('carritos')
    }
}

export default FirebaseCartDao;