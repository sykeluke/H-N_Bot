const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity('The H&N Community', { type: 'WATCHING' });
});
bot.on('messageDelete', message => {
	console.log(`A message by ${message.author.tag} was deleted, but we don't know by who yet.`);
});

bot.on("message", (message) => {
  if(message.content.startsWith (".8ball")){
  let responses = [
    'As i see, yes',
    'Ask again later',
    'Better not tell you now',
    'Cannot predict now',
    'Concentrate and ask again',
    'Dont count on it',
    'Its certain',
    'It is decidedly so',
    'Most likely',
    'My reply is no',
    'My sources say no',
    'Outlook not so good',
    'Outlook Good',
    'Reply hazy, try again',
    'Signs point to yes',
    'Very doubtful',
    'Without a doubt',
    'yes',
    'yes - definitely',
    'You may rely on it'
  ]
  
  const BallNumber = Math.floor(Math.random() * responses.length);
  const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
  message.channel.send(responses[BallNumber]);
} 
});
// Help add new cmds here
bot.on("message", (message) => {
  if(message.content.startsWith (".help")){
    const helpEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('H&N Services Help')
    .setAuthor('H&N services Manager')
    .setDescription('The help section of the H&N Bot')
    .addFields(
      { name: 'Get the help you need!', value: 'We will help you the whole way' },
      { name: '\u200B', value: '\u200B' },
      { name: '.8ball ', value: 'To run this do .8ball This gives you the outcome of a given situation' },
      { name: '.panel', value: 'gives you the Panel URL' },
      { name: '.stats usage: .stats', value: 'Gets the bots current stats!' },
      { name: '.pricing', value: 'Shows you our current resource rates' },
      { name: '.coinflip usage: ', value: '50/50 outcome coinflip' },
      { name: '`Moderation commands:`',},
      { name: '.purge usage: .purge <ammount of messages to delete>', value: 'Purges messages from chat' },
      { name: '.kick usage: .kick @user', value: 'Kicks a user from the server' },
      { name: '.slowmode usage: .slowmode <Timeinseconds>', value: 'sets the chat slowmode' },


    )

    .setTimestamp()
  
  message.channel.send(helpEmbed);

 



  }
});


bot.on("message", (message) => {
  if(message.content.startsWith (".panel")){
    const ipEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Panel  url retrieval')
    .setAuthor('H&N Bot')
    .setDescription('You ran the command to fetch the panel url spot the dog found it!')
    .addFields(
      { name: 'The url is', value: 'https://panel.hnservices.ml' },

    )

    .setTimestamp()
  
  message.channel.send(ipEmbed);

  }
});



bot.on("message", (message) => {
if(message.content.toLowerCase().startsWith (".pricing")){
  const priceEmbed = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle('H&N Price Managment')
  .setAuthor('H&N Bot')
  .setDescription('We have got you the latest price info')
  .addFields(
    { name: 'A 1GB ram server will  cost you', value: '$1 per month' },
    { name: 'A 2GB ram server will  cost you', value: '$1.50' },
    { name: 'A 3GB ram server will  cost you', value: '$2.50' },
    { name: 'A 4GB ram server will  cost you', value: '$3.50' },
    { name: 'A 5GB ram server will  cost you ', value: '$4.50' },
    { name: 'A 6GB ram server will  cost you ', value: '$5.50' },
    { name: 'A 7GB ram server will  cost you ', value: '$6.50' },
    { name: 'A 8GB ram server will  cost you ', value: '$7.50' },
    { name: 'To place an order please open a ticket},


  )

  .setTimestamp()
  
  message.author.send(priceEmbed);
}
});

bot.on("message", async(msg) => {
  if (!msg.guild) return;
  const member = msg.guild.member(msg.author);
  if(msg.content.toLowerCase().startsWith (".purge")){

const args = msg.content.split(' ').slice(1); // All arguments behind the command name with the prefix
const amount = args.join(' '); // Amount of messages which should be deleted
  
  if (!amount) return msg.reply('You haven\'t given an amount of messages which should be deleted!'); // Checks if the `amount` parameter is given
  if (isNaN(amount)) return msg.reply('The amount parameter isn`t a number!'); // Checks if the `amount` parameter is a number. If not, the command throws an error
  
  if (amount > 100) return msg.reply('You can`t delete more than 100 messages at once!'); // Checks if the `amount` integer is bigger than 100
  if (amount < 1) return msg.reply('You have to delete at least 1 message!'); // Checks if the `amount` integer is smaller than 1
  
   msg.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
      msg.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
      


  )});
  await(5000);
  msg.channel.send("Deleted These Messages")
   }

});

bot.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;
  const member = message.guild.member(message.author);

  // If the message content starts with "!kick"
  if (message.content.startsWith('.kick')) {
    if (message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
    // Assuming we mention someone in the message, this will return the user
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {

        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            message.reply('I was unable to kick the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }else {
    message.reply("You do not have the correct permissions to kick a user")
  }
  }
});

bot.on('guildMemberAdd', member => {
  
      const joinEmbed = new Discord.MessageEmbed()
      .setColor('#f2df27')
      .setTitle('H&N Services Would like to welcome you to the discord server')
      .setAuthor('H&N Bot')
      .setDescription('We hope you love our services!')
      .addFields(
        { name: 'We have a custom bot with all of its fun and useful commands', value: 'prefix: .' },
        { name: 'On behalf of our owner phelix and services manager sykelukemc', value: 'We wish you have a great time' },
        { name: 'Please read our rules', value: 'To verify you will need to react with the emoji shown' },
        { name: 'We will host regualar giveaways ', value: '  These could be more servers or more ram' },
        { name: 'If you have any issues please open a ticket with ', value: '$open' },
    
      )
  
  
      member.user.send(joinEmbed);
});


bot.on("message", (message) => {
  if(message.content.startsWith (".coinflip")){
  let responses = [
    'Heads',
    'Tails'
  ]
  
  const BallNumber = Math.floor(Math.random() * responses.length);
  const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
  message.channel.send(responses[BallNumber]);
} 
});

let count = 0

let timeout

bot.on('message', ({channel, content, member}) => {

  if (channel.id === '798894328302927916') {
    if (member.user.bot) return
    if (Number(content) === count + 1) {
      count++
      if (timeout) bot.clearTimeout(timeout)
      timeout = bot.setTimeout(
        () => channel.send(++count).catch(console.error),
        30000
      )
    // If the message wasn't sent by the bot...
    } else if (member.id !== bot.user.id) {
      // ...send a message because the person stuffed up the counting (and log all errors)
      channel.send(`${member} messed up!`).catch(console.error)
      // Reset the count
      count = 0
      // Reset any existing timeout because the bot has counted so it doesn't need to
      // count again
      if (timeout) bot.clearTimeout(timeout)
    }
  }
})

bot.on('message', message => {
  if (message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
if(message.content.startsWith(`.slowmode`)) {
  var time = message.content.split(' ').slice(1).join(' ')
  if(!time) return message.reply('Please enter a time in seconds!')
 message.channel.setRateLimitPerUser(time)
   message.channel.send('Set the slowmode!')
}
}
});

bot.on('message', message => {
if(message.content.startsWith(`.stats`)) {
    
  var mcount = bot.users.cache.size
  var scount = bot.guilds.cache.size
  var tcount = bot.channels.cache.filter(c => c.type === 'text').size
  var vcount = bot.channels.cache.filter(c => c.type === 'voice').size
  message.reply(`${bot.user.username} is on ${scount} servers with ${mcount} members, chatting on ${tcount} text channels, with ${vcount} voice channels!`)
}
});
bot.on('message', message => {
if(message.content.startsWith(`.verify`)) {

  message.member.roles.add("798894327328931888").then(
  message.react('✔')).catch(err => console.log(err)) 

}
  
});

bot.login("Nzk0MzAyODkyNzM1MzMyMzcy.X-42Nw.gv2bdHZizthMGqbojlYMPaX3JnA");

