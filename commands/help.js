const Discord = require('discord.js')

module.exports.run = async (client,message,args,queue,searcher)=>{
  const serverQueue = queue.get(message.guild.id)
  let msg = new Discord.MessageEmbed()
                
                .setTitle("Help")
                .setAuthor('Popcorn', 'https://cdn.discordapp.com/attachments/858659977917104159/891181600568668220/Popcorn.png')
                
                .setDescription(`
**Commands**
**-yt / -youtube** => for watch together youtube!

**-bt / -betrayal** => forplay betrayal!!(BETA) It's a better version of among us! It is in beta test. Discord will update it. 

**-dt / -doodle** => for play Doodle Crew. It's a game like skribble.io where you have to draw and guess. 

**-fs / -fishing** => for play fishing game. It is in beta test. Discord will update it.

**-lt / -lettertile** => for play lettertile. Letter Tile is a word game in which players earn points by constructing words from available tiles.

**-ws / -wordsnack** => for play wordsnack. How many words can you whip up with only a handful of letters?

Swipe between the circle of letters to reveal words on the board! Discover a word first to claim it in your color, earning a point for each letter. Found a scrumptious word that isn’t on the board? You’ll get a bonus point as an extra sweet treat!

When the smoke clears, the player with the most points wins!

**-p / -pl  (video or playlist link or video name from youtube)** => for play or add video 
add playlist in this format => https://www.youtube.com/playlist?list=***

**-sk / -skp** =>skip a song

**-s / -st** => stop song

-**lp / -loop  (one/all/off)**  ⇒ *one -> loop one song ; all -> loop full playlist 

off -> turn off the loop*

**-ps / -pause** ==> pause video 

**-q / -que** ==> all video list




`)
              .setFooter('Developed By Istiaque Ahmed Arik', 'https://cdn.discordapp.com/attachments/858659977917104159/891181600568668220/Popcorn.png')

                .setThumbnail("https://cdn.discordapp.com/attachments/858659977917104159/891181600568668220/Popcorn.png")
                .setColor("PURPLE")
  message.channel.send('Thanks for using this bot!', {
 embed: msg,
})
}

module.exports.config={
  name:"help",
  aliases:['h','hlp']
}
