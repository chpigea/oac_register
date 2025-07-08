// register.js
const express = require("express");
const app = express();
app.use(express.json());

const services = {}; // { name: { host, port } }

app.post("/register", (req, res) => {
  const { name, host, port } = req.body;
  services[name] = { host, port };
  console.log(`Registered service '${name}' at ${host}:${port}`);
  res.json({ message: "Registered successfully" });
});

app.get("/services", (req, res) => {
  res.json(services);
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Register service listening on port ${PORT}`);
});

