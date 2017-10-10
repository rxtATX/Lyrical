import React, { Component } from 'react';
import Input from './children/Input';
import WordBox from './children/WordBox';
import Modal from './children/Modal';
import Counter from './children/Counter';

export default class App extends Component {
  constructor() {
    super();

    this.hideModal = this.hideModal.bind(this);
    this.openModal = this.openModal.bind(this);

    this.state = {
      isOpen: false,
      songs: [{
        title: "test",
        artist: "test",
        lyrics: "this is a test"
      }],
      words: [],
      unique: [],
      artist: '',
      title: '',
      total: '',
      guess: '',
      guessed: [],
      collapse: false
    };
  }

  hideModal() {
    this.setState({
      isOpen: false
    });
  };

  openModal() {
    this.setState({
      isOpen: true
    });
  };

  componentDidUpdate() {
    if (this.state.total === 100) {
      this.openModal();
      this.setState({ total: '100' })
    }
    if (this.state.timeLeft === 0) {
      clearInterval(countdown);
    }
  }

  componentDidMount() {
    var n = Math.floor(Math.random() * this.state.songs.length);
    this.setState({
      words: this.state.songs[n].lyrics.replace(/[^a-zA-Z0-9\s']/g, '').replace(/(\b[a|o]{1,}h{1,}\b)/g, '').toLowerCase().trim().split(' '),
      unique: [...new Set(this.state.songs[n].lyrics.replace(/[^a-zA-Z0-9\s']/g, '').replace(/(\b[a|o]{1,}h{1,}\b)/g, '').toLowerCase().trim().split(' '))],
      artist: this.state.songs[n].artist,
      title: this.state.songs[n].title,
      total: this.state.unique.length
    });
  }

  onGuess(input) {
    this.setState({ guess: input });
    for (let i = 0; i < this.state.unique.length; i++) {
      if (input === this.state.unique[i] && this.state.guessed.indexOf(input) === -1) {
        var updateArray = this.state.guessed.concat(input)
        this.setState({
          guessed: updateArray,
          total: Math.floor((updateArray.length / this.state.unique.length) * 100),
          guess: ''
        });
      }
    }
  }

  enterKeyEvent(charCode) {
    if (charCode === 13) {
      this.setState({ guess: '' });
    }
  }

  timeOut() {
    this.setState({
      isOpen: true
    });
  }

  render() {
    return (
      <content className="container">
        <div className="row">
          <header className="col-md-3 text-center">
            <h1>Lyrical</h1>
            <h2>The game of musical recall</h2>
            <p>Can you discover all the words to this mystery song?</p>
            <Input
              enterKeyEvent={charCode => this.enterKeyEvent(charCode)}
              runOnGuess={input => this.onGuess(input)}
              display={this.state.guess}
            />
            <p id="percent">{this.state.total}% Complete</p>
            <p>{this.state.timeLeft}</p>
            <Counter val={5} openModal={this.timeOut} />
          </header>
          <div className="col-md-9">
            <WordBox
              songLyrics={this.state.words}
              guessWord={this.state.guessed}
            />
          </div>
          <Modal
            title={this.state.title}
            artist={this.state.artist}
            isOpen={this.state.isOpen}
            hideModal={this.hideModal}
          />
        </div>
      </content>
    );
  }
}