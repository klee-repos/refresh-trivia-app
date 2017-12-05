import React, {Component} from 'react'
import {connect} from 'react-redux';

import {WeatherWidget} from '../../components'

class WeatherWidgetContainer extends Component{

    render(){
        return (
            <div className='weather'>
                 {this.props.summary ? <WeatherWidget {...this.props}/> : <p></p>}
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
        temp: weather.forecast.temp,
    }
}

export default connect(mapStateToProps)(WeatherWidgetContainer)