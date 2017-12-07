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
        today: weather.forecast.currently,
        future: weather.forecast.future
    }
}

export default connect(mapStateToProps)(WeatherForecastContainer)