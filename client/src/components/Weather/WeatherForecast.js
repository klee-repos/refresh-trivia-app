import React, {Component} from 'react';

import {Skycons} from './skycons.js'

class WeatherForecast extends Component{
    constructor(props) {
        super(props)

        this.state = {
            test: new Skycons({"color": "#EED6A8"}),
        }
        
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.city === nextProps.city) {
            this.state.test.set("icon2", Skycons[nextProps.icon]);
        }
    }

    componentDidMount() {
        this.state.test.add("icon2", Skycons[this.props.icon]);
        this.state.test.play();
    }

    render(){
        return (
            <div className="forecastContainer">
                <div className="forecastContainer">
                    <div className="largeDisplay">
                    </div>
                    <div className="smallDisplay">
                        <div className="appDisclaimer">Powered By DarkSky</div>                
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherForecast;