import React, {Component} from 'react'
import {connect} from 'react-redux';

import moment from 'moment'
import {WeatherForecast} from '../../components/'

class WeatherForecastContainer extends Component{

   render(){
        return (
            <div className="forecast">
                  <WeatherForecast {...this.props}/>
            </div>
        )
    }
}

function day(idx){
    return moment().add(idx, 'days').format('dddd')
}

function activeDayIdx(forecast, activeDay){
    var activeDayIdx = 0;
    forecast.map((foo, idx) => {if(day(idx) == activeDay) activeDayIdx = idx })
    return activeDayIdx;
}
function mapStateToProps({weather}) {
    var forecast = weather.forecast.future.slice() || [];
    forecast.unshift(weather.forecast.currently);
    var activeIndex = activeDayIdx(forecast,weather.forecast.activeDay);
    return {
        forecast: forecast,
        activeDay: weather.forecast.activeDay,
        activeDayIdx: activeIndex
    }
}

export default connect(mapStateToProps)(WeatherForecastContainer)