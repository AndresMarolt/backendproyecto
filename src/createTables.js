createProdTable = async (database, table) => {
    try {
        if(!database.schema.hasTable(table)) {
            await database.schema.createTable(table, table => {
                table.increments('id').primary();
                table.string('title', 50).notNullable();
                table.string('thumbnail', 100).notNullable();
                table.integer('price').notNullable();
            })
            console.log('Tabla de productos creada!');        
        }
    } catch(err) {
        console.log(err);
    } finally {
        database.destroy();
    }
}

createChatTable = async (database, table) => {
    try {
        if(!database.schema.hasTable(table)) {
            await database.schema.createTable(table, table => {
                table.string('email').notNullable();
                table.string('fecha', 50).notNullable();
                table.string('mensaje', 200).notNullable();
            })
            console.log('Tabla de productos creada!');        
        };
    } catch(err) {
        console.log(err);
    } finally {
        database.destroy();
    }
}

module.exports = {
    createProdTable,
    createChatTable
}