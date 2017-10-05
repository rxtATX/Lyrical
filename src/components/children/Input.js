import React, { Component } from 'react';

export default class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            guess: ''
        }
    }

    onInputChange(input) {
        input = input.toLowerCase();
        this.setState({ guess: input });
        this.props.runOnGuess(input);
    }

    render() {
        return (
            <input
                placeholder='Guess here'
                onBlur={event => event.target.placeholder = 'Guess here'}
                onFocus={event => event.target.placeholder = ''}
                value={this.state.guess}
                onChange={event => this.onInputChange(event.target.value)}
            />
        )
    }
}