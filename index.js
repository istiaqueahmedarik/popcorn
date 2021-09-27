const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const keepAlive = require('./server')

const fs = require('fs')
const { YTSearcher } = require('ytsearcher');

//youtube search 
const searcher = new YTSearcher({
    key: process.env.YOUTUBE_API_KEY,
    revealed: true
});
 
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/",(e,f)=>{
  if(e) return console.error(e)
  f.forEach(file=>{
    if(!file.endsWith(".js")) return
    console.log(`${file} is loaded`)
    let cmd = require(`./commands/${file}`)
    let cmdName = cmd.config.name;
    client.commands.set(cmdName,cmd)
    cmd.config.aliases.forEach(alias=>{
      client.aliases.set(alias,cmdName)
    })
  })
})

const queue = new Discord.Collection();

//ready_the_bot
client.on("ready", () => {
    console.log("I am online!")
})

//triggered an action when someone message
client.on("message", async(message) => {
    const prefix = '-';

    if(!message.content.startsWith(prefix)) return
    const serverQueue = queue.get(message.guild.id);
    
    //clear the data
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    //make sure caps lock is not a problemn
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

    if(!cmd) return
    try{
      cmd.run(client,message,args,queue,searcher)
    }
    catch(e){
      return console.error(e)
    }
   
     
})
keepAlive();

client.login(process.env.DISCORD)