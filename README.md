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
* The list of words are in words.txt are words that are likely answers. There are additional words that Wordle will allow as guesses though they will never be the solution (e.g., obscure and onsolete words). See allowed list here: https://gist.github.com/cfreshman/cdcdf777450c5b5301e439061d29694c
* To allow for ultimate efficiency the algorithm should be adjusted to allow for guesses that would not be the solution but would narrow down options effectively. To do this the larger list of allowed words would need to be implemented somehow. 
