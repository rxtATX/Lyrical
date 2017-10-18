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
      title: '',
      artist: '',
      lyrics: '',
      words: [],
      unique: [],
      total: '',
      guess: '',
      guessed: [],
      isGameOver: false
    };
  }

  hideModal() {
    this.setState({
      isOpen: false
    });
  };

  openModal() {
    this.setState({
      isOpen: true,
      isGameOver: true
    });
  };

  componentWillMount() {
    this.search();
  }

  search() {
    $.getJSON('http://api.musixmatch.com/ws/1.1/chart.tracks.get?page_size=40&country=US&f_has_lyrics=1&apikey=75d336abfa6dcbbbffe3cf619840a0f8')
      .then((response) => {
        let n = Math.floor(Math.random() * response.message.body.track_list.length);

        this.setState({
          artist: response.message.body.track_list[n].track.artist_name,
          title: response.message.body.track_list[n].track.track_name
        });

        $.getJSON('http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=75d336abfa6dcbbbffe3cf619840a0f8&track_id=' + response.message.body.track_list[n].track.track_id)
          .then((newResponse) => {
            console.log(newResponse.message.body.lyrics.lyrics_body);
            if (newResponse.message.body.lyrics.explicit === 1 || newResponse.message.body.lyrics.lyrics_language_description !== "English") {
              this.search();
            } else {
              this.setState({
                lyrics: newResponse.message.body.lyrics.lyrics_body.toLowerCase().replace(/(\r\n|\r|\n\n|\n)/gm, ' ').replace(/this lyrics is not for commercial use.*/gm, '')
              });
            }
          }).then(() => {
            let lyrics = this.state.lyrics.replace(/[^a-zA-Z0-9\s\\']|(\b[a|o]{2,}h{1,}\b)/gm, '').trim().split(' ');
            this.setState({
              words: lyrics,
              unique: [...new Set(lyrics)],
              total: this.state.unique.length
            })
          });
      });
  }

  componentDidUpdate() {
    if (this.state.total === 100) {
      this.openModal();
      clearInterval(1);
      this.setState({ total: '100' })
    }
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
              val={5 * 60}
              timeOut={this.openModal}
            />
            <button type="button" className="btn btn-default" onClick={(e) => this.handleClickEvent(e)}>New Song?</button>
          </header>
          <div className="col-md-9">
            <WordBox
              isGameOver={this.state.isGameOver}
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