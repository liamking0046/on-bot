const axios = require('axios');

const TENOR_API_KEY = process.env.TENOR_API_KEY;
const TENOR_BASE_URL = 'https://g.tenor.com/v1';

async function fetchRandomGif(searchTerm) {
  try {
    const response = await axios.get(`${TENOR_BASE_URL}/search`, {
      params: {
        q: searchTerm,
        key: TENOR_API_KEY,
        limit: 10,
        contentfilter: "medium",
        media_filter: "minimal"
      }
    });
    const results = response.data.results;
    if (!results || results.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * results.length);
    return results[randomIndex].media[0].gif.url;
  } catch (error) {
    console.error('Tenor API error:', error.message);
    return null;
  }
}

async function sendEmotionGif(msg, client, emotion) {
  const gifUrl = await fetchRandomGif(emotion);
  if (!gifUrl) {
    await client.sendText(msg.from, `Sorry, couldn't find a ${emotion} gif right now.`);
    return;
  }

  // Extract mentioned user(s) for caption
  const mentioned = msg.mentionedIds.length > 0 ? msg.mentionedIds.map(id => `@${id.split('@')[0]}`).join(' ') : '';
  const senderTag = `@${msg.author ? msg.author.split('@')[0] : msg.from.split('@')[0]}`;
  const actionText = `${senderTag} ${emotion}${mentioned ? ' ' + mentioned : ''}`;

  await client.sendGif(msg.from, gifUrl, 'emotion.gif', actionText, { mentions: msg.mentionedIds.length > 0 ? [msg.author, ...msg.mentionedIds] : [msg.author] });
}

module.exports = {
  kiss: async (msg, client) => sendEmotionGif(msg, client, 'kiss'),
  slap: async (msg, client) => sendEmotionGif(msg, client, 'slap'),
  hug: async (msg, client) => sendEmotionGif(msg, client, 'hug'),
  angry: async (msg, client) => sendEmotionGif(msg, client, 'angry'),
  cry: async (msg, client) => sendEmotionGif(msg, client, 'cry'),
  laugh: async (msg, client) => sendEmotionGif(msg, client, 'laugh'),
  wink: async (msg, client) => sendEmotionGif(msg, client, 'wink'),
  dance: async (msg, client) => sendEmotionGif(msg, client, 'dance'),
  poke: async (msg, client) => sendEmotionGif(msg, client, 'poke'),
  pat: async (msg, client) => sendEmotionGif(msg, client, 'pat'),
  smile: async (msg, client) => sendEmotionGif(msg, client, 'smile'),
  wave: async (msg, client) => sendEmotionGif(msg, client, 'wave'),
  facepalm: async (msg, client) => sendEmotionGif(msg, client, 'facepalm'),
  bored: async (msg, client) => sendEmotionGif(msg, client, 'bored'),
  confused: async (msg, client) => sendEmotionGif(msg, client, 'confused'),
};