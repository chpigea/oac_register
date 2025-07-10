const StorePg = require('./storePg')
const StoreMemory = require('./storeMemory')


class StoreFactory{

    static fromOptions(options){
        if(options.type == 'pg'){
            return new StorePg(options)
        }else{
            return new StoreMemory(options)
        }
    }

}

module.exports = StoreFactory