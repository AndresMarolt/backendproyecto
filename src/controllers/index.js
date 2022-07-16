class databaseHandler {
    constructor(ddbb, table) {
        this.ddbb = ddbb;
        this.table = table;
    }
    
    save = async obj => {
        try {
            await this.ddbb(this.table).insert(obj);
        } catch(err) {
            console.log(err);
        }
    }
    
    getAll = async () => {
        try {
            const elements = await this.ddbb.from(this.table).select('*');
            return elements;
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = databaseHandler;