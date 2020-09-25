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
        if (command === 'utilitymods') {
            const utilitypage1 = new Discord.MessageEmbed()
            .setColor('#63b835')
            .setTitle('List of utility mods')
            .setDescription('Page 1')
            .addFields(
                { name: 'Kerbal Wind Tunnel', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/177302-19x-kerbal-wind-tunnel-124/', inline: true }, 
                { name: 'MechJeb', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/154834-110x-anatid-robotics-mumech-mechjeb-autopilot-2110-20th-august-2020/', inline: true }, 
                { name: 'Kerbal Engineer Redux', value: 'https://www.curseforge.com/kerbal/ksp-mods/kerbal-engineer-redux/files', inline: true }, 
                { name: 'Kerbal Alarm Clock', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/22809-19x-kerbal-alarm-clock-v31300-april-26/', inline: true }, 
                { name: 'Trajectories', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/162324-131-110x-trajectories-v234-2020-07-13-atmospheric-predictions/', inline: true }, 
                { name: 'RCS Build Aid', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/166546-19x-rcs-build-aid-continued-new-dependencies/', inline: true }, 
                { name: 'Editor Extensions Redux', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/127378-19x-editor-extensions-redux-released-with-selectroot-merge-stripsymmetry-nooffsetlimits/', inline: true },
                { name: 'Better Time Warp', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/154935-15-bettertimewarpcontinued-customizable-time-warp-and-lossless-physics-warp/', inline: true},
                { name: 'Hangar Extender Extended', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/162790-151-hangar-extender-extended/', inline: true},
                )
            const embedreact1 = await message.channel.send(utilitypage1)
            embedreact1.react('➡️');

            const filter = (reaction, user) => {
                return ['➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            
            embedreact1.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '➡️') {
                      embedreact2.edit(embedreact1)
                    }
                })

            const utilitypage2 = new Discord.MessageEmbed()
            .setColor('#63b835')
            .setTitle('List of utility mods')
            .setDescription('Page 2')
            .addFields(
                { name: 'KIS', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/149848-minimum-ksp-version-18-kerbal-inventory-system-kis-v126/', inline: true},
                { name: 'KAS', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/142594-minimum-ksp-version-18-kerbal-attachment-system-kas-v17/', inline: true},
                { name: 'Docking Port Alignment Indicator', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/40423-181-docking-port-alignment-indicator-version-685-updated-121419/', inline: true},
                { name: 'FMRS', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/157214-19x-flight-manager-for-reusable-stages-fmrs-now-with-recoverycontroller-integration/', inline: true},
            )
            const embedreact2 = utilitypage1.edit(utilitypage2)


            embedreact2.react('⬅️').then(() => embedreact2.react('➡️'));

            const filter2 = (reaction, user) => {
                return ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            
            embedreact2.awaitReactions(filter2, { max: 1, time: 600000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '⬅️') {
                      embedreact2.edit(embedreact1)
                    }
                    else {
                        embedreact2.edit()
                    }
                })
        }
        if (command === 'help') {
            const exam1Embed = new Discord.MessageEmbed()
                .setColor('#008000')
                .setTitle('List of commands')
                .setAuthor("Bot created by Darkuss#9279")
                .addFields(
                    { name: 'help', value: 'You are reading it right now', inline: true },
                    { name: 'utilitymods', value: 'Lists utility mods', inline: true }, 
                    { name: 'transfer', value: 'Gives you a link to interplanetary transfer calculator', inline: true }, 
                    { name: 'map', value: 'Gives you a link to website containing maps of all bodies in KSP', inline: true }, 
                    { name: 'dvmap', value: 'Gives you a ∆v map', inline: true }, 
                    { name: 'resorbcalc', value: 'Links to resonant orbit calulator', inline: true },
                    { name: 'invite', value: "Gives you bot's invite link", inline: true});
                const infoMessage = await message.channel.send("\`\`\`css\n.Loading_Information\n\`\`\`")

                async function doMessageThing() {
                    await infoMessage.edit(null, exam1Embed)
                }

            client.setTimeout(doMessageThing, 1500)
        }
        if (command === '') {
            message.channel.send("");
        }
        if (command === '') {
            message.channel.send('');
        }    
        if (command === 'invite') {
            message.channel.send("Here's an invite link!\nhttps://discord.com/api/oauth2/authorize?client_id=718879704601329778&permissions=68672&scope=bot");
        }
    /*     if (command === '') {
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