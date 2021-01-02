import Discord from 'discord.js';
import { readdirSync } from 'fs';

const client = new Discord.Client();

const commands = new Discord.Collection<string, Function>();
const prefix = process.env.PREFIX || '::';

const CommandDir = './src/lib/discord/commands';
const EventDir = './src/lib/discord/events';

const commandFiles = readdirSync(CommandDir).filter((file) =>
  file.endsWith('.ts')
);
const eventFiles = readdirSync(EventDir).filter((file) => file.endsWith('.ts'));

for (const file of commandFiles) {
  const commandClass = require(`${CommandDir}/${file}`).default;
  if (typeof commandClass === 'function') continue;
  const { command, execute } = new commandClass();
  if (typeof command === 'string') {
    commands.set(command, execute);
    continue;
  }
  for (const cmd of command) {
    commands.set(cmd, execute);
  }
}

for (const file of eventFiles) {
  const eventClass = require(`${EventDir}/${file}`).default;
  if (typeof eventClass === 'function') continue;
  const { eventType, execute } = new eventClass();
  client.on(eventType, execute);
}

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args?.shift()?.toLowerCase() || '';

  if (!commands.has(command)) {
    // Add Your help Command
    /*
    const help = new (Help Classname)();
    help.execute();
    */
    return;
  }

  try {
    const func = commands.get(command) || function () {};
    await func({ message, args });
  } catch (err) {
    console.error(err);
    message.reply('An error occurred while processing the command.');
  }
});

export default client;
