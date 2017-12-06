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
        console.log(this.props.nextDay.icon)
        this.state.test.add("icon2", Skycons[this.props.icon]);
        this.state.test.add("icon3", Skycons[this.props.nextDay.icon]);
        this.state.test.add("icon4", Skycons[this.props.secondDay.icon]);
        this.state.test.add("icon5", Skycons[this.props.thirdDay.icon]);
        this.state.test.add("icon6", Skycons[this.props.fourthDay.icon]);
        this.state.test.play();
    }

    render(){
        return (
            <div className="forecastContainer">
                <div className="largeDisplay">
                    <div>
                    <canvas id="icon2" width="500" height="500" />
                    </div>
                </div>
                <div className="smallDisplay">
                    <div className='smallDisplayColumn'>
                        <div className='forecastSmallSummary'>
                            <div className='forecastSmallTitle'>
                                Hello
                            </div>
                        </div>
                        <div className='forecastSmallIcon'>
                            <canvas id="icon3" width="100" height="100" />
                        </div>
                    </div>
                    <div className='smallDisplayColumn'>
                        <div className='forecastSmallTitle'>
                            Hello
                        </div>
                        <div className='forecastSmallIcon'>
                            <canvas id="icon4" width="100" height="100" />
                        </div>
                    </div>  
                    <div className='smallDisplayColumn'>
                        <div className='forecastSmallTitle'>
                            Hello
                        </div>
                        <div className='forecastSmallIcon'>
                            <canvas id="icon5" width="100" height="100" />
                        </div>
                    </div>  
                    <div className='smallDisplayColumn'>
                        <div className='forecastSmallTitle'>
                            Hello
                        </div>
                        <div className='forecastSmallIcon'>
                            <canvas id="icon6" width="100" height="100" />
                        </div>
                    </div>             
                </div>
            </div>
        )
    }
}

export default WeatherForecast;