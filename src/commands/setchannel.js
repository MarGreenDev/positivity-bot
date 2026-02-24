const { SlashCommandBuilder } = require("discord.js");
const { setChannel } = require('../storage');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setchannel')
        .setDescription('Set the channel for daily positivity.')
        .addChannelOption(option =>                         //This gives the slash command a required channel options menu
            option
                .setName('channel')
                .setDescription('Channel to post daily messages in')
                .setRequired(true)
        ),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel')
        setChannel(interaction.guildId, channel.id)
        await interaction.reply(`Channel: ${channel.toString()}`);
    }
}