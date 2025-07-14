const fs = require('fs');
const path = require('path');

const loadWordsFromFile = () => {
  try {
    const possibleAnswersFile = path.join(__dirname, 'resources', 'possible-answers.txt');
    const fileContent = fs.readFileSync(possibleAnswersFile, 'utf8');
    return fileContent.split('\n').map(word => word.trim()).filter(word => word.length === 5);
  } catch (error) {
    console.error('Error reading the words file:', error.message);
    return [];
  }
};

module.exports = { loadWordsFromFile };
