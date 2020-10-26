module.exports = {
    name: "LP",
    execute(messages, args) {
        if(message.guild.id === STRATZ_SERVER_ID) {
            if(message.member.roles.cache.has(PATREON_ID, PATREONPLUS_ID)) {
                member.roles.add(Lpass)
                message.channel.send('*Welcome to the Stratzen Lounge!*');
        }
        } else {
        message.channel.send("*You need to have a Patreon or Patreon+ role in order to get Lounge Pass!*")
        }
            if(message.member.roles.cache.has(LP_ID)) {
                message.channel.send("*You already have Lounge Pass!")
            }
    }
}