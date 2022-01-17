



const fs = require('fs');
const fileName = 'dictionary_compact.json';
const wordLength = 5;


function getDictArray(){
    let rawData = fs.readFileSync(fileName);
    let dic = JSON.parse(rawData);
    return Object.keys(dic);
}

function chooseWord(words, length) {
    let possibleWords = words.filter(word => word.length === length);
    let chosenIndex = Math.floor(Math.random() * possibleWords.length);
    return possibleWords[chosenIndex];
}

function checkGuess(word, guess){
    if (word.length !== guess.length){
        return null;
    }

    let correctPos = [];
    let incorrectPos = [];
    let invalidWord = [];

    for(let i = 0; i < word.length; i++){
        if (guess[i] === word[i]){
            correctPos.push(i);

        }else if (word.includes(guess[i])){
            incorrectPos.push(i);

        }else{
            invalidWord.push(guess[i]);

        }
    }

    return {"correctPositions": correctPos, "incorrectPositions": incorrectPos, "invalidWords": invalidWord};
}

// let words = getDictArray()
// let chosenWord = chooseWord(words, wordLength);


let guessResp = checkGuess("shire", "house");
console.log(guessResp);

