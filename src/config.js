// config.js
const path = require('path');
const fs = require('fs');

function loadConfig() {
  const env = process.env.NODE_ENV || 'development';
  const configFolder = process.env.OAC_CONFIG_FOLDER || __dirname;
  const configPath = path.join(configFolder, 'config', `${env}.json`);
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  config.store.pg.user = process.env.OAC_DB_USER || config.store.pg.user;
  config.store.pg.password = process.env.OAC_DB_PASSWORD || config.store.pg.password;

  return config;
}

module.exports = loadConfig();