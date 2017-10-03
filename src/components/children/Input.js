import React, { Component } from 'react';

export default class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            guess: ''
        }
    }

    onInputChange(input) {
        this.setState({ guess: input });
        this.props.runOnGuess(input);
    }

    render() {
        return (
            <input
                value={this.state.guess}
                onChange={event => this.onInputChange(event.target.value)}
            />
        )
    }
}