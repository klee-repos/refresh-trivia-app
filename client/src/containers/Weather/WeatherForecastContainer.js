import React, {Component} from 'react'
import {connect} from 'react-redux';

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

function mapStateToProps({weather}) {
    return {
        lat: weather.location.lat,
        long: weather.location.long,
        summary: weather.forecast.summary,
        icon: weather.forecast.icon,
        nextDay: weather.forecast.nextDay,
        secondDay: weather.forecast.secondDay,
        thirdDay: weather.forecast.thirdDay,
        fourthDay: weather.forecast.fourthDay,
    }
}

export default connect(mapStateToProps)(WeatherForecastContainer)