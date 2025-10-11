#!/usr/bin/env node
const express = require("express");
const axios = require("axios");
const app = express();
const config = require('./config.js');
const StoreFactory = require("./models/storeFactory.js");
app.use(express.json());

const store = StoreFactory.fromOptions(config.store)

const checkService = async function(service){
  let { protocol, host, port, name } = service
  let url = `${protocol}://${host}:${port}/${name}/health`
  console.log(`HEALTH CHECK  => ${url}`)
  let health = false
  try{
    const response = await axios({
        method: "GET", url
    })
    if(response.status === 200){
      health = true
    }
  }catch(e){
    console.log(`${url} => NOT RESPONDING!`)
  }
  if(!health) await store.delete(service)
}

const healthCheck = async function(){
  console.log(`PERIODICAL HEALTH CHECK...`)
  let services = store.services
  for(let i=0; i<services.length; i++){
    await checkService(services[i])
  }
}

store.get().then((services)=>{
    setInterval(healthCheck, config.check_every * 1000)
    healthCheck()
}).catch((e) => {
  console.log(`Error: ${e}`);
})

app.post("/register", (req, res) => {
  const { name, host, port } = req.body;

  store.add({ name, host, port, protocol: 'http' }).then((status) => {
    if(status){
      console.log(`Registered service '${name}' at ${host}:${port}`);
      res.json({ message: "Registered successfully" });
    }else{
      res.status(500).json({ message: `Status is false` });
    }
  }).catch((e) => {
    console.log(`Error: ${e}`);
    res.status(500).json({ message: `Error: ${e}` });
  })
  
});

app.get("/services", (req, res) => {
  store.get().then((services)=>{
    res.json(services);
  }).catch((e) => {
    console.log(`Error: ${e}`);
    res.status(500).json({ message: `Error: ${e}` });
  })
});

const PORT = config.port || 4001;
app.listen(PORT, () => {
  console.log(`Register service listening on port ${PORT}`);
});