const { MessageMedia } = require('whatsapp-web.js');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

module.exports = {
  sticker: async (msg, client) => {
    if (!msg.hasMedia) return msg.reply("❌ Please send an image/video with caption `.sticker`");
    const media = await msg.downloadMedia();
    await client.sendMessage(msg.from, media, { sendMediaAsSticker: true });
  },

  toimg: async (msg) => {
    if (!msg.hasMedia) return msg.reply("❌ Please send a sticker with caption `.toimg`");
    const media = await msg.downloadMedia();
    await msg.reply(media, undefined, { caption: "🖼️ Converted from sticker" });
  },

  tomp3: async (msg) => {
    if (!msg.hasMedia) return msg.reply("❌ Please send a video with caption `.tomp3`");
    const media = await msg.downloadMedia();
    const buff = Buffer.from(media.data, 'base64');
    fs.writeFileSync('./temp/video.mp4', buff);
    const exec = require('child_process').exec;
    exec('ffmpeg -i ./temp/video.mp4 -q:a 0 -map a ./temp/audio.mp3', async () => {
      const audio = MessageMedia.fromFilePath('./temp/audio.mp3');
      await msg.reply(audio, undefined, { sendAudioAsVoice: false });
    });
  },

  qr: async (msg) => {
    const text = msg.body.slice(4).trim();
    if (!text) return msg.reply("❌ Provide text to generate QR code: `.qr your text`");
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=300x300`;
    const qr = await MessageMedia.fromUrl(url);
    await msg.reply(qr, undefined, { caption: "📸 QR Code" });
  }
};