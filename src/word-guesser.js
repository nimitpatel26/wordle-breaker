const fs = require('fs');
const fileName = 'dictionary_compact.json';

const nextGuessListLimit = 20;
const guess = "house";
const guessProp = {
    correctPositions: [ 4 ],
    incorrectPositions: [ 0, 3 ],
    invalidWords: [ 'o', 'u' ]
};


function getDictArray(){
    let rawData = fs.readFileSync(fileName);
    let dic = JSON.parse(rawData);
    return Object.keys(dic);
}


function getNextGuessList(words, guess, guessProp){
    let possibleWords = words.filter(word => word.length === guess.length);
    let nextGuessList = [];

    for(let word of possibleWords){

        let wordValid = true;

        // correct position check
        for (let i of guessProp.correctPositions) {
            if (guess[i] !== word[i]){
                wordValid = false;
                break;
            }
        }

        if (!wordValid){
            continue;
        }

        // invalid position check
        for (let i of guessProp.incorrectPositions){
            if (!word.includes(guess[i])){
                wordValid = false;
                break;
            }
        }

        if (!wordValid){
            continue;
        }

        // invalid word check
        for (let c of guessProp.invalidWords){
            if (word.includes(c)){
                wordValid = false;
                break;
            }
        }

        if (wordValid){
            nextGuessList.push(word);
        }

    }
    nextGuessList.sort((word1, word2) => {
        let s1 = new Set(word1);
        let s2 = new Set(word2);
        return s2.size - s1.size;
    });

    nextGuessList = nextGuessList.splice(0, nextGuessListLimit);
    return nextGuessList;
}


let words = getDictArray()
let nextGuessList = getNextGuessList(words, guess, guessProp);

console.log(nextGuessList);