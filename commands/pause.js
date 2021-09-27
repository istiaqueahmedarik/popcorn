module.exports.run = async (client,message,args,queue,searcher)=>{
  const serverQueue = queue.get(message.guild.id)
    if(!serverQueue){
          return message.channel.send("kisui nai")
        }

      if(!serverQueue.connection){
        return message.channel.send("Kisui to nai! ki pause korte kos")

      }
      if(message.member.voice.channel != message.guild.me.voice.channel){
        return message.channel.send("vc te nai tui")
      }
      if(serverQueue.connection.dispatcher.paused){
        return message.channel.send("paused i to ase!!")
      }
      serverQueue.connection.dispatcher.pause();
      message.channel.send("okk boss!")
}
module.exports.config={
  name:"pause",
  aliases:['ps','pause']
}