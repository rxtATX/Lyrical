import React, { Component } from 'react';
import Input from './children/Input';
import WordBox from './children/WordBox';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
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
      }],
      words: [],
      unique: [],
      artist: '',
      title: '',
      total: '',
      guess: '',
      guessed: []
    };
  }

  componentDidMount() {
    var n = Math.floor(Math.random() * this.state.songs.length);
    this.setState({
      words: this.state.songs[n].lyrics.replace(/[^a-zA-Z0-9\s']/g, '').replace(/(\b[a|o]{1,}h{1,}\b)/g, '').toLowerCase().split(' '),
      unique: [...new Set(this.state.songs[n].lyrics.toLowerCase().split(' '))],
      artist: this.state.songs[n].artist,
      title: this.state.songs[n].title,
      total: this.state.unique.length
    });
  }

  onGuess(input) {
    this.setState({ guess: input });
    for (let i = 0; i < this.state.unique.length; i++) {
      if (input === this.state.unique[i]) {
        var updateArray = this.state.guessed.concat(input)
        this.setState({
          guessed: updateArray
        });
      }
    }
  }

  render() {
    return (
      <content className="container">
        <header className="jumbotron text-center">
          <h1>Lyrical</h1>
          <h2>The game of musical recall</h2>
          <p>Can you discover all the words to this mystery song?</p>
          <Input
            runOnGuess={input => this.onGuess(input)}
          />
        </header>
        <WordBox
          songLyrics={this.state.words}
          guessWord={this.state.guessed}
        />
      </content>
    );
  }
}
