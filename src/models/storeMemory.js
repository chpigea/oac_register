const StoreInterface = require('./storeInterface')

class StoreMemory extends StoreInterface {
    
    add(service){ 
        return new Promise((resolve, reject) => {
            this.services.push(service)
            console.log(this.services)
            resolve(true)
        });
    }

    get(){ 
        return new Promise((resolve, reject) => {
            console.log(this.services)
            resolve(this.services)
        });
    }

    delete(service){ 
        return new Promise((resolve, reject) => {
            this.services = this.services.filter(item => !(
                (item.protocol === service.protocol) && 
                (item.host === service.host) &&
                (item.port === service.port) &&
                (item.name === service.name)
            ));
            console.log(this.services)
            resolve()
        });
    }

}

module.exports = StoreMemory