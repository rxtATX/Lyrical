import React, { Component } from 'react'

export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = { counter: props.val }
    }

    render() {
        var x = this;
        var { counter } = this.state;
        setTimeout(function () {
            if (counter > 0) {
                x.setState({ counter: counter - 1 });
            }
        }, 1000);
        if (counter === 0) {
            return <div>Time remaining: {counter}</div>;
            this.props.openModal();
        } else {
            return <div>Time remaining: {counter}</div>;
        }
    }
}