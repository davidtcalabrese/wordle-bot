import { loadWordsFromFile } from '../utils.js';
import { filterWords, findBestGuess } from '../analyzer.js';

const filterWordsTest = () => {
    const allWords = loadWordsFromFile();
    const guessedWord = "crane";
    const letterStatuses = ["incorrect", "incorrect", "incorrect", "valid", "correct"];
    const remainingWords = filterWords(guessedWord, letterStatuses, allWords);
    const bestGuesses = findBestGuess(remainingWords, allWords);
    console.log("Top 10 Guesses:");
    console.log(bestGuesses.slice(0, 10));
}

filterWordsTest()