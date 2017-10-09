import React, { Component } from 'react';
import Input from './children/Input';
import WordBox from './children/WordBox';
import Modal from './children/Modal';

export default class App extends Component {
  constructor() {
    super();

    this.hideModal = this.hideModal.bind(this);
    this.openModal = this.openModal.bind(this);

    this.state = {
      isOpen: false,
      songs: [{
        title: "Lucy in the Sky with Diamonds",
        artist: "The Beatles",
        lyrics: "Picture yourself in a boat on a river With tangerine trees and marmalade skies. Somebody calls you, you answer quite slowly, A girl with kaleidoscope eyes. Cellophane flowers of yellow and green Towering over your head. Look for the girl with the sun in her eyes And she's gone. Lucy in the sky with diamonds, Lucy in the sky with diamonds, Lucy in the sky with diamonds, Ah Follow her down to a bridge by a fountain, Where rocking horse people eat marshmallow pies. Everyone smiles as you drift past the flowers That grow so incredibly high. Newspaper taxis appear on the shore Waiting to take you away. Climb in the back with your head in the clouds And you're gone. Lucy in the sky with diamonds, Lucy in the sky with diamonds, Lucy in the sky with diamonds, Ah Picture yourself on a train in a station With plasticine porters with looking glass ties. Suddenly someone is there at the turnstile, The girl with kaleidoscope eyes. Lucy in the sky with diamonds, Lucy in the sky with diamonds, Lucy in the sky with diamonds, Ah Lucy in the sky with diamonds, Lucy in the sky with diamonds, Lucy in the sky with diamonds, Ah Lucy in the sky with diamonds, Lucy in the sky with diamonds, Lucy in the sky with diamonds."
      }, {
        title: "Wish You Were Here",
        artist: "Pink Floyd",
        lyrics: "So, so you think you can tell Heaven from Hell Blue skies from pain? Can you tell a green field From a cold steel rail? A smile from a veil? Do you think you can tell? And did they get you to trade Your heroes for ghosts? Hot ashes for trees? Hot air for a cool breeze? Cold comfort for change? And did you exchange A walk on part in the war For a leading role in a cage? How I wish, how I wish you were here We're just two lost souls Swimming in a fish bowl Year after year Running over the same old ground What have we found? The same old fears Wish you were here "
      }, {
        title: "test",
        artist: "test",
        lyrics: "this is a test"
      }, {
        title: "Renegade",
        artist: "Styx",
        lyrics: "Oh, Mama, I'm in fear for my life from the long arm of the law Law man has put an end to my running and I'm so far from my home Oh, Mama I can hear you a- crying, you're so scared and all alone Hangman is coming down from the gallows and I don't have very long The jig is up, the news is out They've finally found me The renegade who had it made Retrieved for a bounty Never more to go astray This will be the end today Of the wanted man Oh, Mama, I've been years on the lam and had a high price on my head Lawman said, Get him dead or alive. Now it's for sure he'll see me dead Dear Mama, I can hear you crying, you're so scared and all alone Hangman is comin' down from the gallows and I don't have very long The jig is up, the news is out They've finally found me The renegade who had it made Retrieved for a bounty Never more to go astray The judge will have revenge today On the wanted man Oh, Mama, I'm in fear for my life from the long arm of the law Hangman is coming down from the gallows and I don't have very long The jig is up, the news is out They've finally found me The renegade who had it made Retrieved for a bounty Never more to go astray This will be the end today Of the wanted man The wanted man And I don't wanna go, oh, no Oh, Mama, don't let them take me No, no, no, I can't go Hey, hey"
      }],
      words: [],
      unique: [],
      artist: '',
      title: '',
      total: '',
      guess: '',
      guessed: [],
      collapse: false,
      timeLeft: 5 * 60
    };
  }
  songSearch() {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("GET", "http://api.musixmatch.com/ws/1.1/chart.tracks.get?country=US&f_has_lyrics=1&apikey=75d336abfa6dcbbbffe3cf619840a0f8");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
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
  }

  countdown() {
    this.setState({ timeLeft: this.state.timeLeft-- })
  }

  componentDidMount() {
    this.songSearch();
    this.countdown();
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