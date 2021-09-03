const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async(client, thread) => {
    const logChannel = client.channels.cache.get(config.log_channel_id);
    if (!logChannel) return;
    const allLogs = await thread.guild.fetchAuditLogs({ type: "THREAD_DELETE" });
    const fetchModerator = allLogs.entries.first();
    const embed = new Discord.MessageEmbed()
    .setAuthor(thread.guild.name, thread.guild.iconURL({ dynamic: true }))
    .setDescription(`**<@${fetchModerator.executor.id}> has deleted ${thread.name} thread.**`)
    .addField('Responsible Moderator:', `<@${fetchModerator.executor.id}>`)
    .setTimestamp()
    .setFooter(fetchModerator.executor.tag, fetchModerator.executor.displayAvatarURL({ dynamic: true }))
    return logChannel.send({ embeds: [embed] })
}