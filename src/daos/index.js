import dotenv from 'dotenv'
dotenv.config();

let ProductDao
let CartDao

switch (process.env.DATABASE) {
    case 'firebase':
        const { default: FirebaseProductDao } = await import('./products/FirebaseProductDao.js');
        const { default: FirebaseCartDao } = await import('./carts/FirebaseCartDao.js')
        ProductDao = FirebaseProductDao;
        CartDao = FirebaseCartDao;
        break;

    case 'mongodb':
        const { default: MongodbProductDao } = await import('./products/MongodbProductDao.js');
        const { default: MongodbCartDao } = await import('./carts/MongodbCartDao.js');
        ProductDao = MongodbProductDao;
        CartDao = MongodbCartDao;
        break;
        
        default:
            break;
        }
        
        export default {ProductDao, CartDao}