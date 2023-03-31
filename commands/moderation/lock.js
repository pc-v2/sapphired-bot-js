const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType, PermissionOverwrites, RoleManager } = require('discord.js');
const testChannelId = '1088451892704718881';
module.exports = {
    data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('lock test channel')
    .addChannelOption(option => option
        .setName('channel')
        .setDescription('The channel you want to lock')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)),
        async execute (interaction) {
            if (interaction.member.roles.cache.has('admin')) return await interaction.reply({
                content: "You dont have permission to execute this command", ephemeral: true })

                let channel = interaction.options.getChannel('channel');
                
                channel.permissionOverwrites.create(interaction.guild.id, {ViewChannel: false} )

                const embed = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`:white_check_mark: ${channel} has been **locked**`)

                await interaction.reply({ embeds: [embed]})
            }
    }