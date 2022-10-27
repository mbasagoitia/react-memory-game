import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      highScore: 0,
      currentIndex: Math.floor(Math.random()*20),
    }

    this.updateScore = this.updateScore.bind(this);
    this.getRandomIndex = this.getRandomIndex.bind(this);
    this.showCongrats = this.showCongrats.bind(this);
    this.resetGame = this.resetGame.bind(this);

  }

  memoryItems = [
    { title: "Bear Cub", viewed: "false", src: "/img/bear-cub.jpg"},
    { title: "Bunny", viewed: "false", src: "/img/bunny.jpg" },
    { title: "Duckling", viewed: "false", src: "/img/duckling.jpg" },
    { title: "Elephant", viewed: "false", src: "/img/elephant.jpg" },
    { title: "Fawn", viewed: "false", src: "/img/fawn.jpg" },
    { title: "Foal", viewed: "false", src: "/img/foal.jpg" },
    { title: "Fox", viewed: "false", src: "/img/fox.jpg" },
    { title: "Giraffe", viewed: "false", src: "/img/giraffe.jpg" },
    { title: "Goat", viewed: "false", src: "/img/goat.jpg" },
    { title: "Hedgehog", viewed: "false", src: "/img/hedgehog.jpg" },
    { title: "Kitten", viewed: "false", src: "/img/kitten.jpg" },
    { title: "Lamb", viewed: "false", src: "/img/lamb.jpg" },
    { title: "Lion Cub", viewed: "false", src: "/img/lion-cub.jpg" },
    { title: "Mouse", viewed: "false", src: "/img/mouse.jpg" },
    { title: "Owlet", viewed: "false", src: "/img/owlet.jpg" },
    { title: "Penguin", viewed: "false", src: "/img/penguin.jpg" },
    { title: "Puppy", viewed: "false", src: "/img/puppy.jpg" },
    { title: "Raccoon", viewed: "false", src: "/img/raccoon.jpg" },
    { title: "Seal", viewed: "false", src: "/img/seal.jpg" },
    { title: "Tiger", viewed: "false", src: "/img/tiger.jpg" },
  ]

  gameHasBeenWon = false;

  getRandomIndex () {
    let randomIndex = Math.floor(Math.random()*(this.memoryItems.length));
    this.setState({ currentIndex: randomIndex });
  }

  showCongrats () {
    const overlay = document.querySelector("#overlay");
    const modal = document.querySelector("#modal");

    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    setTimeout(() => {
      overlay.classList.add("hidden");
      modal.classList.add("hidden");
    }, 5000)
  }

  resetGame () {
    this.setState({ score: 0 });
    for (let i = 0; i < this.memoryItems.length; i++) {
      this.memoryItems[i].viewed = "false";
    }
    if (this.gameHasBeenWon) {
      this.setState({highScore: 10});
    } else {
      this.setState({highScore: this.state.highScore});
    }
  }
 
  updateScore(event) {
    const gameDescription = document.querySelector("#game-description");
    if (!gameDescription.classList.contains("hidden")) {
      gameDescription.classList.add("hidden");
    }
    if (event.target.value === this.memoryItems[this.state.currentIndex].viewed) {
      this.setState({ score: this.state.score + 1 });

      if(this.state.highScore <= this.state.score) {
        this.setState({ highScore: this.state.score + 1 });
      }

      if (this.state.score === 9) {
        this.showCongrats();
        this.gameHasBeenWon = true;
        this.resetGame();
      }

    } else {
      this.resetGame();
    }

    this.memoryItems[this.state.currentIndex].viewed = "true";

    this.getRandomIndex();
  }

  render() {
    return (
    <div className="App">
      <div id="overlay" className="hidden">
        <div id="modal" className="hidden">
          <span id="modal-score">Score: 10</span>
          <span id="modal-text">Congratulations! Your memory is impeccable.</span></div>
      </div>
      <header id="header">
        <h1 id="title">React Memory Game</h1>
        <h2 id="game-description">Objective: Answer the questions to test your memory. <br></br>Try to make it to 10!</h2>
        <div id="scoreboard-area">
          <span id="score">Score: <span id="score-text">{this.state.score}</span></span>
          <span id="highScore">High Score: <span id="highScore-text">{this.state.highScore}</span></span>
        </div>
      </header>
      <div id="game-area">
        <div id="cards-area">
          <span id="img-title">{this.memoryItems[this.state.currentIndex].title}</span>
          <div id="img-wrapper">
            <img id="currentImg" src={process.env.PUBLIC_URL + this.memoryItems[this.state.currentIndex].src} alt={this.memoryItems[this.state.currentIndex].title}/>
          </div>
        </div>
        <div id="answer-area">
          <span id="question">Have you seen this animal yet?</span>
          <div id="buttons">
            <button type="button" id="no" className="game-button" value={false} onClick = {this.updateScore}>No</button>
            <button type="button" id="yes" className="game-button" value={true} onClick = {this.updateScore}>Yes</button>
          </div>
        </div>
      </div>
    </div>
    );

  }
}

export default App;
