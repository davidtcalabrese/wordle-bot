const { loadWordsFromFile } = require("./utils");

const filterWords = (
    guessedWord,
    letterStatuses,
    absentLetters,
) => {
  const correctLetters = letterStatuses.reduce((acc, status, index) => {
    if (status === 'correct') {
      acc[index] = guessedWord[index];
    }
    return acc;
  }, {});

  const validLetters = letterStatuses.reduce((acc, status, index) => {
    const letter = guessedWord[index];
    if (status === 'valid') {
      acc[letter] = (acc[letter] || []).concat(index);
    }
    return acc;
  }, {});

  const absentSet = new Set(absentLetters);

  const isWordPossibleSolution = (word) => {
    const correctMatch = Object.entries(correctLetters).every(
        ([index, letter]) => word[parseInt(index, 10)] === letter
    );
    if (!correctMatch) return false;

    const validMatch = Object.entries(validLetters).every(([letter, incorrectIndices]) => {
      if (!word.includes(letter)) {
        return false;
      }
      return incorrectIndices.every((incorrectIndex) => word[incorrectIndex] !== letter);
    });
    if (!validMatch) return false;

    for (const letter of absentSet) {
      if (word.includes(letter)) {
        return false;
      }
    }

    return true;
  };
  const allWords = loadWordsFromFile();
  return allWords.filter(isWordPossibleSolution);
};

const getLetterFrequencies = (possibleWords) => {
  const frequencies = {};
  for (const word of possibleWords) {
    const uniqueLetters = new Set(word.split(''));
    for (const letter of uniqueLetters) {
      frequencies[letter] = (frequencies[letter] || 0) + 1;
    }
  }
  return frequencies;
};

const calculateWordScores = (letterFrequencies) => {
  const wordsToScore = loadWordsFromFile();
  const wordScores = {};
  for (const word of wordsToScore) {
    const uniqueLetters = new Set(word.split(''));
    let score = 0;
    for (const letter of uniqueLetters) {
      score += letterFrequencies[letter] || 0;
    }
    wordScores[word] = score;
  }
  return wordScores;
};

const findBestGuess = (possibleWords) => {
  if (possibleWords.length <= 2) {
    return possibleWords;
  }

  const letterFrequencies = getLetterFrequencies(possibleWords);
  const wordScores = calculateWordScores(letterFrequencies);

  for (const word of possibleWords) {
    if (wordScores[word]) {
      wordScores[word] *= 1.1;
    }
  }

  return Object.keys(wordScores).sort((a, b) => {
    return wordScores[b] - wordScores[a];
  });
};

const getSuggestions = (guessedWord, letterStatuses, absentLetters) => {
  const remainingWords = filterWords(guessedWord, letterStatuses, absentLetters);
  return findBestGuess(remainingWords);
}

module.exports = {
  filterWords,
  getLetterFrequencies,
  calculateWordScores,
  findBestGuess,
  getSuggestions
};
