const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'users.json');

let users = {};

// Load user data from file
function loadUserData() {
  try {
    if (fs.existsSync(dataFile)) {
      const raw = fs.readFileSync(dataFile);
      users = JSON.parse(raw);
    } else {
      users = {};
    }
  } catch (err) {
    console.error('Error loading user data:', err);
    users = {};
  }
}

// Save user data to file
function saveUserData() {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error saving user data:', err);
  }
}

// Initialize user if doesn't exist
function initUser(userId) {
  if (!users[userId]) {
    users[userId] = {
      coins: 100,      // default starting coins
      inventory: []
    };
    saveUserData();
  }
}

// Get user's coin balance
function getUserCoins(userId) {
  initUser(userId);
  return users[userId].coins;
}

// Add coins to user
function addCoins(userId, amount) {
  initUser(userId);
  users[userId].coins += amount;
  saveUserData();
}

// Subtract coins from user, return true if success, false if insufficient balance
function subtractCoins(userId, amount) {
  initUser(userId);
  if (users[userId].coins >= amount) {
    users[userId].coins -= amount;
    saveUserData();
    return true;
  } else {
    return false;
  }
}

// Export functions
module.exports = {
  loadUserData,
  saveUserData,
  getUserCoins,
  addCoins,
  subtractCoins,
};