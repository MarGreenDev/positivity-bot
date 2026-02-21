// Creates the bot and logs in

const { Client, GatewayIntentBits } = require('discord.js');

require('dotenv').config();

const botToken = process.env.DISCORD_TOKEN;

const client = new Client({intents: [GatewayIntentBits.Guilds]});     // Guild intent is needed for basic server access and slash commands

client.on("clientReady", () => {    // Runs when the bot is connected to Discord
    console.log("Bot is online");
})

client.login(botToken);