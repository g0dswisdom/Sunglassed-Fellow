const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { faker } = require("@faker-js/faker")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fakename')
		.setDescription('Sends a fake name in chat'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
		.setDescription(`Fake email: ${faker.name.fullName()}`)
		.setColor('#d8e645');
		await interaction.reply({embeds:[embed]});
	},
};
