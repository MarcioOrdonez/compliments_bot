const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NzAzOTYyNjk4MzIwNDQ1NDcx.XqWOjg.6A09ShldL_BdiescigNLscCJp_A';
const compliments = ['incrivel', 'linda', 'maravilhosa', 'D+', 'Muito legal', 'Que nunca votaria no babu'];

bot.on('ready', () =>{
    console.log('Bot is running! ');
});

bot.on('message', msg =>{
    if (msg.content === "Estou triste"){
        msg.reply('Não fique triste voce é uma pessoa '+compliments[Math.floor(Math.random()*compliments.length)]);
    }
})
Math.ceil(Math.random())

bot.login(token);