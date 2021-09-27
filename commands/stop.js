module.exports.run = async (client,message,args,queue,searcher)=>{
  const serverQueue = queue.get(message.guild.id)
    if(!serverQueue){
          return message.channel.send("kisui nai")
        }

        if(message.member.voice.channel != message.guild.me.voice.channel)
            return message.channel.send("vc te join ho -_-!")
        if(serverQueue.loopone===true || serverQueue.loopall === true){
          serverQueue.loopall = false;
          serverQueue.loopone = false;
          serverQueue.songs = [];
          serverQueue.connection.dispatcher.end();
        }else{
          serverQueue.songs = [];
          serverQueue.connection.dispatcher.end();
        }
}

module.exports.config={
  name:"stop",
  aliases:['s','st']
}