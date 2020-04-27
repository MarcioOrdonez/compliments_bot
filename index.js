const Discord = require('discord.js');
const bot = new Discord.Client();
const request = require('request');
require('dotenv').config();
const ytdl = require('ytdl-core');


const token = process.env.TOKEN || '';
const compliments = ['incrivel', 'linda', 'maravilhosa', 'D+', 'Muito legal', 'Que nunca votaria no babu'];
const doggy = 'https://dog.ceo/api/breeds/image/random';
const catty = 'https://api.thecatapi.com/v1/images/search';
const queue = ['https://www.youtube.com/watch?v=jkJ5q2NxHf4'];

bot.on('ready', () =>{
    console.log('Bot is running! ');
});



bot.on('message', msg =>{
    if (msg.content === "Estou triste"){
        msg.reply('Não fique triste voce é uma pessoa '+compliments[Math.floor(Math.random()*compliments.length)]);
    }
    if (msg.content === 'AU'){
        request(doggy, {json: true}, (err, res, body)=>{
            if(err){
                return msg.reply('Deu erro :(');
            }
            return msg.reply(body.message);
        })
    }
    if (msg.content === 'MIAU'){
        request(catty, {json: true}, (err, res, body)=>{
            if(err){
                return msg.reply('Deu erro :(');
            }
            return msg.reply(body[0].url);
        })
    }
    var args = msg.content.substring().split(" ");
    if (args[0]==='!DJ'){
        switch(args[1]){
            case 'play':
                function start(connection, msg){
                    connection.play(ytdl(queue[0], {filter:'audioonly'}));
                }

                if(!msg.member.voice.channel){
                    return msg.reply('Voce precisa estar em um canal pra festa poder comerçar rs');
                }
                if(!msg.guild.voiceConnection) msg.member.voice.channel.join().then( (connection)=>{
                    start(connection, msg);
                })
            break;
        }
    }



})

bot.login(token);