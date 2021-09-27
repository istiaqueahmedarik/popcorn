const ytdl = require('ytdl-core-discord')
const ytpl = require('ytpl')
const Discord = require('discord.js')

module.exports.run = async (client,message,args,queue,searcher)=>{
  console.log(queue)
    const serverQueue = queue.get(message.guild.id);

  const vc = message.member.voice.channel;
  if(!vc){
      return message.channel.send("beyaddob! -_- voice chat e add ho");
  }
  if(args.length<=0){
    return message.channel.send("matha thikase?");
  }
  let url = args.join('')
  if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)){
    await ytpl(url).then(async playlist=>{
        message.channel.send(`${playlist.title} add kore disi`)
        playlist.items.forEach(async item=>{
          await videoHandler(await ytdl.getInfo(item.shortUrl),message,vc,true)
        })
    })
  }else{
    let url = args.join('')
  if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/watch(.*)$/)){
     try {
        let songInfo = await ytdl.getInfo(args.join(''));
        console.log(args.join(''))
        videoHandler(songInfo, message, vc)
        }catch(err){
            message.channel.send(` \n ${err} `)
            console.log(err)
        }



  }else if(url.match(/^https?:\/\/(www.youtu.be|youtu.be)\/(.*)$/)){
      try {
        var main_url = args.join(' ')

        let songInfo = await ytdl.getInfo(main_url.replace('youtu.be/','youtube.com/watch?v='));
        console.log(args.join(''))
        videoHandler(songInfo, message, vc)
        }catch(err){
            message.channel.send(` \n ${err} ${main_url.replace('youtu.be/','youtube.com/watch?v=')}`)
            console.log(err)
        }
  }
  
  else{
    let results = await searcher.search(args.join(" "),{type:"video"})
    console.log(args.join(''))
    if(results.first==null){
      return message.channel.send("kisui nai :(")

    }else{
          try {
        let songInfo = await ytdl.getInfo(results.first.url);
        console.log(songInfo)
        return videoHandler(songInfo, message, vc)
        }catch(err){
            message.channel.send(` \n ${err} `)
            console.log(err)
        }
    }
    
  }
   
        
  }

  async function videoHandler(songInfo,message,vc,playlist = false){
    const serverQueue = queue.get(message.guild.id)
    let song = {
           title: songInfo.videoDetails.title,
           url: songInfo.videoDetails.video_url,
           vLength: songInfo.videoDetails.lengthSeconds,
           thumbnail: songInfo.videoDetails.thumbnails[3].url
    };
    if(!serverQueue){
                const queueConstructor = {
                    txtChannel: message.channel,
                    vChannel: vc,
                    connection: null,
                    songs: [],
                    volume: 10,
                    playing: true,
                    loopone:false,
                    loopall:false
                };
                queue.set(message.guild.id, queueConstructor);
 
                queueConstructor.songs.push(song);
 
                try{
                    let connection = await queueConstructor.vChannel.join();
                    queueConstructor.connection = connection;
                    message.guild.me.voice.setSelfDeaf(true)
                    play(message.guild, queueConstructor.songs[0]);
                }catch (err){
                    console.error(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(`bug! amar code e eto bug ken -_- ${err}`)
                }
            }else{
                serverQueue.songs.push(song);
                if(playlist) return undefined

                let duration = `${parseInt(song.vLength/60)}:${song.vLength - 60*parseInt(song.vLength/60)}`

                let msg = new Discord.MessageEmbed()
                    .setTitle("Song add korsi")
                    .addField(song.title,"____")
                    .addField("Duration: "+duration)
                    .setThumbnail(song.thumbnail)
                    .setColor("PURPLE")

                return message.channel.send(msg);
            }
    
  }


  async function play(guild, song){
        const serverQueue = queue.get(message.guild.id)
        if(!song){
            serverQueue.vChannel.leave();
            queue.delete(guild.id);
            return;
        }
        const dispatcher = serverQueue.connection
            .play(await ytdl(song.url), { type: 'opus' })
            .on('finish', () =>{
              if(serverQueue.loopone){
                play(guild, serverQueue.songs[0]);

              }else if(serverQueue.loopall){
                serverQueue.songs.push(serverQueue.songs[0])
                serverQueue.songs.shift();

              }else{
                serverQueue.songs.shift()
              }
                play(guild, serverQueue.songs[0]);

            })
            let duration = `${parseInt(serverQueue.songs[0].vLength/60)}:${serverQueue.songs[0].vLength - 60*parseInt(serverQueue.songs[0].vLength/60)}`

                let msg = new Discord.MessageEmbed()
                    .setTitle("Now Playing:")
                .addField(serverQueue.songs[0].title, "----------")
                .addField("Song duration: ", duration)
                .setThumbnail(serverQueue.songs[0].thumbnail)
                .setColor("PURPLE")

                return message.channel.send(msg);
    }



}

module.exports.config={
  name:"play",
  aliases:['p','pl']
}