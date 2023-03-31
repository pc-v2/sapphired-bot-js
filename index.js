const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  IntentsBitField,
  ActivityType
} = require("discord.js");
const { token, channelId} = require("./config.json");
const cronJob = require("node-cron");


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.cooldowns = new Collection();
client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}


client.on(Events.ClientReady, (c) => {
  console.log(`${c.user.tag} is ready 👌`);

  let activityTask = cronJob.schedule('* * 4 * * *',() =>
  {
    client.user.setActivity({
      name: 'sahur',
      type: ActivityType.Watching
    })
  })
  let activityTask2 = cronJob.schedule('0 15 18 * * *',() =>
  {
    client.user.setActivity({
      name: 'berbuka',
      type: ActivityType.Watching
    })
  })
  activityTask.start();
  activityTask2.start()
});



client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  const { cooldowns } = client;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const defaultCooldownDuration = 3;
  const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

  if (timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

    if (now < expirationTime) {
      const expiredTimestamp = Math.round(expirationTime / 1000);
      return interaction.reply({
        content: `Please wait <t:${expiredTimestamp}:R> more second(s) before reusing the \`${command.name}\` command.`,
        ephemeral: true,
      });
    }
  }

  timestamps.set(interaction.user.id, now);
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});


client.on("messageCreate", (message) => {
  if (message.content === "pagi") {
    message.reply(
      "https://media.discordapp.net/attachments/897136153495478272/1087294657853145118/Capture.png"
    );
  }
  if (message.content === "pake nanya") {
    message.reply(
      "https://cdn.discordapp.com/attachments/897136153495478272/1088857572724977764/FpTAnOyaUAAMWjs.jpg"
    );
  }
});

	let task = cronJob.schedule('0 30 7 * * *', () => {
		let message = client.channels.cache.get(channelId);
		message.send('pagi');

    console.log("pagi pagi... dasar pengangguran");
	});
	let sahurTask = cronJob.schedule('0 0 4 * * *', () => {
		let message = client.channels.cache.get(channelId);
		message.send('sahurrrrr');

    console.log("sahur cok");
	});
	let berbukaTask = cronJob.schedule('0 15 18 * * *', () => {
		let message = client.channels.cache.get(channelId);
		message.send('udah bukaaa');

    console.log("berbuka cok");
	});

	task.start();
	sahurTask.start();
	berbukaTask.start();

client.login(token);
