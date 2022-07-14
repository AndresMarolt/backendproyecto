const knex = require('knex');

const configSQLite3 = {
    client: 'sqlite3',
    connection: {
        filename: './db/chatsLog.sqlite'
    },
    useNullAsDefault: true
}

const configMariaDB = {
        client: 'mysql',
        connection: {
              host: '127.0.0.1',
              user: 'root',
              password: '',
              database: 'ecommerce'
            },
            pool: { min: 0, max: 7 }
}

const chatDatabase = knex(configSQLite3);
const productDatabase = knex(configMariaDB);

module.exports = {
    productDatabase,
    chatDatabase
}