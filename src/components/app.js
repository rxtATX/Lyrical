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
    this.timeOut = this.timeOut.bind(this);

    this.state = {
      isOpen: false,
      songs: [{
        title: "test",
        artist: "test",
        lyrics: "this is a test"
      }, {
        title: "If I Fell",
        artist: "The Beatles",
        lyrics: "If I fell in love with you Would you promise to be true And help me understand because I've been in love before And I found that love was more Than just holding hands If I give my heart to you I must be sure From the very start That you would love me more than her If I trust in you oh please Don't run and hide If I love you too oh please Don't hurt my pride like her because I couldn't stand the pain And I would be sad if our new love was in vain So I hope you see that I Would love to love you And that she will cry When she learns we are two because I couldn't stand the pain And I would be sad if our new love was in vain So I hope you see that I Would love to love you And that she will cry When she learns we are two If I fell in love with you"
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

  // search() {
  //   return fetch('http://api.musixmatch.com/ws/1.1/chart.tracks.get?country=US&f_has_lyrics=1&apikey=75d336abfa6dcbbbffe3cf619840a0f8')
  //     .then(response => console.log(response))
  //     .then(data => console.log(data));
  // }

  componentDidUpdate() {
    if (this.state.total === 100) {
      this.openModal();
      clearInterval(1);
      this.setState({ total: '100' })
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

  timeOut(bool) {
    if (bool) {
      this.openModal();
    }
  }

  handleClickEvent(e) {
    e.preventDefault();
    window.location.reload(true);
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
            <Counter
              val={5}
              timeOut={bool => this.timeOut(bool)}
            />
            <button type="button" className="btn btn-default" onClick={(e) => this.handleClickEvent(e)}>New Song?</button>
          </header>
          <div className="col-md-9">
            <WordBox
              isGameOver={this.state.isOpen}
              songLyrics={this.state.words}
              guessWord={this.state.guessed}
            />
          </div>
          <Modal
            handleClickEvent={(e) => this.handleClickEvent(e)}
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