import { Message, TextChannel, MessageEmbed } from "discord.js";
import Client from "../structures/Client";
import GuildSettings from "../schemas/GuildSettings";
const Channels = require("../data/calm/channels.json");
module.exports = {
  name: "annonsuggestion",
  aliases: ["anonsuggestion", "anonsuggest"],
  description: "Make a completely anonymous suggestion for the server!",
  category: "Utility",
  usage: "annonsuggestion <suggestion>",
  run: async function run(client: Client, message: Message, args: Array<String>) {
    if (args.length === 0) {
      message.channel.send("Invalid arguments! Please do c!annonsuggestion (suggestion)");
      return;
    }

    let suggestion = "";
    for (let i = 0; i < args.length; i++) {
      suggestion += args[i] + " ";
    }
    let suggestionChannel: TextChannel, firstReaction: string, secondReaction: string;
    if (message.guild.id === "501501905508237312") {
      suggestionChannel = message.guild.channels.cache.find((chan) => chan.id === Channels.SUGGESTIONS.SUGGESTIONS.id) as TextChannel;
      firstReaction = "615239771723137026"; //  https://cdn.discordapp.com/emojis/615239771723137026.png?v=1
      secondReaction = "615239802127777817"; // https://cdn.discordapp.com/emojis/615239802127777817.png?v=1
    } else {
      suggestionChannel = message.guild.channels.cache.find((chan) => chan.name === Channels.SUGGESTIONS.SUGGESTIONS.name) as TextChannel;
      firstReaction = "✅";
      secondReaction = "❎";
    }

    if (suggestionChannel === undefined) {
      message.channel.send("Uh oh! We could not find a channel to put the suggestion in!");
      return;
    }

    const suggestionEmbed = new MessageEmbed().setFooter(`Anonymous Suggestion • CalmBot v${client.version}`).setColor("#007FFF").setTitle("Suggestion:").setDescription(suggestion).setTimestamp();


    // Delete message so people can not see who made suggestion
    message.delete();
    
    let guildSettings = await GuildSettings.findOne({ guildID: message.guild.id });
    if (guildSettings === null) {
      const doc = new GuildSettings({ guildID: message.guild.id });
      await doc.save();
      guildSettings = doc;
    }
    
    suggestionChannel.send(suggestionEmbed).then(m =>{
      m.react(firstReaction);
      m.react(secondReaction);
      guildSettings.suggestions.push({msgID: m.id, suggestorID: message.author.id, suggestorTag: message.author.tag, suggestion: suggestion });
      guildSettings.save();
    })
  },
};