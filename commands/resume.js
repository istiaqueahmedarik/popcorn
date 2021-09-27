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
      if(serverQueue.connection.dispatcher.resumed){
        return message.channel.send("resumed i to ase!!")
      }
      serverQueue.connection.dispatcher.resume();
}
module.exports.config={
  name:"resume",
  aliases:['rs','res']
}