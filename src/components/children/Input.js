import React, { Component } from 'react';

export default class Input extends Component {
    constructor(props) {
        super(props);

    }

    onInputChange(input) {
        input = input.trim().toLowerCase();
        this.props.runOnGuess(input);
    }

    enterKey(event) {
        if (event.nativeEvent.charCode === 13) {
            this.props.enterKeyEvent(13);
        }
    }

    render() {
        return (
            <input
                placeholder='Guess here'
                onBlur={event => event.target.placeholder = 'Guess here'}
                onFocus={event => event.target.placeholder = ''}
                value={this.props.display}
                onChange={event => this.onInputChange(event.target.value)}
                onKeyUp={this.enterKey}
            />
        )
    }
}