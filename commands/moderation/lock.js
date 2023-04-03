const {
  Client,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
  IntentsBitField,
  GatewayIntentBits,
  ChannelType,
  Permissions
} = require("discord.js");
const { roleRakyatJelata, guildId } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("lock test channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel you want to lock")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
  async execute(interaction) {
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
      ],
    });

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

    const guild = interaction.guild;
    const everyoneRole = guild.roles.everyone;
    let channel = interaction.options.getChannel("channel");

    channel.permissionOverwrites.create(everyoneRole, {
      ViewChannel: true,
    });

    channel.permissionOverwrites.create(roleRakyatJelata, {
      ViewChannel: true,
    });

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setDescription(`:white_check_mark: ${channel} has been **unlocked**`);

    await interaction.reply({ embeds: [embed] });
  },
};
