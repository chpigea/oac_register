const knex = require('knex')
const StoreMemory = require('./storeMemory')
const { db, schema } = require('./db')
const table = `${schema}.microservices`

class StorePg extends StoreMemory {
    
    constructor(){
        super()
    }

    add(service){ 
        return new Promise(async (resolve, reject) => {
            try{
                await db(table).insert(service);
                return super.add(service)
            }catch(e){
                if(e.message.includes('microservices_uq'))
                    resolve(true)
                else
                    reject(e)
            }
        });
    }

    get(){ 
        return new Promise(async (resolve, reject) => {
            try{
                this.services = await db(table).select('*');
                resolve(this.services)
            }catch(e){
                reject(e)
            }
        });
    }

    delete(service){ 
        return new Promise(async(resolve, reject) => {
            try{
                const deleted = await db(table).where(service).del();
                if(deleted) return super.delete(service)
                else resolve()    
            }catch(e){
                reject(e)
            }
        });
    }

}

module.exports = StorePg