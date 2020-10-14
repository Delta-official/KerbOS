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
    .catch((error) => { console.error(`[ERR] Failed to load gifs. ${error}`)});
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
                    console.log(`[INF] got addrank message from ${message.member.displayName}`);
                    for (let attachment of message.attachments.array()) {
                        rankgifs.push(attachment.url);
                        console.log(`[INF] added ${attachment.url}`);
                    }
                    // nah, i'm just dumb
                    // So we want to add an approve message to this as well huh
                    // fair enough
                    for (let embed of message.embeds) {
                        rankgifs.push(embed.url)
                        console.log(`[INF] added ${embed.url}`);
                    }
                } else {
                    message.channel.send("Only good posters are allowed to add rank gifs, so post good stuff in order to add gifs")
                    message.react("❌")
                }
            }
            if (message.channel.id === TESTING_CHANNEL_ID) {

            
                console.log(`[INF] got addrank message from ${message.member.displayName}`);
                for (let attachment of message.attachments.array()) {
                    rankgifs.push(attachment.url);
                    console.log(`[INF] added ${attachment.url}`);
                }

                for (let embed of message.embeds) {
                    rankgifs.push(embed.url)
                    console.log(`[INF] added ${embed.url}`);
                }
            } 
        }

        if (command === "removegif") {
            if (isStaff(message.member)) {
                message.reply(`Are you sure?`).then((approve) => { 
                    approve.react(`✅`);
                    console.log(`[INF] Sent approval message`);
                    const filter = (reaction, reactor) => { return reaction.emoji.name === `✅`};
                    const collector = approve.createReactionCollector(filter, { time: 100000 /*?*/ });
                    collector.on('collect', (reaction) => {
                        // reaction.name doesn't exist, problem #1
                        // that should work
                        console.log(`[INF] Collected reaction ${reaction.emoji.name}`);
                         
                        const link = message.content.substring("!removegif".length + 1);
                        rankgifs = rankgifs.filter((item) => { return link.trim() !== item.trim() });
                        console.log(rankgifs);
                        Json.writeFile('./rankgifs.json', { gifs: rankgifs }, (error) => {
                            if (error) {
                                console.error(`Failed to write rankgifs file: ${error}`);
                            }
                        });
                    });
                })
                .catch((error) => {
                    client.users.cache.get(OWNER_ID).send(`${error}`); 
                    console.error(error);
                });
                // IT DIDN'T REMOVE SHIT THOUGH
                // yeah because the goose was never there in the first place
                // it did, the goose gif removed
                // Try getting rid of all the initial rankgifs
                // don't worry I have them backed up
                // well maybe because it's hard coded?
                // YOO IT DIDN'T EXPLODE
                // yoooooo gifs returned and removegif works!!!
                // it didn't work :(
                // i pushed
                // let me do a little bit of debugging
                // holy shit I just realied what's wrong
                // The filter is removing the content of the BOT's message, not the user's
                // pushe again pls
                // oooooooh, this is big brain time
                // *windows BSOD's :(*
                //
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

            // So this filter reduces all the reactions on the message to only
            // -> emojis that came from the bot itself?
            // Oooh, that's what the user.id === message.author.id is for 
            // That actually makes a lot of sense
            // look i don't know how this works i just copied it, 
            // but i know it's making so filter only reacts to user who sent command
            // i know right
            const filter = (reaction, user) => {
                return ['➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            // yes, also check my discord message
            // Perhaps the reason this only works once is the collected.first()?
            embedreact1.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '➡️') {
                        // v This line is probably where the second error is coming from
                        // What is embedreact2.reaction, exactly? That could be a mistake
                        // Did we mean to just say reaction.remove()? instead of embedreact2.reaction.remove()?
                        // Are you sure? The MessageReaction class knows what message it is attached to.
                        // Plus since this one came from the promise, it obviously knows where it was assigned to
                        // In any case, the error told us that embedreact2.reaction doesn't exist
                        // Oh, so this is a lost cause anyway? Since reaction is the user's reaction, right?
                        // but then code won't know where exactly does it need to remove reactions and crash
                        // i've found that in order to remove reactions we need manage messages but we don't need that
                        // because bot can delete his reactions
                        // true
                        // i'm gonna update bot's permissions and invite
                        // embedreact2 isn't exactly a embed but rather a const, maybe that'll help you
                      embedreact1.edit(embedreact2) .then(() => {embedreact2.reaction.removeAll()})
                    }
                })
            // question: why doesn't this place a <- on the second embed?
            // Sure, but when the second embed shows up the only reaction on it
            // is the ->, there isn't a <- at all, and it seems like this code
            // should add it
            // Maybe it's because the embed hasn't been placed on a message yet?
            // Should it be added above ^ after we do embedreact1.edit()?
            // because it's supposed to place it in order <- first then ->
            // but maybe code can't because of order?
            // no no it works perfectly, let me try something
            // also don't delete these comments // K
            // pushing rn

            // Uh, problem: embedreact is a MessageEmbed, 
            // but message embeds _don't_ have a react method

            // look at the docs
            // if you want to, I just want to point out - 
            // embedreact1 is a Message since it returned from a .send
            // embedreact2 is a MessageEmbed since it was made from a new MessageEmbed
            // What about this: every time we .react, it should be on embedreact1, since that's the
            // actual message
            // Ok, cya then, this was fun you too :)
            // this is a fucking hell... maybe we'll debug this later, maybe we should end?
            // i tried making embedreact2 a message too but they just sended at the same time
            // if you think about it's logical
            // but anyway see you later, that was a good time, have a good day :)
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
            message.channel.send("Here's ~~your blood~~ an invite link!\nhttps://discord.com/api/oauth2/authorize?client_id=718879704601329778&permissions=68672&scope=bot");
        }
        if (command === 'ttrank') {
        message.channel.send("It's broken, just don't use it till i say it's fixed")
        }
        if (message.content.startsWith(prefix + 'kill')) {
            if (isStaff(message.member)) {
                process.exit();
            }
        } // Put console.log dumps in discord pls
        if (message.content.startsWith(prefix + 'serverlist')) {
            if (isStaff(message.member)) {
                message.channel.send(client.guilds);
            }
        }  // this doesn't work because it can't send empty messages, it says this in console log when i call this command
        if (command === 'transfer') {
            message.channel.send('https://cdn.discordapp.com/attachments/586948600009981970/764341001854648340/upZStSY.png');
        }
        if (command === 'ksphelp') {
            // i will create list of links here in an array, but i need them to check if ;ksphelp has docking
            // or orbit at the same time
            
            
            message.channel.send('');
        }
 /*       if (command === '') {
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

// We must be using hasPermission wrong then?
// ..
function isStaff(member) {
    return member.hasPermission(ADMIN_PERMISSIONS) || member.id === OWNER_ID;
}
// yep
// so like function above is broken, it only works if i type in the command but not the staff, we should fix this 
// (yes i know i break everything)
function addRankGif(gif) {
    rankgifs.push(gif);
}
// to people who got source code of my bot, congrats you are hackers! (or i just gave it to you for some reason)
client.login(Token.auth); //I want to say thank you to Unknown#9817 and Breadcrumbs#7818 for helping me with this code!
