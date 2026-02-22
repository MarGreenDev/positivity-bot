// Import required Discord.js utilities and Node.js modules
const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');

// Load environment variables from .env file
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

// Array to store all command data
const commands = [];

// Get the path to the commands directory and read all JavaScript files
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

// Load each command file and validate it has required properties
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Check if command has both 'data' and 'execute' properties
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON())
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`)
    }
}

// Initialize Discord REST client with bot token
const rest = new REST().setToken(DISCORD_TOKEN);

// Deploy commands to Discord (async operation)
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // Update guild commands via Discord API
        const data = await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });

        console.log(`Succesfuly reloaded ${data.lenght} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();