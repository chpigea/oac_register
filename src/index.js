// register.js
const express = require("express");
const app = express();
const config = require('./config.js');
const StoreFactory = require("./models/storeFactory.js");
app.use(express.json());

const store = StoreFactory.fromOptions(config.store)
store.get().then((services)=>{
    console.log(services)
}).catch((e) => {
  console.log(`Error: ${e}`);
})

app.post("/register", (req, res) => {
  const { name, host, port } = req.body;

  store.add({ name, host, port, protocol: 'http' }).then((status) => {
    console.log(`Registered service '${name}' at ${host}:${port}`);
    res.json({ message: "Registered successfully" });
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