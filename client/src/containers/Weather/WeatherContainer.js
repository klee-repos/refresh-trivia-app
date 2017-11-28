import React, {Component} from 'react'
import {connect} from 'react-redux';

import {Weather} from '../../components/'
import axios from 'axios'

class WeatherContainer extends Component{

    constructor(props){
        super(props);

        this.state = {
            weatherData: null
        }
        this.Today();
        
    }

    Today(){
        var lat = this.props.lat || localStorage.getItem('weather_dev_lat'); //TODO: rethink
        var lon = this.props.lon || localStorage.getItem('weather_dev_long');
        axios.get('/apps/weather/forecast/today?' + "lat=" + lat +"&lon=" + lon)
        .then((function(res){
                this.setState({weatherData:res.data})
            }).bind(this));
    }

    render(){
        return (
            <div className={this.props.layoutClass}>
                 {this.state.weatherData ? <Weather {...this.state.weatherData}/> : null}
            </div>
        )
    }
}

function mapStateToProps({weather}) {
    return {
        lat: weather.lat,
        lon: weather.lon
    }
}

export default connect(mapStateToProps)(WeatherContainer)