// commands/memes.js
const axios = require('axios');

async function fetchMemeFromSubreddit(subreddit) {
  try {
    const res = await axios.get(`https://www.reddit.com/r/${subreddit}/random.json`);
    const post = res.data[0].data.children[0].data;
    if (post.post_hint === 'image' || post.post_hint === 'rich:video' || post.post_hint === 'link') {
      return {
        url: post.url,
        title: post.title
      };
    }
    // If post is not image or gif, try again recursively (limit recursion for safety)
    return null;
  } catch (e) {
    return null;
  }
}

async function sendMeme(msg, client, subreddit) {
  const meme = await fetchMemeFromSubreddit(subreddit);
  if (meme) {
    await client.sendImage(msg.from, meme.url, `${subreddit}.jpg`, meme.title);
  } else {
    await client.sendText(msg.from, `Sorry, couldn't fetch a meme from r/${subreddit} right now.`);
  }
}

// 15 meme commands

async function meme(msg, client) {
  await sendMeme(msg, client, 'memes');
}

async function dankmeme(msg, client) {
  await sendMeme(msg, client, 'dankmemes');
}

async function wholesomememe(msg, client) {
  await sendMeme(msg, client, 'wholesomememes');
}

async function triggered(msg, client) {
  // For gifs, we try 'triggered' subreddit but often gifs are external links
  await sendMeme(msg, client, 'triggered');
}

async function cursed(msg, client) {
  await sendMeme(msg, client, 'cursedimages');
}

async function funny(msg, client) {
  await sendMeme(msg, client, 'funny');
}

async function programmerhumor(msg, client) {
  await sendMeme(msg, client, 'ProgrammerHumor');
}

async function darkmeme(msg, client) {
  await sendMeme(msg, client, 'DarkHumor');
}

async function relatable(msg, client) {
  await sendMeme(msg, client, 'relatablememes');
}

async function gamingmeme(msg, client) {
  await sendMeme(msg, client, 'gamingmemes');
}

async function politicalmeme(msg, client) {
  await sendMeme(msg, client, 'PoliticalMemes');
}

async function animalmeme(msg, client) {
  await sendMeme(msg, client, 'animalsbeingderps');
}

// For moviequote, no subreddit - fallback to static quotes
const movieQuotes = [
  '“May the Force be with you.” – Star Wars',
  '“I\'ll be back.” – Terminator',
  '“Here\'s looking at you, kid.” – Casablanca',
  '“You can\'t handle the truth!” – A Few Good Men',
  '“I\'m the king of the world!” – Titanic',
];
async function moviequote(msg, client) {
  const quote = movieQuotes[Math.floor(Math.random() * movieQuotes.length)];
  await client.sendText(msg.from, quote);
}

async function classicmeme(msg, client) {
  await sendMeme(msg, client, 'classicmemes');
}

module.exports = {
  meme,
  dankmeme,
  wholesomememe,
  triggered,
  cursed,
  funny,
  programmerhumor,
  darkmeme,
  relatable,
  gamingmeme,
  politicalmeme,
  animalmeme,
  moviequote,
  classicmeme,
};