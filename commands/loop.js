module.exports.run = async (client,message,args,queue,searcher)=>{
  const serverQueue = queue.get(message.guild.id)
    if(!serverQueue){
          return message.channel.send("kisui nai")
        }

    if(!serverQueue.connection){
        return message.channel.send("Kisui to nai!")

      }
      if(message.member.voice.channel != message.guild.me.voice.channel){
        return message.channel.send("vc te nai tui")
      }
      switch(args[0].toLowerCase()){
        case 'all':
          serverQueue.loopall = !serverQueue.loopall;
          serverQueue.loopone = false;

          if(serverQueue.loopall===true){
            message.channel.send("okk boss")
          }else{
            message.channel.send("oka oka")
          }
          break;
        case 'one':
        serverQueue.loopone = !serverQueue.loopone;
          serverQueue.loopall = false;

          if(serverQueue.loopone===true){
            message.channel.send("okk boss")
          }else{
            message.channel.send("oka oka")
          }
          break;
        case 'off':
          serverQueue.loopall = false;
          serverQueue.loopone = false;

          message.channel.send("asa oka")
          break;
        default:
          message.channel.send("matha thik ase??")
      }
}
module.exports.config={
  name:"loop",
  aliases:['lp','loop']
}