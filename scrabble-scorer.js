// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }

      }
   }
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some Scrabble!\n");

   const userInput = input.question("Enter a word to score: ");

   return userInput;
};

let newPointStructure = transform(oldPointStructure);

let simpleScorer = (word) => {
   word = word.toUpperCase().trim();

   let points = word.length;

   return points;
};

let vowelBonusScorer = (word) => {
   word = word.toUpperCase().trim();
   let points = 0;

   for (let i = 0; i < word.length; i++) {
      if (word[i] === 'A' || word[i] === 'E' || word[i] === 'I' || word[i] === 'O' || word[i] === 'U') {
         points += 3;
      } else {
         points++;
      }
   }

   return points;
};

let scrabbleScorer = (word) => {
   word = word.toLowerCase().trim();
   let points = 0;

   for (let i = 0; i < word.length; i++) {

      points += newPointStructure[word[i]];

   }

   return points;
};

const scoringAlgorithms = [
   {
      name: "Simple",
      description: "One point per character",
      scorerFunction: simpleScorer
   },
   {
      name: "Vowel Bonus",
      description: "Vowels are worth 3 points",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "Uses Scrabble point system",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt(word) {
   console.log(`Which scoring algorithm would you like to use?\n\n0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}`);

   while (true) {
      let userInput = input.question("Enter 0, 1, or 2: ");
      userInput = Number(userInput);

      if (userInput === 0 || userInput === 1 || userInput === 2) {
         return scoringAlgorithms[userInput].scorerFunction(word);
      }
   }
}

function transform(obj) {
   let newObj = {};

   for (let i in obj) {
      for (let j in obj[i]) {
         newObj[obj[i][j].toLowerCase()] = Number(i);
      }
   }

   return newObj;
};

function runProgram() {
   let word = initialPrompt();
   // console.log(oldScrabbleScorer(word));
   // console.log(simpleScorer(word));
   // console.log(vowelBonusScorer(word));
   let score = scorerPrompt(word);
   console.log(`Score for '${word}': ${score}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
