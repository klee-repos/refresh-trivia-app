import React, {Component} from 'react'
import {connect} from 'react-redux';

import {WeatherForecast} from '../../components/'

import  {WeatherRequests} from '../../requests'
class WeatherForecastContainer extends Component{

    constructor(props){
        super(props);

        this.state = {
            weatherData: null
        }
        WeatherRequests.today(this.props.lat,this.props.long)
            .then(res => this.setState({weatherData:res.data}));
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.lat === this.props.lat && nextProps.long === this.props.long){
            return;
        }
        WeatherRequests.today(nextProps.lat, nextProps.long)
            .then(res => this.setState({weatherData:res.data}));;
    }

    render(){
        return (
            <div className={this.props.layoutClass}>
                 {this.state.weatherData ? <WeatherForecast {...this.state.weatherData}/> : <p></p>}
            </div>
        )
    }
}

function mapStateToProps({weather}) {
    return {
        lat: weather.location.lat,
        long: weather.location.long
    }
}

export default connect(mapStateToProps)(WeatherForecastContainer)