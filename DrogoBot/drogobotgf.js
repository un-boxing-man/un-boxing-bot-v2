const Discord = require('discord.js');
const { prefix, token, GIPHYtoken, channelID } =require(`./drogobotgf-config.json`);
const client = new Discord.Client();
const bot = new Discord.Client();
const gac = require('giphy-js-sdk-core');
const Giphy = gac(GIPHYtoken);

client.on("ready", () => {
	console.log('Ready!');
	client.user.setActivity(`DrogoBot sleep.`, { type: 'WATCHING' })
  .then(presence => console.log(`Activity set to DrogoBot sleep.`))
  .catch(console.error);
  console.log(`Bot has started, with ${bot.users.cache.size} users, in ${bot.channels.cache.size} channels of ${bot.guilds.cache.size} guilds.`);
  });

  client.on("guildCreate", guild => {
	// This event triggers when the bot joins a guild.
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	client.user.setActivity(`"DrogoBot sleep." `, { type: 'WATCHING' });
  });
  
  client.on("guildDelete", guild => {
	// this event triggers when the bot is removed from a guild.
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	client.user.setActivity(`"DrogoBot sleep. `, { type: 'WATCHING' });
  });

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async dmmessage => {
    
    if (!dmmessage.channel.type === 'dm') return;
	if (dmmessage.channel.type === 'dm'){
        if (dmmessage.author.bot) return
        const dms = dmmessage.content;
        const dmauthor = dmmessage.author.tag;
        //console.log(`message ${dms} sent by ${dmauthor} in dm`)
        const channel = client.channels.cache.get(`${channelID}`)
        const dmEmbed = new Discord.MessageEmbed()
        
        .setColor('GREEN')
      .setTitle('new DM')
      .setURL('http://dro.unboxingman.com')
      .setAuthor('drogobot', 'http://play.unboxingman.com/dro/DrogoLogo.png', 'http://dro.unboxingman.com')
      .setDescription(` Received: ${dms}`)
      .setThumbnail('http://play.unboxingman.com/dro/DrogoLogo.png')
      .addFields(
          //{ name: 'new dm message', value: `${dms}` }, 
          { name:`by ${dmauthor}`,  value: `.`},
      )
      .setTimestamp()
      .setFooter('made by un boxing man yt', 'http://unpix.nwpixs.com/logo.png')

	   channel.send(dmEmbed)
	   console.log(`message ${dms} sent by ${dmmessage.author.tag} in dm`)
	}
});

client.on('message' , async message => {
	if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = message.content.toLocaleLowerCase();
    const mention = message.mentions.users.first();
    const Member = message.member;
    
   if (command.startsWith(`${prefix}ping`)) { 
        const m = await message.channel.send("Ping?");
         m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
    } else if (message.content.startsWith(`${prefix}gif`)){ 
		
            var input = message.content;
           var userInput= input.substr('5');
           if (!userInput) {
               message.channel.send(" you nead a gif")
           
        }  else { Giphy.search ('gifs' , {"q":userInput})
                .then((Response) => {
                 var totalresponses = Response.data.length;
                 var Responseindex = Math.floor((Math.random() * 10) + 1) % totalresponses;
                  var Responsefinal = Response.data[Responseindex];
    
                  message.channel.send("",{
                  files: [Responsefinal.images.fixed_height.url]
                  
             })})} 
        }
})


client.login(token)