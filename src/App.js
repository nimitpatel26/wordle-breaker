import React from 'react';
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {

      guess: "",
      correctPosition: "",
      incorrectPosition: "",
      invalidWords: "",
      output: "",
    }


    this.changeGuess = this.changeGuess.bind(this);
    this.changeCorrectPosition = this.changeCorrectPosition.bind(this);
    this.changeIncorrectPosition = this.changeIncorrectPosition.bind(this);
    this.changeInvalidWords = this.changeInvalidWords.bind(this);
    this.formSubmitted = this.formSubmitted.bind(this);
  }

  async formSubmitted(e) {
    e.preventDefault()

    let correctPosList = [];
    let incorrectPosList = [];
    let invalidWordsList = [];

    try {
      correctPosList = this.state.correctPosition.split((',')).map(word => parseInt(word.trim()));
      incorrectPosList = this.state.incorrectPosition.split((',')).map(word => parseInt(word.trim()));
      invalidWordsList = Array.from(new Set(this.state.invalidWords.split(('')).map(word => word.trim())));

    }catch(e){
      this.setState({
        output: "Invalid Input!",
      });
      return;
    }



    this.setState({
        output: "Getting next guess list....",
    })

    let url = "/.netlify/functions/get-guess-prop";

    let resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guess: this.state.guess,
        correctPositions: correctPosList,
        incorrectPositions: incorrectPosList,
        invalidWords: invalidWordsList
      })
    });
    // let resp = await fetch(url);

    if (resp.status === 200) {

      let guessList = await resp.json();
      this.setState({
          output: guessList,
      })
    } else {
        this.setState({
            status: "Failed to get next guess list!",
        })
    }

  }

  changeGuess(e){
    this.setState({guess: e.target.value});
  }

  changeCorrectPosition(e){
    this.setState({correctPosition: e.target.value});
  }

  changeIncorrectPosition(e){
    this.setState({incorrectPosition: e.target.value});
  }

  changeInvalidWords(e){
    this.setState({invalidWords: e.target.value});
  }


  render() {

    return (
        <div className="App">
          <h1>--Wordle--Breaker--</h1>
          <form onSubmit={this.formSubmitted}>
            <label>Guess:</label>
            <input value={this.state.guess} onChange={this.changeGuess} id="guess"
                   placeholder="house" required/>
            <br/>

            <label>Correct Positions:</label>
            <input value={this.state.correctPosition} onChange={this.changeCorrectPosition} id="guess"
                   placeholder="4" required/>
            <br/>

            <label>Incorrect Positions:</label>
            <input value={this.state.incorrectPosition} onChange={this.changeIncorrectPosition} id="incorrectPosition"
                   placeholder="0, 3" required/>
            <br/>

            <label>Invalid Words:</label>
            <input value={this.state.invalidWords} onChange={this.changeInvalidWords} id="invalidWords"
                   placeholder="ou" required/>
            <br/>

            <button type={"submit"}>Get Next Possible Guesses!</button>
          </form>
          <div>
            <h3>{this.state.output}</h3>
          </div>
        </div>
    );
  }
}

export default App;
