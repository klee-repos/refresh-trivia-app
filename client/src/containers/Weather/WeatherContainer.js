import React, {Component} from 'react'
import {connect} from 'react-redux';

import Weather from '../../components'
import axios from 'axios'

class WeatherContainer extends Component{

    constructor(props){
        super(props);

        this.state = {
            weatherData: {}
        }
        this.Today();
        
    }

    Today(){
        var lat = this.props.lat || localStorage.getItem('weather_dev_lat'); //TODO: rethink
        var lon = this.props.lon || localStorage.getItem('weather_dev_long');
        axios.get('/apps/weather/forecast/today?' + "lat=" + lat +"&lon=" + lon)
        .then((function(res){
                console.log(res.data);
                this.setState({weatherData:res.data})
            }).bind(this));
    }

    render(){
        return (
            <div className={this.props.layoutClass}>
                {/* <Weather weatherData={this.state.weatherData}/> */}
                {this.state.weatherData.hourly ? this.state.weatherData.hourly.summary : "Summary"}
            </div>
        )
    }
}

function mapStateToProps({weather}) {
    return {
        location: weather.location
    }
}

export default connect(mapStateToProps)(WeatherContainer)