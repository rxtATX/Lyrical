import React, { Component } from 'react'

export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCount: props.val,
            intervalId: undefined
        }

        this.timer = this.timer.bind(this);
        this.determineTimeout = this.determineTimeout.bind(this);

    }

    componentDidMount() {
        var intervalId = setInterval(this.timer, 1000);
        this.setState({ intervalId });
    }

    componentDidUpdate() {
        this.determineTimeout();
    }

    timer() {
        this.setState({
            currentCount: this.state.currentCount - 1
        });
    }

    determineTimeout() {
        if (this.state.currentCount === 0) {
            clearInterval(this.state.intervalId)
            this.props.timeOut(true);
        }
    }

    render() {
        return (
            <div>Time left: {this.state.currentCount}</div>
        )
    }
}