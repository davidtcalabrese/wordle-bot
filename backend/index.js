const express = require('express');
const cors = require('cors');
const { loadWordsFromFile } = require("./utils");
const { filterWords, findBestGuess, getSuggestions} = require("./analyzer");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.post('/api/suggestions', (req, res) => {
  try {
    const { guessedWord, letterStatuses, absentLetters } = req.body;

    if (!guessedWord || !letterStatuses) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const suggestions = getSuggestions(guessedWord, letterStatuses, absentLetters);

    res.json(suggestions);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
