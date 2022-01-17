import React from 'react';
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {

      guess: "",
      correctPositions: "",
      incorrectPositions: "",
      invalidChars: "",
      output: "",
    }


    this.changeGuess = this.changeGuess.bind(this);
    this.changeCorrectPositions = this.changeCorrectPositions.bind(this);
    this.changeIncorrectPositions = this.changeIncorrectPositions.bind(this);
    this.changeInvalidChars = this.changeInvalidChars.bind(this);
    this.formSubmitted = this.formSubmitted.bind(this);
  }

  async formSubmitted(e) {
    e.preventDefault()

    let correctPosList = [];
    let incorrectPosList = [];
    let invalidCharsList = [];

    try {
      if (this.state.correctPositions.length !== 0) {
        correctPosList = this.state.correctPositions.split((',')).map(word => parseInt(word.trim()));
      }
      if (this.state.incorrectPositions.length !== 0){
        incorrectPosList = this.state.incorrectPositions.split((',')).map(word => parseInt(word.trim()));
      }

      if (this.state.invalidChars.length !== 0) {
        invalidCharsList = Array.from(new Set(this.state.invalidChars.split(('')).map(word => word.trim())));
      }

      for(let i of correctPosList){
        if (isNaN(i) || i >= this.state.guess.length){
          throw "Invalid index!";
        }
      }

      for(let i of incorrectPosList){
        if (isNaN(i) || i >= this.state.guess.length){
          throw "Invalid index!";
        }
      }

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
        invalidChars: invalidCharsList
      })
    });

    if (resp.status === 200) {

      let guessList = await resp.json();
      this.setState({
          output: guessList,
      })
    } else {
        this.setState({
            status: "Failed to get the next guess list!",
        })
    }

  }

  changeGuess(e){
    this.setState({guess: e.target.value});
  }

  changeCorrectPositions(e){
    this.setState({correctPositions: e.target.value});
  }

  changeIncorrectPositions(e){
    this.setState({incorrectPositions: e.target.value});
  }

  changeInvalidChars(e){
    this.setState({invalidChars: e.target.value});
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
            <input value={this.state.correctPositions} onChange={this.changeCorrectPositions} id="correctPositions"
                   placeholder="4"/>
            <br/>

            <label>Incorrect Positions:</label>
            <input value={this.state.incorrectPositions} onChange={this.changeIncorrectPositions} id="incorrectPositions"
                   placeholder="0, 3"/>
            <br/>

            <label>Invalid Characters:</label>
            <input value={this.state.invalidChars} onChange={this.changeInvalidChars} id="invalidChars"
                   placeholder="ou"/>
            <br/>

            <button type={"submit"}>Get The Next Possible Guesses!</button>
          </form>
          <div>
            <h3>{this.state.output}</h3>
          </div>
        </div>
    );
  }
}

export default App;
