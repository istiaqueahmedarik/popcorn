const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const DisTube = require('distube')
const keepAlive = require('./server')

const fs = require('fs')
const { YTSearcher } = require('ytsearcher');

//youtube search 
const searcher = new YTSearcher({
    key: process.env.YOUTUBE_API_KEY,
    revealed: true
});
 
const client = new Discord.Client();
const distube = new DisTube(client, {
  emitNewSongOnly: false,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  leaveOnStop: true,
  savePreviousSongs: true,
  emitAddSongWhenCreatingQueue: false,
  //emitAddListWhenCreatingQueue: false,
  searchSongs: 0,
       //Comment this line if you dont want to use a youtube Cookie 
  nsfw: true, //Set it to false if u want to disable nsfw songs
  emptyCooldown: 25,
  ytdlOptions: {
    //requestOptions: {
    //  agent //ONLY USE ONE IF YOU KNOW WHAT YOU DO!
    //},
    highWaterMark: 1024 * 1024 * 64,
    quality: "highestaudio",
    format: "audioonly",
    liveBuffer: 60000,
    dlChunkSize: 1024 * 1024 * 64,
  },
  youtubeDL: true,
  updateYouTubeDL: true,
  customFilters: {
    "clear": "dynaudnorm=f=200",
    "lightbass": "bass=g=8,dynaudnorm=f=200",
    "heavybass": "bass=g=20,dynaudnorm=f=200",
    "bassboost": "bass=g=8,dynaudnorm=f=200",
    "custombassboost": "bass=g=1,dynaudnorm=f=200",
    "customspeed": "atempo=1.0",
    "purebass": "bass=g=20,dynaudnorm=f=200,asubboost",    
    "8d": "apulsator=hz=0.08",
    "vaporwave": "aresample=48000,asetrate=48000*0.8",
    "nightcore": "aresample=48000,asetrate=48000*1.25",
    "phaser": "aphaser=in_gain=0.4",
    "tremolo": "tremolo",
    "vibrato": "vibrato=f=6.5",
    "reverse": "areverse",
    "treble": "treble=g=5",
    "surrounding": "surround",
    "pulsator": "apulsator=hz=1",
    "subboost": "asubboost",
    "karaoke": "stereotools=mlev=0.03",
    "flanger": "flanger",
    "gate": "agate",
    "haas": "haas",
    "mcompand": "mcompand",
    "earrape": "bass=g=50",
    "bassboost1": "bass=g=1,dynaudnorm=f=200",
    "bassboost2": "bass=g=2,dynaudnorm=f=200",
    "bassboost3": "bass=g=3,dynaudnorm=f=200",
    "bassboost4": "bass=g=4,dynaudnorm=f=200",
    "bassboost5": "bass=g=5,dynaudnorm=f=200",
    "bassboost6": "bass=g=6,dynaudnorm=f=200",
    "bassboost7": "bass=g=7,dynaudnorm=f=200",
    "bassboost8": "bass=g=8,dynaudnorm=f=200",
    "bassboost9": "bass=g=9,dynaudnorm=f=200",
    "bassboost10": "bass=g=10,dynaudnorm=f=200",
    "bassboost11": "bass=g=11,dynaudnorm=f=200",
    "bassboost12": "bass=g=12,dynaudnorm=f=200",
    "bassboost13": "bass=g=13,dynaudnorm=f=200",
    "bassboost14": "bass=g=17,dynaudnorm=f=200",
    "bassboost15": "bass=g=15,dynaudnorm=f=200",
    "bassboost16": "bass=g=16,dynaudnorm=f=200",
    "bassboost17": "bass=g=17,dynaudnorm=f=200",
    "bassboost18": "bass=g=18,dynaudnorm=f=200",
    "bassboost19": "bass=g=19,dynaudnorm=f=200",
    "bassboost20": "bass=g=20,dynaudnorm=f=200"
  },
  
});
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
      cmd.run(client,message,args,queue,searcher,distube,message)
    }
    catch(e){
      return console.error(e)
    }
   
     
})
keepAlive();

client.login(process.env.DISCORD)