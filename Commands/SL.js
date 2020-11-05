// beep boop another useless file
module.exports = {
    name: "serverlist",
    execute(messages, args) {
        if(command === 'serverllist') {
            if (IsOwner(message.member)) {
                let guildsMessage = "";
                for (let guild of client.guilds.cache.array()) {
                    if (guildsMessage.length >= 2000) {
                        break;
                    }
                guildsMessage += "• " + guild.name + "\n";
            } 
            message.channel.send(guildsMessage);
        }
    }
},
};