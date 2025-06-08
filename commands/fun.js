const fetch = require('node-fetch');

module.exports = {
  joke: async (msg) => {
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await res.json();
    msg.reply(`${data.setup}\n\n${data.punchline}`);
  },

  riddle: async (msg) => {
    const riddles = [
      { q: "I speak without a mouth and hear without ears. What am I?", a: "An echo." },
      { q: "What has to be broken before you can use it?", a: "An egg." },
      { q: "I’m tall when I’m young, and I’m short when I’m old. What am I?", a: "A candle." },
    ];
    const r = riddles[Math.floor(Math.random() * riddles.length)];
    msg.reply(`🧠 *Riddle:* ${r.q}\n💡 *Answer:* ${r.a}`);
  },

  eightball: async (msg) => {
    const replies = [
      "Yes.", "No.", "Definitely!", "Ask again later.", "Absolutely not.", "Sure!", "I doubt it."
    ];
    const answer = replies[Math.floor(Math.random() * replies.length)];
    msg.reply(`🎱 ${answer}`);
  },

  hack: async (msg) => {
    const mention = msg.mentionedIds[0];
    if (!mention) return msg.reply("Tag someone to hack! 😈");
    msg.reply(`Hacking <@${mention}>... 🔓\nAccessing files... 💾\nInjecting virus... 🦠\nSystem crashed! 💥`);
  },

  roast: async (msg) => {
    const roasts = [
      "You're the reason the gene pool needs a lifeguard.",
      "You bring everyone so much joy… when you leave the room.",
      "You have something on your chin... no, the third one down.",
    ];
    const roast = roasts[Math.floor(Math.random() * roasts.length)];
    msg.reply(`🔥 ${roast}`);
  },

  pickup: async (msg) => {
    const lines = [
      "Are you French? Because Eiffel for you.",
      "Do you have a name, or can I call you mine?",
      "Are you a magician? Because whenever I look at you, everyone else disappears."
    ];
    msg.reply(`💘 ${lines[Math.floor(Math.random() * lines.length)]}`);
  },

  rate: async (msg) => {
    const rate = Math.floor(Math.random() * 11);
    msg.reply(`I'd rate you ${rate}/10 😉`);
  },

  gayrate: async (msg) => {
    const percent = Math.floor(Math.random() * 101);
    msg.reply(`🏳️‍🌈 You're ${percent}% gay`);
  },

  simprate: async (msg) => {
    const percent = Math.floor(Math.random() * 101);
    msg.reply(`😅 You're ${percent}% simp`);
  },

  howhot: async (msg) => {
    const hot = Math.floor(Math.random() * 101);
    msg.reply(`🔥 You're ${hot}% hot today`);
  },

  howrich: async (msg) => {
    const cash = Math.floor(Math.random() * 1000000);
    msg.reply(`💸 You have $${cash} in imaginary money!`);
  },

  slots: async (msg) => {
    const symbols = ["🍒", "🍋", "🔔", "💎", "7️⃣"];
    const spin = () => symbols[Math.floor(Math.random() * symbols.length)];
    const result = [spin(), spin(), spin()];
    const win = result[0] === result[1] && result[1] === result[2];
    msg.reply(`🎰 [ ${result.join(' | ')} ]\n${win ? "You win! 🤑" : "You lose! 😢"}`);
  },

  truth: async (msg) => {
    const truths = [
      "What’s the most embarrassing thing you’ve ever done?",
      "Have you ever had a crush on someone here?",
      "What’s a secret you’ve never told anyone?"
    ];
    msg.reply(`🗣 Truth: ${truths[Math.floor(Math.random() * truths.length)]}`);
  },

  dare: async (msg) => {
    const dares = [
      "Send your last photo in the gallery.",
      "Sing a song and send the voice note.",
      "Say something embarrassing to your crush."
    ];
    msg.reply(`💥 Dare: ${dares[Math.floor(Math.random() * dares.length)]}`);
  },

  fact: async (msg) => {
    const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    const data = await res.json();
    msg.reply(`🤯 *Fact:* ${data.text}`);
  },
};