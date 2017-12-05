import React, {Component} from 'react'
import {connect} from 'react-redux';

import {WeatherForecast} from '../../components/'

import  {WeatherRequests} from '../../requests'
class WeatherForecastContainer extends Component{

   render(){
        return (
            <div className={this.props.layoutClass}>
                  <WeatherForecast {...this.props}/>
            </div>
        )
    }
}

function mapStateToProps({weather}) {
    return {
        lat: weather.location.lat,
        long: weather.location.long,
        summary: weather.forecast.summary
    }
}

export default connect(mapStateToProps)(WeatherForecastContainer)