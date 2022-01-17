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
      nextGuessList: "",
    }


    this.changeGuess = this.changeGuess.bind(this);
    this.changeCorrectPosition = this.changeCorrectPosition.bind(this);
    this.changeIncorrectPosition = this.changeIncorrectPosition.bind(this);
    this.changeInvalidWords = this.changeInvalidWords.bind(this);
    this.formSubmitted = this.formSubmitted.bind(this);
  }

  async formSubmitted(e) {
    e.preventDefault()
    // this.setState({
    //   status: "SMS sending is disabled. You can look at the source code at https://github.com/nimitpatel26/sms-app",
    // })
    // this.setState({
    //     status: "Sending....",
    // })
    //
    // let url = "/.netlify/functions/send-sms?num=" + this.state.number + "&language=" + this.state.language + "&subject=" + this.state.subject + "&message=" + this.state.message
    //
    // let resp = await fetch(url);
    //
    // if (resp.status === 200) {
    //     this.setState({
    //         status: "Sent!",
    //     })
    // } else {
    //     this.setState({
    //         status: "Failed to send SMS!",
    //     })
    // }

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
            <h3>{this.state.nextGuessList}</h3>
          </div>
        </div>
    );
  }
}

export default App;
