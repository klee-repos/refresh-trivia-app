import React, {Component} from 'react'
import {connect} from 'react-redux';

import {WeatherWidget} from '../../components'
import * as weatherRequests from './requests'

class WeatherWidgetContainer extends Component{

    constructor(props){
        super(props);

        this.state = {
            weatherData:null
        }
    }

    componentWillReceiveProps(nextProps){
        // if(nextProps.lat === this.props.lat && nextProps.long === this.props.long){
        //     return;
        // }
        weatherRequests.today(nextProps.lat, nextProps.long)
        .then((res) => this.setState({weatherData:res.data}));
    }
    render(){
        
        return (
            <div className={this.props.layoutClass}>
                 {this.state.weatherData ? <WeatherWidget {...this.state.weatherData}/> : <p></p>}
            </div>
        )
    }
}


function mapStateToProps({weather}) {
    return {
        lat: weather.lat,
        long: weather.long
    }
}

export default connect(mapStateToProps)(WeatherWidgetContainer)