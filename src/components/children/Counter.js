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

    convertTime(totalSeconds) {
        if (typeof (totalSeconds) === 'string') {
            return '0:00';
        } else {
            var minutes = Math.floor(totalSeconds / 60);
            var seconds = totalSeconds - minutes * 60;
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            if (minutes === 0 && seconds === 0) {
                minutes = '0';
                seconds = '00'
            }
            return minutes + ':' + seconds;
        }
    }

    determineTimeout() {
        if (this.state.currentCount === 0) {
            clearInterval(this.state.intervalId)
            this.props.timeOut();
            this.setState({
                currentCount: '0:00'
            });
        }
    }

    render() {
        return (
            <div>Time left: {this.convertTime(this.state.currentCount)}</div>
        )
    }
}