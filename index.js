// index.js (full updated with Anti-Spam section)

const { sendMenu } = require('./commands/menu'); const { handleEmotion } = require('./commands/emotions'); const { handleMeme } = require('./commands/memes'); const { handleFun } = require('./commands/fun'); const { handleMedia } = require('./commands/media'); const { handleMusic } = require('./commands/music'); const { handleAdminTools } = require('./commands/admin'); const { handleCasino } = require('./commands/casino'); const { handleFifa } = require('./commands/fifa'); const { handleAntiSpamCommands, processAntiSpam } = require('./commands/antispam');

const { getMessageType, extractCommand } = require('./utils/helpers');

module.exports = async (message, client) => { const type = getMessageType(message); const body = type === 'conversation' ? message.message.conversation : message.message[type]?.caption || ''; const command = extractCommand(body);

await processAntiSpam(message, client); // Passive checks always run

switch (command.name) { case 'menu': return await sendMenu(message, client);

// Emotion commands
case 'kiss':
case 'slap':
case 'hug':
case 'angry':
case 'bite':
case 'punch':
case 'cry':
case 'dance':
case 'laugh':
case 'sleep':
case 'poke':
case 'blush':
case 'highfive':
case 'handshake':
case 'wave':
  return await handleEmotion(message, client, command.name);

// Meme
case 'meme':
case 'darkmeme':
case 'animeme':
case 'programmingmeme':
case 'trendingmeme':
case 'cringememe':
case 'funnymeme':
case 'relatememe':
case 'trollmeme':
case 'classicmeme':
case 'wholesomememe':
case 'gachameme':
case 'demotivationalmeme':
case 'historymeme':
case 'roastmeme':
  return await handleMeme(message, client, command.name);

// Fun commands
case 'joke':
case 'quote':
case 'fact':
case 'truth':
case 'dare':
case 'rate':
case '8ball':
case 'howgay':
case 'compatibility':
case 'reverse':
case 'mock':
case 'riddle':
case 'nick':
case 'ship':
case 'simp':
  return await handleFun(message, client, command.name);

// Media Tools
case 'sticker':
case 'tomp3':
case 'toimg':
case 'resize':
case 'rotate':
case 'gray':
case 'invert':
case 'blur':
case 'mirror':
case 'crop':
case 'compress':
case 'bassboost':
case 'tempo':
case 'vaporwave':
case 'nightcore':
  return await handleMedia(message, client, command.name);

// Music/Streaming
case 'play':
case 'ytmp3':
case 'ytmp4':
case 'spotify':
case 'lyrics':
case 'shazam':
case 'nowplaying':
case 'findsong':
case 'audiotrim':
case 'audioloop':
case 'queue':
case 'skip':
case 'pause':
case 'resume':
case 'stop':
  return await handleMusic(message, client, command.name);

// Admin Tools
case 'kick':
case 'add':
case 'promote':
case 'demote':
case 'tagall':
case 'hidetag':
case 'gcopen':
case 'gcclose':
case 'setpp':
case 'setname':
case 'setdesc':
case 'delete':
case 'mute':
case 'unmute':
case 'welcome':
case 'goodbye':
case 'lockcmd':
case 'unlockcmd':
case 'block':
case 'unblock':
case 'ban':
case 'unban':
case 'grouplink':
case 'revokelink':
  return await handleAdminTools(message, client, command.name);

// Casino
case 'slot':
case 'dice':
case 'coinflip':
case 'blackjack':
case 'rps':
  return await handleCasino(message, client, command.name);

// Fifa cards/shop
case 'shop':
case 'buycard':
case 'mycards':
case 'cardinfo':
case 'sellcard':
  return await handleFifa(message, client, command.name);

// Anti-Spam
case 'antispam':
case 'antilink':
case 'antifake':
case 'antitoxic':
case 'antibot':
case 'antiflood':
case 'antiviewonce':
case 'antitag':
case 'restrict':
case 'gcfuck':
case 'maxwarn':
case 'warn':
case 'resetwarn':
case 'checkwarn':
case 'spamlog':
  return await handleAntiSpamCommands(message, client, command.name);

default:
  break;

} };

