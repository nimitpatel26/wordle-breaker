// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const fileName = './dictionary_compact.json';
const nextGuessListLimit = 20;

function getDictArray(){
  let dict = require(fileName);
  return Object.keys(dict);
}


function getNextGuessList(guess, guessProp){

  let words = getDictArray();
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



const handler = async (event) => {
  try {

    const guessProp = JSON.parse(event.body);
    const guessList = getNextGuessList(guessProp.guess, guessProp);

    return {
      statusCode: 200,
      body: JSON.stringify(guessList.join(", ")),

    }
  } catch (error) {
    return { statusCode: 500, body: "Unable to get next possible guess list!" }
  }
}

module.exports = { handler }
