const knex = require('knex')
const StoreMemory = require('./storeMemory')
const config = require('../config')
const schema = config.store.pg.schema || 'public'
const table = `${schema}.microservices`

class StorePg extends StoreMemory {
    
    constructor(){
        super()
        this.db = knex({
            client: 'pg', 
            connection: config.store.pg
        });
    }

    add(service){ 
        return new Promise(async (resolve, reject) => {
            try{
                await this.db(table).insert(service);
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
                this.services = await this.db(table).select('*');
                resolve(this.services)
            }catch(e){
                reject(e)
            }
        });
    }

    delete(service){ 
        return new Promise(async(resolve, reject) => {
            try{
                const deleted = await this.db(table).where(service).del();
                if(deleted) return super.delete(service)
                else resolve()    
            }catch(e){
                reject(e)
            }
        });
    }

}

module.exports = StorePg