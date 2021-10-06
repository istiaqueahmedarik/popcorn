const fetch = require('node-fetch')
module.exports.run = async (client,message,args,queue,searcher)=>{
  console.log(message.channel.id)
  const vc = message.member.voice.channel;
  if(!vc) return message.channel.send("vc te join ho")
  
  fetch(`https://discord.com/api/v8/channels/${vc.id}/invites`,{
    method:"POST",
    body:JSON.stringify({
      max_age:86400,
      max_uses:0,
      target_application_id:"878067389634314250",
      target_type:2,
      temporary:false,
      validate:null
    }),
    headers:{
      "Authorization":`Bot ${process.env.DISCORD}`,
      "Content-Type":"application/json"
    }
  }).then(res=>res.json())
  .then(inv=>{
    if(!inv.code) return message.channel.send("Prblm ase!!")
    message.channel.send(`Col eksathe aka aki kori :3 https://discord.com/invite/${inv.code}`)
  })
 
}

module.exports.config={
  name:"doodle",
  aliases:['dt','doodle']
}
