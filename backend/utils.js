const fs = require('fs');
const path = require('path');

const loadWordsFromFile = () => {
  console.log("Loading words");
  try {
    const wordsFilePath = path.join(__dirname, 'words.txt');
    const fileContent = fs.readFileSync(wordsFilePath, 'utf8');
    return fileContent.split('\n').map(word => word.trim()).filter(word => word.length === 5);
  } catch (error) {
    console.error('Error reading the words file:', error.message);
    return [];
  }
};

module.exports = { loadWordsFromFile };
