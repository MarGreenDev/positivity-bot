// import required node modules
const fs = require('node:fs');
const path = require('node:path');

// path to data directory and find config.json
const configPath = path.join(__dirname, '..', 'data', 'config.json');

// function that reads the config file and returns it as a javaScript object
function readConfig() {
    const configFile = fs.readFileSync(configPath, 'utf8')
    const serverConfig = JSON.parse(configFile);
    return serverConfig;
}

// writes the updated config object back to config.json
function writeConfig(obj) {
    const jsonString = JSON.stringify(obj, null, 2);
    fs.writeFileSync(configPath, jsonString, 'utf8');
}

// updates the channelId for a specific guild
function setChannel(guildId, channelId) {
    const updatedObj = readConfig();
    
    updatedObj[guildId] = { channelId: channelId }
    writeConfig(updatedObj);
}

module.exports = {
    readConfig,
    writeConfig,
    setChannel
};