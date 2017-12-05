import React, {Component} from 'react';

import {Skycons} from './skycons.js'

import './weather.css'

class WeatherWidget extends Component{


    temp() {
        return parseInt(this.props.temp) + String.fromCharCode(176) + " F";
    }

    componentDidMount() {
        var skycons = new Skycons({"color": "#EED6A8"});
        var image = this.props.icon;

        if (image === 'clear-day') {
            image = 'CLEAR_DAY';
        }

        skycons.add("icon1", Skycons[image]);
        skycons.play();
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
                        {this.props.summary}
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherWidget;