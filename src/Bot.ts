//import { hello_reply } from './hello_reply';
import Discord from "discord.js";
import {token} from "../config";
import ping from "./commands/PingCommand"
import lire from "./commands/LireCommand"
import help from "./commands/HelpCommand"

const client = new Discord.Client();

const prefix = "!";

client.login(token)

client.once("ready", () => {
    console.log("Ready!");
});

let functionsMap = new Map([['ping', ping],
                            ['lire', lire]])

// COMMANDS ############

client.on('message', msg => {
    if (msg.author.bot || !msg.content.startsWith(prefix)) return
    const command = msg.content.slice(1)
    if (functionsMap.has(command)) {
      functionsMap.get(command)(msg)
    }
    else {
      msg.reply(`Sorry, '${command}' command is invalid!`)
    }
    // command 2 
    if (msg.content === '!help') {
        help(msg)        
      }
});

// END OF COMMANDS ####################

  client.once("reconnecting", () => {
    console.log("Reconnecting!");
  });
  
  client.once("disconnect", () => {
    console.log("Disconnect!");
  });