import React, {Component} from 'react'
import {connect} from 'react-redux';

import {WeatherWidget} from '../../components'

class WeatherWidgetContainer extends Component{

    render(){
        return (
            <div className='weatherWidget'>
                 {this.props.summary ? <WeatherWidget {...this.props}/> : <p></p>}
            </div>
        )
    }
}


function mapStateToProps({weather}) {
    return {
        lat: weather.location.lat,
        long: weather.location.long,
        summary: weather.forecast.currently.summary,
        icon: weather.forecast.currently.icon,
        temp: weather.forecast.currently.currentTemp,
        city: weather.location.city,
    }
}

export default connect(mapStateToProps)(WeatherWidgetContainer)