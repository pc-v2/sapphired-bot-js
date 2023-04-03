const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prune')
		.setDescription('Prune up to 99 messages.')
		.addIntegerOption(option =>
			option.setName('amount')
				.setDescription('Number of messages to prune')
				.setMinValue(1)
				.setMaxValue(100)),
	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');
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
	  
		await interaction.channel.bulkDelete(amount, true).catch(error => {
			console.error(error);
			interaction.reply({ content: 'There was an error trying to prune messages in this channel!', ephemeral: true });
		});

		return interaction.reply({ content: `Successfully pruned \`${amount}\` messages.`, ephemeral: true });
	},
};
