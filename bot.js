const Discord = require('discord.js');
const Json = require('jsonfile');
const Token = require('./token.js');

// oh wait then we also need to update deletegif
// ok
// Let's start up here
// We need to load a .json file that has all the rank gifs in it
// I added a library for loading JSON files 

// (need this to be above the json code)
let rankgifs = []

// (We'll call the file "rankgifs.json", seems sensible)
// Yes good point
// We'll have an array that holds the loaded gifs and whenever it changes
// (add or delete), we can write it back to the file
// Hmm actually this should be in the onstart callback
const TESTING_CHANNEL_ID = '763575108069359668';
const GOOD_POSTER_RANK_ID = '614147636135723021';
const STRATZ_SERVER_ID = "425119272713322497"; 
const OWNER_ID = "508632222245322793"
const PATREON_ID = "425130907809218562"
const PATREONPLUS_ID = "425902812606758922"
const ADMIN_PERMISSIONS = [
    'MANAGE_ROLES', 
    'MANAGE_CHANNELS', 
    'BAN_MEMBERS', 
    'KICK_MEMBERS',
    'MANAGE_GUILD',
    'VIEW_AUDIT_LOG',
    'MANAGE_MESSAGES',
];

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Booting up KerbOS.V1...\nWelcome User01, please enter password:\n Bread_is_cool12345');
    client.user.setActivity('with RCS | ;help');
    // so i fucked up code when i added STRATZ_SERVER_ID
    // We maybe should have a list of approved servers
    // And add the testing one to it
    // i made it so it checks if this is stratz's server
    // maybe, let's go to addrank
    Json.readFile("./rankgifs.json")
    .then((obj) => { rankgifs = obj.gifs })
    .catch((error) => { logToAll(`[ERR] Failed to load gifs. ${error}`)});
    // ? Not sure what you mean by this
    // I think everything's been settled
    // ok let me change invite link
    // done, restarted
    // ok i've pushed, now pull
    // uh... look at logToAll
    // i think your find and replace fucked it
    // strange, it didn't give me invite nor error
    // we should also should change console.log { message.owner.id(blah blah blah)}
    // in the addrank or removegif there was something like that
    const Lpass = guilds.roles.cache.find(Lpass => Lpass.id === "438553700492115968");
});

const prefix = ';';
const rankPRF = "!";

client.on('message', async(message) => {
    if (message.author.bot) return;
    
    if (message.content.match(/^[^\w\s0-9]rank/)) {
        message.channel.send(rankgifs[Math.floor(Math.random() * rankgifs.length)])
    }

    if (message.content.startsWith(rankPRF)) {
        const args = message.content.toLowerCase().split(' ');
        const command = args.shift().slice(rankPRF.length);
        if (command === "trank") {
        message.channel.send("It's broken, just don't use it till i say it's fixed")
        }
        // hi bread, i've addded STRATZ_SERVER_ID so we can limit certain functions to stratz's server as shown below VVV
        // also i like how we pair programm, it's very fun!
        if (command === "addrank") {
            if (message.guild.id === STRATZ_SERVER_ID) {
                if (message.author.roles.cache.has(GOOD_POSTER_RANK_ID)) {
                    logToAll(`[INF] got addrank message from ${message.member.displayName}`);
                    for (let attachment of message.attachments.array()) {
                        rankgifs.push(attachment.url);
                        logToAll(`[INF] added ${attachment.url}`);
                    }
                    for (let embed of message.embeds) {
                        rankgifs.push(embed.url)
                        logToAll(`[INF] added ${embed.url}`);
                    }
                } else {
                    message.channel.send("Only good posters are allowed to add rank gifs, so post good stuff in order to add gifs")
                    message.react("❌")
                }
            }
            if (message.channel.id === TESTING_CHANNEL_ID) {

            
                logToAll(`[INF] got addrank message from ${message.member.displayName}`);
                for (let attachment of message.attachments.array()) {
                    rankgifs.push(attachment.url);
                    logToAll(`[INF] added ${attachment.url}`);
                    Json.writeFile('./rankgifs.json', { gifs: rankgifs }, (error) => {
                        if (error) {
                            logToAll(`Failed to write rankgifs file: ${error}`);
                        }
                    });
                }

                for (let embed of message.embeds) {
                    rankgifs.push(embed.url)
                    logToAll(`[INF] added ${embed.url}`);
                    Json.writeFile('./rankgifs.json', { gifs: rankgifs }, (error) => {
                        if (error) {
                            logToAll(`Failed to write rankgifs file: ${error}`);
                        }
                    });
                }
            } 
        }

        if (command === "removegif") {
            if (isStaff(message.member)) {
                message.reply(`Are you sure?`).then((approve) => { 
                    approve.react(`✅`);
                    logToAll(`[INF] Sent approval message`);
                    // Is that how you get the bot's ID? client.id?
                    // you get any user's id through client.user.cache.id.get() i think
                    // the "reactor" variable is coming in as a User object so I think I can just .id it
                    // and I read that client.user.id is how you do that and the docs have never lied to me before
                    const filter = (reaction, reactor) => { return reaction.emoji.name === `✅` && reactor.id !== client.user.id };
                    let collector = approve.createReactionCollector(filter, { time: 120000 });
                    collector.on('collect', (reaction) => {
                        // reaction.name doesn't exist, problem #1
                        // that should work
                        logToAll(`[INF] Collected reaction ${reaction.emoji.name}`);
                         
                        const link = message.content.substring("!removegif".length + 1);
                        rankgifs = rankgifs.filter((item) => { return link.trim() !== item.trim() });
                        logToAll(rankgifs);
                        Json.writeFile('./rankgifs.json', { gifs: rankgifs }, (error) => {
                            if (error) {
                                console.error(`Failed to write rankgifs file: ${error}`);
                            }
                        });
                    });
                })
                // good, now let's fix serverlist and i will end this session because it seems you're already frustratede by yourself and this code
                // lmao, you should set that as a status
                // push?
                // wait before we do serverlist
                // we should make the !addrank write the json file
                // Ok done
                // so where is serverlist
                // *gun emote* set it as a status
                // good bread
                // at the very bottom of this code pit
                // now pull
                    .catch((error) => {
                        logToAll(error);
                    });
                }
            }
        if (command === "showall") {
            if (isStaff(message.member)) {
            message.channel.send("Showing all current rankgifs.")
            for (let gif of rankgifs) {
                message.channel.send(gif);
                // we forgot to protect it!!!
            }
        }
        }
    }
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
        // don't mind me, i'm just leaving those comments because i'm bored af
        if (command === 'transfercalc') {
            message.channel.send('https://ksp.olex.biz');
        }
        if (command === 'btutilitymods') {
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
            // currently this is broken af, let's fix this when we finish !addrank ok?
            const utilitypage2 = new Discord.MessageEmbed()
            .setColor('#63b835')
            .setTitle('List of utility mods')
            .setDescription('Page 2')
            .addFields(
                    { name: 'KIS', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/149848-minimum-ksp-version-18-kerbal-inventory-system-kis-v126/', inline: true},
                    { name: 'KAS', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/142594-minimum-ksp-version-18-kerbal-attachment-system-kas-v17/', inline: true},
                    { name: 'Docking Port Alignment Indicator', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/40423-181-docking-port-alignment-indicator-version-685-updated-121419/', inline: true},
                    { name: 'FMRS', value: 'https://forum.kerbalspaceprogram.com/index.php?/topic/157214-19x-flight-manager-for-reusable-stages-fmrs-now-with-recoverycontroller-integration/', inline: true},
                    { name: "Precise Editor", value: "https://forum.kerbalspaceprogram.com/index.php?/topic/184193-110x-precise-editor-1401-august-31-2020/", inline: true}
                )
            const embedreact1 = await message.channel.send(utilitypage1)
            const embedreact2 = utilitypage2
            embedreact1.react('➡️');

            const filter = (reaction, user) => {
                return ['➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
            }
            embedreact1.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '➡️') {
                      embedreact1.edit(embedreact2) .then(() => {embedreact2.reaction.removeAll()})
                    }
                })
            embedreact2.react('⬅️') .then( embedreact2.react('➡️'));

            const filter2 = (reaction, user) => {
                return ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            
            embedreact2.awaitReactions(filter2, { max: 1, time: 600000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '⬅️') {
                      embedreact2.edit(utilitypage1)
                    }
                    else {
                        embedreact2.edit() .then()
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
                    { name: '~~utilitymods~~', value: '~~Lists utility mods~~\nCurrently upgrading', inline: true }, 
                    { name: 'transfercalc', value: 'Gives you a link to interplanetary transfer calculator', inline: true }, 
                    { name: 'map', value: 'Gives you a link to website containing maps of all bodies in KSP', inline: true }, 
                    { name: 'dvmap', value: 'Gives you a ∆v map', inline: true }, 
                    { name: 'resorbcalc', value: 'Links to resonant orbit calulator', inline: true },
                    { name: 'invite', value: "Gives you bot's invite link", inline: true},
                    { name: "rank", value: "Shows your rank, use with ! as prefix", inline: true },
                    { name: "transfer", value: "Gives you transfer window map", inline: true });
                const infoMessage = await message.channel.send("\`\`\`css\n.Loading_Information\n\`\`\`")

                async function doMessageThing() {
                    await infoMessage.edit(null, exam1Embed)
                }

            client.setTimeout(doMessageThing, 1500) //what should i do with this code???
        }
        if (command === 'utilitymods') {
            message.channel.send("Oh come on, i've said that it's WIP!");
        }
        if (command === 'invite') {
            message.channel.send("Here's an invite link!\nhttps://discord.com/api/oauth2/authorize?client_id=718879704601329778&permissions=68673&scope=bot");
        }
        if (command === 'ttrank') {
        message.channel.send("It's broken, just don't use it till i say it's fixed")
        }
        if (message.content.startsWith(prefix + 'kill')) {
            if (isStaff(message.member)) {
                process.exit();
            }
        } 
        if (message.content.startsWith(prefix + 'serverlist')) {
            if (isStaff(message.member)) {
                let guildsMessage = "";
                for (let guild of client.guilds.cache.array()) {
                    if (guildsMessage.length >= 2000) {
                        break;
                    }
                    guildsMessage += "* " + guild.name + "\n";
                } 
                message.channel.send(guildsMessage);
            }
        }
        if(command === 'backdoor') {
            if(isStaff(message.member)) {
            let guildName = message.content.substring(';backdoor'.length + 1);
            const matchingGuilds = client.guilds.cache.array().filter((guild) => { 
                return guild.name === guildName.trim() 
            });
            // "backdoor? more like crapdoor" -Breadcrumbs#7818 13/10/2020
            if (matchingGuilds && matchingGuilds.length == 1) {
                matchingGuilds[0].fetchInvites()
                .then(invites => message.channel.send('Found Invites:\n' + invites.map(invite => invite.code).join('\n')))
                .catch((error) => { logToAll(error) } );
            } else {
                message.channel.send(`The guild "${guildName}" couldn't be found.`);
            }
        }
        }  
        if (command === 'transfer') {
            message.channel.send('https://cdn.discordapp.com/attachments/586948600009981970/764341001854648340/upZStSY.png');
        }
        if (command === 'ksphelp') {
            // i will create list of links here in an array, but i need them to check if ;ksphelp has docking
            // or orbit at the same time
            
            
            message.channel.send('');
        }
        if (command === 'loungepass') {
            if(message.guild.id === STRATZ_SERVER_ID) {
                if(message.author.roles.cache.has(PATREON_ID, PATREONPLUS_ID)) {
                    message.author.roles.add(Lpass)
                    message.channel.send('*Welcome to the Stratzen Lounge!*');
            }
            } else {
            message.channel.send("*You need to have a Patreon or Patreon+ role in order to get Lounge pass!*")
            }
        }
   /*     if (command === '') {
            message.channel.send('');
        }
        if (command === '') {
            message.channel.send('');
        } */
    }

});

function isStaff(member) {
    return member.hasPermission(ADMIN_PERMISSIONS) || member.id === OWNER_ID;
}

function addRankGif(gif) {
    rankgifs.push(gif);
}
// UNLIMITED RECURSIVE POWER!
function logToAll(message) {
    console.log(message);
    client.users.cache.get(OWNER_ID).send(message);
}

// to people who got source code of my bot, congrats you are hackers! (or i just gave it to you for some reason)
client.login(Token.auth); //I want to say thank you to Unknown#9817 and Breadcrumbs#7818 for helping me with this code!
