
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
            time: moment().format('LTS'),
            date: moment().format('LL'),
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
                <TimeDateWidget time={this.state.time} date={this.state.date}/>
            </div>
        )
    }
}

export default TimeDateWidgetContainer;