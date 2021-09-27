module.exports.run = async (client,message,args,queue,searcher)=>{
  const serverQueue = queue.get(message.guild.id)
    if(!serverQueue){
          return message.channel.send("kisui nai")
        }

    if(!serverQueue.connection){
        return message.channel.send("Kisui to nai! ki resume korte kos")

      }
    if(message.member.voice.channel != message.guild.me.voice.channel){
        return message.channel.send("vc te nai tui")
    }

    let nowPlaying = serverQueue.songs[0];
    let qMessage = `eita coltese ${nowPlaying.title}\n-------------------\n`

    for(var i=1;i<serverQueue.songs.length;i++){
      qMessage += `${i}. ${serverQueue.songs[i].title}\n`

    }

    message.channel.send('```'+qMessage+'-'+message.author.username+'```')
    
}

module.exports.config={
  name:"queue",
  aliases:['q','que']
}