const fs = require("fs")
const Discord = require('discord.js');
const Json = require('jsonfile');
const Token = require('./token.js');
// wait, it's all shitty JS? always has been
let rankgifs = []
const NEWS_ID = "527010080948879387"
const LORD_ID = "196749490034573312"
const JEDITOBIWAN_SERVER_ID = "357324444982837261";
const OWNER2_ID = "223524655389081600"
const LP_ID = '438553700492115968'
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

// IDEAS BELOW:
// change prefix to something like sudo or something like that (idk i don't use terminal that often) so it looks like it's a real terminal
// create custom pfp for my bot
// dump all of those consts into .json file (idea made by Klaas)
const client = new Discord.Client();
client.commands = new Discord.Collection();

const OwnerCommands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
const STBCommands = fs.readdirSync("./SZB_Commands").filter(file => file.endsWith(".js"));

for(const file of OwnerCommands) {
    const command0 = require(`./Commands/${file}`)
    client.commands.set(command.name, command)
}
for(const file of STBCommands) {
    const command1 = require(`./SZB_Commands${file}`)
    client.commands.set(command.name, command)
}

let Lpass
client.on('ready', () => {
    console.log('Booting up KerbOS.V1...\nWelcome User01, please enter password:\n Bread_is_cool12345');
    //  _  __         _      ____   _____      
    // | |/ /        | |    / __ \ / ____|  
    // | ' / ___ _ __| |__ | |  | | (___      
    // |  < / _ \ '__| '_ \| |  | |\___ \        
    // | . \  __/ |  | |_) | |__| |____) |        
    // |_|\_\___|_|  |_.__/ \____/|_____/         
    client.user.setActivity('with RCS | ;help');
    Json.readFile("./rankgifs.json")
    .then((obj) => { rankgifs = obj.gifs })
    .catch((error) => { logToAll(`[ERR] Failed to load gifs. ${error}`)});
    client.guilds.fetch(STRATZ_SERVER_ID).then((stratzGuild) => {
        Lpass = stratzGuild.roles.cache.find(Lpass => Lpass.id === "438553700492115968");
    });
});
let canNotifyStreaming = true;
let blocker = {}

client.on("presenceUpdate", (oldPresence, newPresence) => {
    if(newPresence.user.id === LORD_ID) {
    if(newPresence.guild.id === STRATZ_SERVER_ID) {
    if (!newPresence.activities) return false;
    newPresence.activities.forEach(activity => {
        if (activity.type == "STREAMING") {
            if (canNotifyStreaming) {
                if(activity.url.startsWith("www.youtube.com")) {
                    itsYOUTUBESTREAMTIME();
                    canNotifyStreaming = false;
                    setTimeout(() => { canNotifyStreaming = true; }, 86400000);
                } else if(activity.url.startsWith("www.twitch.tv")) {
                    itsSTREAMTIME();
                    canNotifyStreaming = false;
                    setTimeout(() => { canNotifyStreaming = true; }, 86400000);
                }
            }
        };
    });
   }
 }
});
/*client.on("roleUpdate", ())*/

// Our entire code in a nutshell:
// OOPSIE WOOPSIE!! UwU We made a fucky wucky!! 
// A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this
// i'm not going to delete this
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

        if (command === "addrank") {
            if(message.guild.id === STRATZ_SERVER_ID || JEDITOBIWAN_SERVER_ID) {
            if(isStaff(message.member)) {
            if(blocker[message.author.id] === false || blocker[message.author.id] === undefined) {
            if (message.guild.id === STRATZ_SERVER_ID) {
                if (message.member.roles.cache.has(GOOD_POSTER_RANK_ID)) {
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
                } else {
                    message.channel.send("Only good posters are allowed to add rank gifs, so post good stuff in order to add gifs")
                    message.react("❌")
                }
            } else if(message.guild.id === JEDITOBIWAN_SERVER_ID) {
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
        }
        }
            blocker[message.author.id] = true
            setTimeout(() => {blocker[message.author.id] = false}, 3600000)
        }
        if (command === "removegif") {
            if(message.guild.id === STRATZ_SERVER_ID || JEDITOBIWAN_SERVER_ID) {
            if (isStaff(message.member)) {
                message.reply(`Are you sure?`).then((approve) => { 
                    approve.react(`✅`);
                    logToAll(`[INF] Sent approval message`);
                    const filter = (reaction, reactor) => { return reaction.emoji.name === `✅` && reactor.id !== client.user.id };
                    let collector = approve.createReactionCollector(filter, { time: 120000 });
                    collector.on('collect', (reaction) => {
                        // reaction.name doesn't exist, problem #1
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
                    .catch((error) => {
                        logToAll(error);
                    });
                }
            }
        }
        if (command === "showall") {
            if(message.guild.id === STRATZ_SERVER_ID || JEDITOBIWAN_SERVER_ID) {
            if (isStaff(message.member)) {
            message.channel.send("Showing all current rankgifs.")
            for (let gif of rankgifs) {
                message.channel.send(gif);
                // 7355608
            }
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
            if(message.guild.id === STRATZ_SERVER_ID || JEDITOBIWAN_SERVER_ID) {
            const exam1Embed = new Discord.MessageEmbed()
                .setColor('#008000')
                .setTitle('List of commands')
                .setAuthor("Bot created by Darkuss#9279, Breadcrumbs#7818 and Unknown#9817")
                .addFields(
                    { name: 'help', value: 'You are reading it right now', inline: true },
                    { name: '~~utilitymods~~', value: '~~Lists utility mods~~\nCurrently upgrading', inline: true }, 
                    { name: 'transfercalc', value: 'Gives you a link to interplanetary transfer calculator', inline: true }, 
                    { name: 'map', value: 'Gives you a link to website containing maps of all bodies in KSP', inline: true }, 
                    { name: 'dvmap', value: 'Gives you a ∆v map', inline: true }, 
                    { name: 'resorbcalc', value: 'Links to resonant orbit calulator', inline: true },
                    { name: 'invite', value: "Gives you bot's invite link", inline: true},
                    { name: "rank", value: "Shows your rank, use with ! as prefix", inline: true },
                    { name: "support", value: "Gives you support / feedback server's invite link", inline: true },
                    { name: "transfer", value: "Gives you transfer window map", inline: true });
                //const infoMessage = await message.channel.send("\`\`\`css\n.Loading_Information\n\`\`\`")

                /*async function doMessageThing() {
                    await infoMessage.edit(null, exam1Embed)
                }*/
            
            //client.setTimeout(doMessageThing, 1500) //what should i do with this code???
            message.channel.send(exam1Embed)
            } else{
                const exam2Embed = new Discord.MessageEmbed()
                .setColor('#008000')
                .setTitle('List of commands')
                .setAuthor("Bot created by Darkuss#9279, Breadcrumbs#7818 and Unknown#9817")
                .addFields(
                    { name: 'help', value: 'You are reading it right now', inline: true },
                    { name: '~~utilitymods~~', value: "~~Lists utility mods currently in bot's code~~\nCurrently upgrading", inline: true }, 
                    { name: 'transfercalc', value: 'Gives you a link to interplanetary transfer calculator', inline: true }, 
                    { name: 'map', value: 'Gives you a link to a website containing maps of all bodies in KSP', inline: true }, 
                    { name: 'dvmap', value: 'Gives you a ∆v map', inline: true }, 
                    { name: 'resorbcalc', value: 'Links to resonant orbit calulator', inline: true },
                    { name: 'invite', value: "Gives you bot's invite link", inline: true},
                    { name: "support", value: "Gives you support / feedback server's invite link", inline: true },
                    { name: "transfer", value: "Gives you transfer window map", inline: true });
                message.channel.send(exam2Embed)
            }

        } // looks like we have to fuck with filters again, great
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
            if (IsOwner(message.member)) {
                process.exit();
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

        }
        if(command === 'BD') {
        client.command0.get("BD").execute(messages, args)
        }
        if (command === 'support') {
            message.channel.send("Here's your server invite link!\nhttps://discord.gg/5Q9Mx32 ");
        }
    }
});

function isStaff(member) {
    return member.hasPermission(ADMIN_PERMISSIONS) || member.id === OWNER_ID;
}
function IsOwner(member) {
    return member.id === OWNER_ID || OWNER2_ID;
}

function addRankGif(gif) {
    rankgifs.push(gif);
}
// UNLIMITED RECURSIVE POWER!
function logToAll(message) {
    console.log(message);
    client.users.cache.get(OWNER_ID).send(message);
}
function itsSTREAMTIME() {
    client.channel.id.get(NEWS_ID).send(`Hey <@everyone>, Stratzenblitz is streaming at ${activity.url}!`)
}
function itsYOUTUBESTREAMTIME() {
    client.channel.id.get(NEWS_ID).send(`Hey everyone, Stratzenblitz is streaming at ${activity.url}!`)
}
// i'm hungry
// i'm really hungry
// i'm __really__ hungry
// statement below is outdated because my bot is open source now lmao
// to people who got source code of my bot, congrats you are hackers! (or i just gave it to you for some reason)
client.login(Token.auth); //I want to say thank you to Unknown#9817 and Breadcrumbs#7818 for helping me with this code!
