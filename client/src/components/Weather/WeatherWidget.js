import React, {Component} from 'react';

import {Skycons} from './skycons.js'

import './weather.css'

class WeatherWidget extends Component{

    constructor(props) {
        super(props)

        this.state = {
            skycons: new Skycons({"color": "#EED6A8"}),
        }
        
    }


    temp() {
        return parseInt(this.props.temp) + String.fromCharCode(176) + " F";
    }

    componentDidUpdate(nextProps) {
        if (nextProps.icon != this.props.icon) {
            console.log(this.props.icon)
        }
        console.log(nextProps.icon)
            this.state.skycons.add("icon1", Skycons[this.props.icon]);
            // console.log(nextProps.icon)
    }
        
        

    componentDidUpdate() {
        this.state.skycons.add("icon1", Skycons[this.props.icon]);
    }

    componentDidMount() {
        this.state.skycons.add("icon1", Skycons[this.props.icon]);
        this.state.skycons.play();
    }
    
    render(){
        return (
            <div className='weatherContainer'>
                <div className='weatherIcon'>
                    <canvas id="icon1" width="45" height="45" />
                </div>
                <div className='weatherDescription'>
                    <div className='weatherSummary'>
                        <h1>{this.temp()}</h1>
                    </div>
                    <div className='weatherTemp'>
                        {this.props.city}
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherWidget;