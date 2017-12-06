
import React, {Component} from 'react'

import {TimeDateWidget} from '../../components/'

import moment from 'moment'


class TimeDateWidgetContainer extends Component {

    constructor(props){
        super(props);

        this.state = {
            timer: null,
            time: null,
            date: null,
        }
        
        this.setTime = this.setTime.bind(this);
    }

    setTime() {
        this.setState({ 
            time: moment().format('LT'),
            date: moment().format('ll'),
            day: moment().format('dddd')
        })
    }

    componentDidMount() {
        let timer = setInterval(this.setTime, 1000);
        this.setState({timer})
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
        return (
            <div>
                <TimeDateWidget time={this.state.time} date={this.state.date} day={this.state.day}/>
            </div>
        )
    }
}

export default TimeDateWidgetContainer;