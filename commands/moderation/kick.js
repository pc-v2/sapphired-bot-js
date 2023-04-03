const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Select a member and kick them (but not really).')
		.addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true)),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		if (
			!interaction.member.permissions.has(
			  PermissionsBitField.Flags.ManageChannels
			)
		  )
			//jika bukan moderator/admin (no manage channels)
			return await interaction.reply({
			  content: "You dont have permission to execute this command",
			  ephemeral: true,
			});
	  
		return interaction.reply({ content: `You wanted to kick: ${member.user.username}`, ephemeral: true });
	},
};
