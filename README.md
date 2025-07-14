# Wordle Bot
This project is a shameless rip off of the NYT Wordle Bot. It provides optimal word suggestions based on user input about correct letters, misplaced letters, and letters not present in the solution.

## Project Structure

The project is organized into a monorepo structure with two main directories:

- `/frontend`: Contains the React application that provides the user interface (built with vite).
- `/backend`: Contains the Node.js Express server that handles the core analysis and suggestion logic.

## Setup
Run `npm install` in frontend and backend directories. 

Run `npm run dev` in frontend and backend directories to start the express server and build the front end.

## Todo
* Currently this bot will only suggest answers that could actually be solutions based on given information. This is not always the most efficient way to get the solution. For example, the NYT's WorldeBot will often guess a word that could _not_ be the solution but is effective in eliminating the maximum number of options.
* `possible-answers.txt` is a list of 2309 words that are valid Wordle solutions. `allowed-guesses.txt` is a list of 10657 words that are valid _guesses_. These are words that Wordle will allow as guesses but they will never be the solution (typically they are obscure and obsolete words).
* To allow for ultimate efficiency the algorithm should be adjusted to allow for guesses from this latter list that would not be the solution but would narrow down options effectively. To do this the larger list of allowed words would need to be implemented somehow. It is not currently being used

I got the word lists from here: 

allowed-guesses:  https://gist.github.com/cfreshman/cdcdf777450c5b5301e439061d29694c
possible-answers: https://gist.github.com/cfreshman/a03ef2cba789d8cf00c08f767e0fad7b
