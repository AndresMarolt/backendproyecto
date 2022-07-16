createProdTable = async (database, table) => {
    try {
        const exists = await database.schema.hasTable(table);
        if(!exists) {
            await database.schema.createTable(table, table => {
                table.increments('id').primary();
                table.string('title', 50).notNullable();
                table.string('thumbnail', 200).notNullable();
                table.integer('price').notNullable();
            })
        }
    } catch(err) {
        console.log(err);
    }
}

createChatTable = async (database, table) => {
    try {
        const exists = await database.schema.hasTable(table);
        if(!exists) {
            await database.schema.createTable(table, table => {
                table.string('email').notNullable();
                table.string('fecha', 50).notNullable();
                table.string('mensaje', 200).notNullable();
            })
        };
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    createProdTable,
    createChatTable
}