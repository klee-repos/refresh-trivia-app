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

    shouldComponentUpdate(nextProps){
        return !(nextProps.activeDayIdx === this.props.activeDayIdx && this.props.forecast[0].currentTemp === nextProps.forecast[0].currentTemp)
    }

    componentDidUpdate() {
        this.setSkycons(this.props);
    }

    componentDidMount() {
        this.setSkycons(this.props)
        this.state.skycon.play();
    }

    setSkycons(props) {
        this.state.skycon.set("activeForecastIcon", Skycons[props.forecast[props.activeDayIdx].icon]);
        props.forecast.map((day, idx) => {
            this.state.skycon.set("forecastFuture"+idx, Skycons[day.icon])
        });
    }
    


    renderActiveForecast() {
        var activeDay = this.props.forecast[this.props.activeDayIdx];
        return (
        <div className="largeDisplay">
            <div className="activeIcon">
                <div><canvas id="activeForecastIcon" width="400" height="400" /></div>
                <div>
                {this.props.activeDayIdx === 0 ? <span>{parseInt(activeDay.currentTemp,10) +  String.fromCharCode(176) + "F"}</span> : null}
                </div>
            </div>
            <div className="todayForecastContainer">
                <div className='forecastLargeTitle'>
                    <span>{activeDay.summary}</span>
                </div>
                <div className='forecastTable'>
                    <table>
                        <tbody>
                            <tr>
                                <td className='forecastTableValues'>High: {parseInt(activeDay.tempHigh, 10) + String.fromCharCode(176) + "F "}</td>
                                <td className='forecastTableValues'>Sunrise: {moment.unix(activeDay.sunriseTime).format('LT')}</td>
                            </tr>
                            <tr>
                                <td className='forecastTableValues'>Low: {parseInt(activeDay.tempLow, 10) + String.fromCharCode(176) + "F "}</td>
                                <td className='forecastTableValues'>Sunset: {moment.unix(activeDay.sunsetTime).format('LT')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        )
    }

    renderRemainingForecast(){
        return(
            <div className="smallDisplay">
                {this.props.forecast.map((day, idx) =>{
                    if(idx === this.props.activeDayIdx) return null;
                    var canvasId = "forecastFuture" + idx;
                    return (
                        <div className='smallDisplayContainer' key={idx}>
                            <div className='forecastSmallDay'>
                                <div className='forecastSmallTitle'>
                                    <h1>{moment().add(idx, 'days').format('dddd')}</h1>
                                </div>
                                <div className='forecastSmallIcon'>
                                    <canvas id={canvasId} width="100" height="100" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    render(){
      return (
            <div className="forecastContainer">
                {this.renderActiveForecast()}
                {this.renderRemainingForecast()}
            </div>
        )
    }
}

export default WeatherForecast;