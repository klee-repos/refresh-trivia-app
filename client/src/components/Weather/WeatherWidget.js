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
    
    componentWillReceiveProps(nextProps) {
        if (this.props.city === nextProps.city) {
            this.state.skycons.set("icon1", Skycons[nextProps.icon]);
        }
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