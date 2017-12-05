import React, {Component} from 'react'
import {connect} from 'react-redux';

import {WeatherWidget} from '../../components'
import  {WeatherRequests} from '../../requests'

class WeatherWidgetContainer extends Component{

    render(){
        
        return (
            <div className={this.props.layoutClass}>
                 {this.props.summary ? <WeatherWidget {...this.props}/> : <p></p>}
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

export default connect(mapStateToProps)(WeatherWidgetContainer)