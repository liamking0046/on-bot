// menu.js

const LuffyImageUrl = "https://i.imgur.com/JOE1j7D.png"; // Example Luffy image URL

const ownerName = "Liam Arendsen";
const contactNumber = "https://wa.me/+27833098338";
const youtubeChannel = "https://youtube.com/@iamslow?si=w09HUoRm6-OvUo1V";

const marketingMessage = `🔥🥶 Are you a business owner or entrepreneur selling products?  
Message me to get your personalized, fully automated WhatsApp bot — boost sales & save time! 🚀✨  
Let's take your business to the next level with smart automation and 24/7 customer engagement! 💼📈`;

const commandSections = {
  "🎭 Meme Commands": [
    ".meme", ".dankmeme", ".memeindo", ".meme2", ".meme3",
    ".meme4", ".meme5", ".meme6", ".meme7", ".meme8",
    ".meme9", ".meme10", ".meme11", ".meme12", ".meme13",
  ],
  "🛠️ Admin Tools": [
    ".kick", ".ban", ".unban", ".mute", ".unmute",
    ".promote", ".demote", ".warn", ".delwarn", ".clearwarn",
    ".setwelcome", ".setgoodbye", ".antilink", ".antispam", ".antiwame",
    ".antisticker", ".antiNsFw", ".muteall", ".unmuteall", ".listwarns",
  ],
  "🎰 Casino Games": [
    ".slots", ".roulette", ".blackjack", ".dice", ".coinflip"
  ],
  "🎭 Emotions & Reactions": [
    ".kiss @user", ".slap @user", ".hug @user", ".angry @user", ".cry @user",
    ".laugh @user", ".pat @user", ".poke @user", ".wink @user", ".dance",
    ".bite @user", ".highfive @user", ".poke @user", ".smile @user", ".wave",
  ],
  "🎉 Fun Commands": [
    ".joke", ".quote", ".riddle", ".8ball", ".fact",
    ".trivia", ".truth", ".dare", ".coin", ".roll",
    ".flip", ".guess", ".challenge", ".fortune", ".story"
  ],
  "🎬 Media Tools": [
    ".ytsearch", ".ytmp3", ".ytmp4", ".tiktok", ".instagram",
    ".facebook", ".twitter", ".soundcloud", ".spotify", ".snapchat",
    ".pinterest", ".imgsearch", ".gifsearch", ".sticker", ".ocr"
  ],
  "🎵 Music & Streaming": [
    ".play", ".pause", ".resume", ".stop", ".skip",
    ".queue", ".nowplaying", ".volume", ".lyrics", ".shuffle",
    ".repeat", ".bassboost", ".equalizer", ".radio", ".join"
  ],
  "🛡️ Protections": [
    ".antilink", ".antispam", ".antisticker", ".antiNsFw"
  ]
};

function generateCommandsText() {
  let text = "";
  for (const [section, commands] of Object.entries(commandSections)) {
    text += `\n*${section}*\n`;
    text += commands.map(cmd => `  • ${cmd}`).join("\n");
    text += "\n";
  }
  return text;
}

async function sendMenu(client, chatId) {
  try {
    // Send Luffy image first
    await client.sendImage(chatId, LuffyImageUrl, "luffy.png", {
      caption: `Hello! I am *${ownerName}*'s WhatsApp Bot 🤖\nType *'.menu'* to see all commands!`
    });

    // Construct the menu message
    const menuMessage =
`👋 Hello! I am *${ownerName}*'s WhatsApp Bot

📞 Contact: ${contactNumber}
▶️ YouTube: ${youtubeChannel}

${marketingMessage}

─────────────────────
*📜 COMMAND LIST*${generateCommandsText()}
─────────────────────
_Type a command exactly as shown, with the prefix '.'_
`;

    // Send the menu text
    await client.sendText(chatId, menuMessage);
  } catch (error) {
    console.error("Error sending menu:", error);
  }
}

module.exports = {
  sendMenu,
};