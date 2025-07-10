const StoreInterface = require('./storeInterface')

class StoreMemory extends StoreInterface {
    
    add(service){ 
        return new Promise((resolve, reject) => {
            this.services.add(service)
            resolve(true)
        });
    }

    get(){ 
        return new Promise((resolve, reject) => {
            resolve(this.services)
        });
    }

}

module.exports = StoreMemory