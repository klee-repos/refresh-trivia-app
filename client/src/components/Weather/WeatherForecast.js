import React, {Component} from 'react';

import {Skycons} from './skycons.js'

import moment from 'moment'

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
        console.log(this.props.nextDay)
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
                                {this.props.nextDay.summary}
                            </div>
                            <div className='forecastSmallTable'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>High: {parseInt(this.props.nextDay.temperatureMax) + String.fromCharCode(176) + " F"}</td>
                                            <td>Sunrise: {moment(this.props.nextDay.sunriseTime).format('LT')}</td>
                                        </tr>
                                        <tr>
                                            <td>Low: {parseInt(this.props.nextDay.temperatureMin) + String.fromCharCode(176) + " F"}</td>
                                            <td>Sunset: {moment(this.props.nextDay.sunsetTime).format('LT')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='forecastSmallIcon'>
                            <canvas id="icon3" width="100" height="100" />
                        </div>
                    </div>
                    <div className='smallDisplayColumn'>
                        <div className='forecastSmallDay'>
                            <div className='forecastSmallyTitle'>
                                {moment().add(1, 'days').format('dddd')}
                            </div>
                            <div className='forecastSmallyTitle'>
                                {moment().add(1, 'days').format('ll')}
                            </div>
                        </div>
                        <div className='forecastSmallSummary'>
                            <div className='forecastSmallTitle'>
                                {this.props.secondDay.summary}
                            </div>
                            <div className='forecastSmallTable'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>High: {parseInt(this.props.secondDay.temperatureMax) + String.fromCharCode(176) + " F"}</td>
                                            <td>Sunrise: {moment(this.props.secondDay.sunriseTime).format('LT')}</td>
                                        </tr>
                                        <tr>
                                            <td>Low: {parseInt(this.props.secondDay.temperatureMin) + String.fromCharCode(176) + " F"}</td>
                                            <td>Sunset: {moment(this.props.secondDay.sunsetTime).format('LT')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='forecastSmallIcon'>
                            <canvas id="icon4" width="100" height="100" />
                        </div>
                    </div>
                    <div className='smallDisplayColumn'>
                        <div className='forecastSmallSummary'>
                            <div className='forecastSmallTitle'>
                                {this.props.thirdDay.summary}
                            </div>
                            <div className='forecastSmallTable'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>High: {parseInt(this.props.thirdDay.temperatureMax) + String.fromCharCode(176) + " F"}</td>
                                            <td>Sunrise: {moment(this.props.thirdDay.sunriseTime).format('LT')}</td>
                                        </tr>
                                        <tr>
                                            <td>Low: {parseInt(this.props.thirdDay.temperatureMin) + String.fromCharCode(176) + " F"}</td>
                                            <td>Sunset: {moment(this.props.thirdDay.sunsetTime).format('LT')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='forecastSmallIcon'>
                            <canvas id="icon5" width="100" height="100" />
                        </div>
                    </div>
                    <div className='smallDisplayColumn'>
                        <div className='forecastSmallSummary'>
                            <div className='forecastSmallTitle'>
                                {this.props.fourthDay.summary}
                            </div>
                            <div className='forecastSmallTable'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>High: {parseInt(this.props.fourthDay.temperatureMax) + String.fromCharCode(176) + " F"}</td>
                                            <td>Sunrise: {moment(this.props.fourthDay.sunriseTime).format('LT')}</td>
                                        </tr>
                                        <tr>
                                            <td>Low: {parseInt(this.props.fourthDay.temperatureMin) + String.fromCharCode(176) + " F"}</td>
                                            <td>Sunset: {moment(this.props.fourthDay.sunsetTime).format('LT')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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