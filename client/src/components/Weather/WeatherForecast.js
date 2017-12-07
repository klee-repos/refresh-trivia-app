import React, {Component} from 'react';
import {Skycons} from './skycons.js'
import moment from 'moment'

class WeatherForecast extends Component{
    constructor(props) {
        super(props)

        this.state = {
            skycon: new Skycons({"color": "#EED6A8"}),
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.city === nextProps.city) {
            this.state.skycon.set("forecastCurrently", Skycons[nextProps.today.icon]);
            nextProps.future.map((day, idx) => {
                this.state.skycon.set("forecastFuture"+idx, Skycons[day.icon])
            });
        }
    }

    componentDidMount() {
        this.state.skycon.set("forecastCurrently", Skycons[this.props.today.icon]);
        this.props.future.map((day, idx) => {
            this.state.skycon.set("forecastFuture"+idx, Skycons[day.icon])
        });
        this.state.skycon.play();
    }

    render(){
        return (
            <div className="forecastContainer">
                <div className="largeDisplay">
                    <div>
                    <canvas id="forecastCurrently" width="400" height="400" />
                    </div>
                </div>
                <div className="smallDisplay">

                    {this.props.future.map((day, idx) =>{
                        var canvasId = "forecastFuture" + idx;
                        return (
                            <div className='smallDisplayColumn' key={idx}>
                                <div className='forecastSmallDay'>
                                    <div className='forecastSmallTitle'>
                                        <h1>{moment().add(idx+1, 'days').format('dddd')}</h1>
                                    </div>
                                    <div className='forecastSmallTitle'>
                                        {moment().add(idx+1, 'days').format('ll')}
                                    </div>
                                </div>
                                <div className='forecastSmallSummary'>
                                    <div className='forecastSmallTitle'>
                                        {day.summary}
                                    </div>
                                    <div className='forecastSmallTable'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>High: {parseInt(day.tempHigh, 10) + String.fromCharCode(176) + " F"}</td>
                                                    <td>Sunrise: {moment.unix(day.sunriseTime).format('LT')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Low: {parseInt(day.tempLow, 10) + String.fromCharCode(176) + " F"}</td>
                                                    <td>Sunset: {moment.unix(day.sunsetTime).format('LT')}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            <div className='forecastSmallIcon'>
                                <canvas id={canvasId} width="100" height="100" />
                            </div>
                        </div>
                        )
                    })} 
                </div>
            </div>
        )
    }
}

export default WeatherForecast;