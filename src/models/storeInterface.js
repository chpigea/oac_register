class StoreInterface{
    constructor(){
        this.services = []
    }
    add(service){ 
        return new Promise((resolve, reject) => {
            reject(new Error('Metod <add> not implemented yet'))
        });
    }
    get(){ 
        return new Promise((resolve, reject) => {
            reject(new Error('Metod <get> not implemented yet'))
        }); 
    }
}

module.exports = StoreInterface
