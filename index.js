const Discord = require('discord.js');
const bot = new Discord.Client();
const request = require('request');
require('dotenv').config();
const ytdl = require('ytdl-core');


const token = process.env.TOKEN || '';
const compliments = ['incrivel', 'linda', 'maravilhosa', 'D+', 'Muito legal', 'Que nunca votaria no babu'];
const doggy = 'https://dog.ceo/api/breeds/image/random';
const catty = 'https://api.thecatapi.com/v1/images/search';
const queue = ['https://www.youtube.com/watch?v=jkJ5q2NxHf4','https://www.youtube.com/watch?v=r9tBBvvLkd8'];
var volume = 0.5;
bot.on('ready', () =>{
    console.log('Bot is running! ');
});



bot.on('message', msg =>{
    if (msg.content.toLowerCase().includes("estou triste")){
        msg.reply('Não fique triste voce é uma pessoa '+compliments[Math.floor(Math.random()*compliments.length)]);
    }
    if (msg.content.toLowerCase().includes('auau')){
        request(doggy, {json: true}, (err, res, body)=>{
            if(err){
                return msg.reply('Deu erro :(');
            }
            return msg.reply(body.message);
        })
    }
    if (msg.content.toLowerCase().includes('miau')){
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
                    queue.dispatcher = connection.play(ytdl(queue[0], {filter:'audioonly'}));
                    // return connection.play(ytdl(queue[0], {filter:'audioonly'}));
                    return;
                }

                if(!msg.member.voice.channel){
                    return msg.reply('Voce precisa estar em um canal pra festa poder comerçar rs');
                }
                if(!msg.guild.voiceConnection) msg.member.voice.channel.join().then( (connection)=>{
                    // var dispatcher = start(connection, msg);
                    start(connection, msg);
                    queue.dispatcher.setVolume(volume);
                })
            break;
            case 'stop':
                if(queue.dispatcher) queue.dispatcher.destroy();
            break;
            case 'pause':
                if(queue.dispatcher) queue.dispatcher.pause();
            break;
            case 'resume':
                if(queue.dispatcher) queue.dispatcher.resume();
            break;
            case '+':
                if(volume < 90) volume = volume + 0.10;
                queue.dispatcher.setVolume(volume);
            break;
            case '-':
                if(volume > 10 )volume = volume - 0.10;
                queue.dispatcher.setVolume(volume);
            break;
        }
    }



})

bot.login(token);