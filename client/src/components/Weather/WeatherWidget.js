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
        return parseInt(this.props.temp, 10) + String.fromCharCode(176) + " F";
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
            <div className='weatherWidgetContainer'>
                <div className='weatherWidgetIcon'>
                    <canvas id="icon1" width="45" height="45" />
                </div>
                <div className='weatherWidgetDescription'>
                    <div className='weatherWidgetSummary'>
                        <h1>{this.temp()}</h1>
                    </div>
                    <div className='weatherWidgetTemp'>
                        {this.props.city}
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherWidget;