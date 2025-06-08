// commands/admin.js

const fs = require('fs');
const path = require('path');

const bannedUsersFile = path.join(__dirname, '../data/bannedUsers.json');

// Load or create banned users list
function loadBannedUsers() {
  try {
    const data = fs.readFileSync(bannedUsersFile);
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save banned users list
function saveBannedUsers(list) {
  fs.writeFileSync(bannedUsersFile, JSON.stringify(list, null, 2));
}

module.exports = {
  kick: async (msg, client) => {
    if (!msg.isGroupMsg) {
      return client.sendMessage(msg.from, '⚠️ This command works only in groups.');
    }
    if (!msg.isGroupAdmins) {
      return client.sendMessage(msg.from, '❌ You must be a group admin to use this command.');
    }

    const mentioned = msg.mentionedIds;
    if (mentioned.length === 0) {
      return client.sendMessage(msg.from, '⚠️ Please mention the user to kick. Example: .kick @username');
    }

    try {
      await client.removeParticipant(msg.from, mentioned[0]);
      await client.sendMessage(msg.from, '✅ User kicked successfully.');
    } catch (err) {
      await client.sendMessage(msg.from, `❌ Failed to kick user: ${err.message}`);
    }
  },

  ban: async (msg, client) => {
    if (!msg.isGroupMsg) {
      return client.sendMessage(msg.from, '⚠️ This command works only in groups.');
    }
    if (!msg.isGroupAdmins) {
      return client.sendMessage(msg.from, '❌ You must be a group admin to use this command.');
    }

    const mentioned = msg.mentionedIds;
    if (mentioned.length === 0) {
      return client.sendMessage(msg.from, '⚠️ Please mention the user to ban. Example: .ban @username');
    }

    let bannedUsers = loadBannedUsers();
    if (bannedUsers.includes(mentioned[0])) {
      return client.sendMessage(msg.from, 'ℹ️ User is already banned.');
    }
    bannedUsers.push(mentioned[0]);
    saveBannedUsers(bannedUsers);

    await client.sendMessage(msg.from, '✅ User has been banned from using the bot.');
  },

  unban: async (msg, client) => {
    if (!msg.isGroupMsg) {
      return client.sendMessage(msg.from, '⚠️ This command works only in groups.');
    }
    if (!msg.isGroupAdmins) {
      return client.sendMessage(msg.from, '❌ You must be a group admin to use this command.');
    }

    const mentioned = msg.mentionedIds;
    if (mentioned.length === 0) {
      return client.sendMessage(msg.from, '⚠️ Please mention the user to unban. Example: .unban @username');
    }

    let bannedUsers = loadBannedUsers();
    bannedUsers = bannedUsers.filter(u => u !== mentioned[0]);
    saveBannedUsers(bannedUsers);

    await client.sendMessage(msg.from, '✅ User has been unbanned.');
  },

  mute: async (msg, client) => {
    await client.sendMessage(msg.from, '🔇 Mute feature is coming soon.');
  },

  unmute: async (msg, client) => {
    await client.sendMessage(msg.from, '🔊 Unmute feature is coming soon.');
  },

  warn: async (msg, client) => {
    const mentioned = msg.mentionedIds;
    if (mentioned.length === 0) {
      return client.sendMessage(msg.from, '⚠️ Please mention the user to warn. Example: .warn @username');
    }
    await client.sendMessage(msg.from, `⚠️ User <@${mentioned[0]}> has been warned.`);
  },

  promote: async (msg, client) => {
    if (!msg.isGroupMsg) {
      return client.sendMessage(msg.from, '⚠️ This command works only in groups.');
    }
    if (!msg.isGroupAdmins) {
      return client.sendMessage(msg.from, '❌ You must be a group admin to use this command.');
    }

    const mentioned = msg.mentionedIds;
    if (mentioned.length === 0) {
      return client.sendMessage(msg.from, '⚠️ Please mention the user to promote. Example: .promote @username');
    }

    try {
      await client.promoteParticipant(msg.from, mentioned[0]);
      await client.sendMessage(msg.from, '✅ User promoted to admin.');
    } catch (err) {
      await client.sendMessage(msg.from, `❌ Failed to promote user: ${err.message}`);
    }
  },

  demote: async (msg, client) => {
    if (!msg.isGroupMsg) {
      return client.sendMessage(msg.from, '⚠️ This command works only in groups.');
    }
    if (!msg.isGroupAdmins) {
      return client.sendMessage(msg.from, '❌ You must be a group admin to use this command.');
    }

    const mentioned = msg.mentionedIds;
    if (mentioned.length === 0) {
      return client.sendMessage(msg.from, '⚠️ Please mention the user to demote. Example: .demote @username');
    }

    try {
      await client.demoteParticipant(msg.from, mentioned[0]);
      await client.sendMessage(msg.from, '✅ User demoted from admin.');
    } catch (err) {
      await client.sendMessage(msg.from, `❌ Failed to demote user: ${err.message}`);
    }
  },

  listadmins: async (msg, client) => {
    if (!msg.isGroupMsg) {
      return client.sendMessage(msg.from, '⚠️ This command works only in groups.');
    }

    const group = await client.getGroupMetadata(msg.from);
    const admins = group.participants.filter(p => p.isAdmin).map(p => `@${p.id.replace('@c.us', '')}`).join('\n');

    await client.sendMessage(msg.from, `👑 Group Admins:\n${admins}`);
  },

  grouplink: async (msg, client) => {
    if (!msg.isGroupMsg) {
      return client.sendMessage(msg.from, '⚠️ This command works only in groups.');
    }

    try {
      const inviteCode = await client.getGroupInviteCode(msg.from);
      await client.sendMessage(msg.from, `🔗 Group invite link: https://chat.whatsapp.com/${inviteCode}`);
    } catch {
      await client.sendMessage(msg.from, '❌ Could not fetch group invite link. Bot must be admin.');
    }
  },

  setdesc: async (msg, client) => {
    if (!msg.isGroupMsg) {
      return client.sendMessage(msg.from, '⚠️ This command works only in groups.');
    }
    if (!msg.isGroupAdmins) {
      return client.sendMessage(msg.from, '❌ You must be a group admin to use this command.');
    }

    const newDesc = msg.body.split(' ').slice(1).join(' ');
    if (!newDesc) {
      return client.sendMessage(msg.from, '⚠️ Please provide a new group description after the command.');
    }

    try {
      await client.setGroupDescription(msg.from, newDesc);
      await client.sendMessage(msg.from, '✅ Group description updated.');
    } catch {
      await client.sendMessage(msg.from, '❌ Failed to update group description.');
    }
  },

  setname: async (msg, client) => {
    if (!msg.isGroupMsg) {
      return client.sendMessage(msg.from, '⚠️ This command works only in groups.');
    }
    if (!msg.isGroupAdmins) {
      return client.sendMessage(msg.from, '❌ You must be a group admin to use this command.');
    }

    const newName = msg.body.split(' ').slice(1).join(' ');
    if (!newName) {
      return client.sendMessage(msg.from, '⚠️ Please provide a new group name after the command.');
    }

    try {
      await client.setGroupSubject(msg.from, newName);
      await client.sendMessage(msg.from, '✅ Group name updated.');
    } catch {
      await client.sendMessage(msg.from, '❌ Failed to update group name.');
    }
  },

  invite: async (msg, client) => {
    await client.sendMessage(msg.from, '🔗 To invite users, share the group link or add them manually.');
  },

  welcomeon: async (msg, client) => {
    // You can implement welcome message toggling here
    await client.sendMessage(msg.from, '✅ Welcome messages enabled.');
  },

  welcomeoff: async (msg, client) => {
    await client.sendMessage(msg.from, '✅ Welcome messages disabled.');
  },

  clear: async (msg, client) => {
    if (!msg.isGroupMsg) {
      return client.sendMessage(msg.from, '⚠️ This command works only in groups.');
    }
    if (!msg.isGroupAdmins) {
      return client.sendMessage(msg.from, '❌ You must be a group admin to use this command.');
    }
    // You can implement group message clearing here
    await client.sendMessage(msg.from, '🧹 Group messages cleared.');
  },

  helpadmin: async (msg, client) => {
    const helpText = `
*Admin Commands:*
.kick @user - Kick user from group
.ban @user - Ban user from bot usage
.unban @user - Remove user ban
.mute @user - Mute user (soon)
.unmute @user - Unmute user (soon)
.warn @user - Warn a user
.promote @user - Promote to admin
.demote @user - Demote admin
.listadmins - List group admins
.grouplink - Get group invite link
.setdesc <text> - Set group description
.setname <name> - Set group name
.welcomeon - Enable welcome messages
.welcomeoff - Disable welcome messages
.clear - Clear messages (simulated)
.helpadmin - Show this help
    `;
    await client.sendMessage(msg.from, helpText);
  }
};