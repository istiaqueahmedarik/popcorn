const Discord = require('discord.js')

module.exports.run = async (client,message,args,queue,searcher)=>{
  const serverQueue = queue.get(message.guild.id)
  let msg = new Discord.MessageEmbed()
                
                .setTitle("Help")
                .setAuthor('Popcorn', 'https://cdn.discordapp.com/attachments/858659977917104159/891181600568668220/Popcorn.png')
                
                .setDescription(`
**Commands**
**-yt / -youtube** => for watch together youtube!
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