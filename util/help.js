const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { readdirSync } = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Self-explanatory'),

  async execute(interaction) {
    const commandFolders = readdirSync(path.join(__dirname, '../../commands'));

    const embed = new EmbedBuilder()
      .setTitle('Help')
      .setColor('d8e645')
      .setDescription('List of available commands:');

    for (const folder of commandFolders) {
      const commandFiles = readdirSync(path.join(__dirname, `../../commands/${folder}`)).filter(file => file.endsWith('.js'));
      const commands = commandFiles.map(file => require(`../../commands/${folder}/${file}`));

      for (const command of commands) {
        const { data } = command;
        embed.addFields({ name: `${data.name}`, value: `${data.description}`, inline: true });
      }
    }

    interaction.reply({ embeds: [embed] });
  },
};