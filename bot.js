const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Booting up KerbOS.V1...\nWelcome User01, please enter password:');
    client.user.setActivity('with maneuver nodes | ;help')
});

const prefix = ';';

client.on('message', async(message) => {
    if (message.author.bot) return;

    if (message.content.startsWith(prefix)) {
        const args = message.content.toLowerCase().split(' ');
        const command = args.shift().slice(prefix.length);
        
        if (command === 'resorbcalc') {
            message.channel.send('Website: https://meyerweb.com/eric/ksp/resonant-orbits/. Mod Version: https://forum.kerbalspaceprogram.com/index.php?/topic/177833-19x-ksp-resonant-orbit-calculator/.');
        }
        if (command === 'dvmap') {
            message.channel.send('https://i.imgur.com/U3uXJIW.png');
        }
        if (command === 'map') {
            message.channel.send('https://kerbal-maps.finitemonkeys.org');
        }
        if (command === 'transfer') {
            message.channel.send('https://ksp.olex.biz');
        }
        if (command === 'infomods') {
            const examEmbed = new Discord.MessageEmbed()
                .setColor('#63b835')
                .setTitle('List of information mods')
                .addFields({ name: 'Kerbal Wind Tunnel', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/177302-19x-kerbal-wind-tunnel-124/', inline: true }, { name: 'MechJeb', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/154834-110x-anatid-robotics-mumech-mechjeb-autopilot-2110-20th-august-2020/', inline: true }, { name: 'Kerbal Engineer Redux', value: 'https://www.curseforge.com/kerbal/ksp-mods/kerbal-engineer-redux/files', inline: true }, { name: 'Kerbal Alarm Clock', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/22809-19x-kerbal-alarm-clock-v31300-april-26/', inline: true }, { name: 'Trajectories', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/162324-131-110x-trajectories-v234-2020-07-13-atmospheric-predictions/', inline: true }, { name: 'RCS Build Aid', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/166546-19x-rcs-build-aid-continued-new-dependencies/', inline: true }, { name: 'Editor Extensions Redux', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/127378-19x-editor-extensions-redux-released-with-selectroot-merge-stripsymmetry-nooffsetlimits/', inline: true },
                    /*             { name: '', value: ''},
                                { name: '', value: ''},
                                { name: '', value: ''},
                                { name: '', value: ''},
                                { name: '', value: ''},
                                { name: '', value: ''},
                                { name: '', value: ''},
                                { name: '', value: ''},
                                { name: '', value: ''},
                                { name: '', value: ''},
                                { name: '', value: ''},
                                { name: '', value: ''},
                                { name: '', value: ''},
                                { name: '', value: ''},
                                { name: '', value: ''},
                                { name: '', value: ''}, */

                )

            message.channel.send(examEmbed);
        }
        if (command === 'help') {
            const exam1Embed = new Discord.MessageEmbed()
                .setColor('#008000')
                .setTitle('List of commands')
                .addFields(
                    { name: 'help', value: 'You are reading it right now', inline: true },
                    { name: 'infomods', value: 'Lists information mods', inline: true }, 
                    { name: 'transfer', value: 'Gives you a link to interplanetary transfer calculator', inline: true }, 
                    { name: 'map', value: 'Gives you a link to website containing maps of all bodies in KSP', inline: true }, 
                    { name: 'dvmap', value: 'Gives you a ∆v map', inline: true }, 
                    { name: 'resorbcalc', value: 'Links to resonant orbit calulator', inline: true });
                   
                    const infoMessage = await message.channel.send("\`\`\`css\n.Loading_Information\n\`\`\`")

                async function doMessageThing() {
                    await infoMessage.edit(null, exam1Embed)
                }

            client.setTimeout(doMessageThing, 3000)
        }
        if (command === '-;') {
            message.channel.send("i'm trying to distribute my time between working on my bot and this station,ok? i will start tomorrow, i promise");
        }
        if (command === 'c') {
            message.channel.send('u\nm');
        }    
/*         if (command === '') {
            message.channel.send('');
        }
         if (command === '') {
            message.channel.send('');
        }
         if (command === '') {
            message.channel.send('');
        }
        if (command === '') {
            message.channel.send('');
        }
         if (command === '') {
            message.channel.send('');
        }
         if (command === '') {
            message.channel.send('');
        } */
    }

});
client.login(process.env.token); //I want to say thank you to Unknown#9817 for helping me with this code!